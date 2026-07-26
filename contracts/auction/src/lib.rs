#![no_std]
use soroban_sdk::{
    contract, contracterror, contractevent, contractimpl, contracttype, token, vec, Address, Env,
    String, Vec,
};

// Registry contract'ının gerçek implementasyonunu (ve dolayısıyla wasm export'larını)
// bu binary'ye sızdırmamak için sadece derlenmiş wasm'ından arayüzü içe aktarıyoruz
// (Client-only). `contracts/registry` bu yüzden auction'ın normal bir Rust bağımlılığı
// değil, sadece testlerde kullanılan bir dev-dependency'dir.
mod registry_contract {
    soroban_sdk::contractimport!(file = "../../target/wasm32v1-none/release/registry.wasm");
}
use registry_contract::Client as RegistryClient;

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Token,
    Registry,
    NextId,
    Auction(u32),
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum AuctionError {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    AuctionEnded = 3,
    AuctionNotEnded = 4,
    BidTooLow = 5,
    AlreadyFinalized = 6,
    AuctionNotFound = 7,
}

#[contracttype]
#[derive(Clone)]
pub struct Auction {
    pub id: u32,
    pub seller: Address,
    pub item_name: String,
    pub description: String,
    pub min_bid: i128,
    pub end_time: u64,
    pub highest_bidder: Option<Address>,
    pub highest_bid: i128,
    pub finalized: bool,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct AuctionCreated {
    #[topic]
    pub id: u32,
    pub seller: Address,
    pub min_bid: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct NewBid {
    #[topic]
    pub id: u32,
    pub bidder: Address,
    pub amount: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct AuctionFinalized {
    #[topic]
    pub id: u32,
    pub winning_bid: i128,
}

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    /// Bir defaya mahsus kurulum: ödeme yapılacak token (testnet'te native XLM'in
    /// Stellar Asset Contract'ı) ve sonuçlanan açık artırmaların kaydedileceği
    /// platform geneli registry contract'ı. Auction'ın aksine (Level 2/3'teki
    /// tek-seferlik tekli açık artırma) burada satıcı/taban teklif/bitiş zamanı
    /// artık initialize'da değil, her `create_auction` çağrısında belirlenir —
    /// tek bir deploy edilmiş instance artık birden fazla açık artırma barındırır
    /// (bkz. contracts/invoice'ın aynı `NextId` + map deseni).
    pub fn initialize(env: Env, token: Address, registry: Address) -> Result<(), AuctionError> {
        if env.storage().instance().has(&DataKey::Token) {
            return Err(AuctionError::AlreadyInitialized);
        }
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::Registry, &registry);
        env.storage().instance().set(&DataKey::NextId, &0u32);
        Ok(())
    }

    /// Yeni bir açık artırma listeler (serbest çalışan/satıcı = seller). `duration_secs`
    /// saniye sonra biten bir `end_time` hesaplanır.
    pub fn create_auction(
        env: Env,
        seller: Address,
        item_name: String,
        description: String,
        min_bid: i128,
        duration_secs: u64,
    ) -> Result<u32, AuctionError> {
        seller.require_auth();
        if !env.storage().instance().has(&DataKey::Token) {
            return Err(AuctionError::NotInitialized);
        }

        let id: u32 = env.storage().instance().get(&DataKey::NextId).unwrap_or(0);
        let end_time = env.ledger().timestamp() + duration_secs;
        let auction = Auction {
            id,
            seller: seller.clone(),
            item_name,
            description,
            min_bid,
            end_time,
            highest_bidder: None,
            highest_bid: 0,
            finalized: false,
        };
        env.storage().persistent().set(&DataKey::Auction(id), &auction);
        env.storage().instance().set(&DataKey::NextId, &(id + 1));

        AuctionCreated { id, seller, min_bid }.publish(&env);
        Ok(id)
    }

    /// Yeni teklif: mevcut en yüksek tekliften düşükse reddedilir; kabul edilirse bidder'dan
    /// contract'a (escrow) transfer edilir, önceki en yüksek teklif sahibine otomatik iade
    /// yapılır ve `new_bid` event'i yayınlanır.
    pub fn bid(env: Env, id: u32, bidder: Address, amount: i128) -> Result<(), AuctionError> {
        bidder.require_auth();

        let mut auction: Auction = env
            .storage()
            .persistent()
            .get(&DataKey::Auction(id))
            .ok_or(AuctionError::AuctionNotFound)?;

        if env.ledger().timestamp() >= auction.end_time {
            return Err(AuctionError::AuctionEnded);
        }

        let floor = if auction.highest_bid > 0 {
            auction.highest_bid
        } else {
            auction.min_bid - 1
        };
        if amount <= floor {
            return Err(AuctionError::BidTooLow);
        }

        let token_id: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let token_client = token::Client::new(&env, &token_id);

        token_client.transfer(&bidder, &env.current_contract_address(), &amount);

        if let Some(prev_bidder) = auction.highest_bidder.clone() {
            token_client.transfer(&env.current_contract_address(), &prev_bidder, &auction.highest_bid);
        }

        auction.highest_bid = amount;
        auction.highest_bidder = Some(bidder.clone());
        env.storage().persistent().set(&DataKey::Auction(id), &auction);

        NewBid { id, bidder, amount }.publish(&env);

        Ok(())
    }

    /// Salt-okunur: tek bir açık artırmanın güncel durumu.
    pub fn get_auction(env: Env, id: u32) -> Result<Auction, AuctionError> {
        env.storage()
            .persistent()
            .get(&DataKey::Auction(id))
            .ok_or(AuctionError::AuctionNotFound)
    }

    /// Salt-okunur: henüz sonuçlanmamış ve süresi dolmamış tüm açık artırmalar
    /// (gezinme/listeleme ekranı için). MVP ölçeğinde doğrusal tarama yeterli.
    pub fn get_active_auctions(env: Env) -> Vec<Auction> {
        let next_id: u32 = env.storage().instance().get(&DataKey::NextId).unwrap_or(0);
        let now = env.ledger().timestamp();
        let mut result: Vec<Auction> = vec![&env];
        for id in 0..next_id {
            if let Some(auction) = env.storage().persistent().get::<DataKey, Auction>(&DataKey::Auction(id)) {
                if !auction.finalized && now < auction.end_time {
                    result.push_back(auction);
                }
            }
        }
        result
    }

    /// Salt-okunur: verilen satıcının durumu ne olursa olsun tüm açık artırmaları
    /// ("Açık Artırmalarım" görünümü için).
    pub fn get_auctions_for(env: Env, seller: Address) -> Vec<Auction> {
        let next_id: u32 = env.storage().instance().get(&DataKey::NextId).unwrap_or(0);
        let mut result: Vec<Auction> = vec![&env];
        for id in 0..next_id {
            if let Some(auction) = env.storage().persistent().get::<DataKey, Auction>(&DataKey::Auction(id)) {
                if auction.seller == seller {
                    result.push_back(auction);
                }
            }
        }
        result
    }

    /// Süre dolduktan sonra herkes tarafından tek seferlik çağrılır: en yüksek
    /// teklifi satıcıya serbest bırakır ve inter-contract iletişimle platform
    /// geneli registry'e bildirir.
    pub fn finalize(env: Env, id: u32) -> Result<(), AuctionError> {
        let mut auction: Auction = env
            .storage()
            .persistent()
            .get(&DataKey::Auction(id))
            .ok_or(AuctionError::AuctionNotFound)?;

        if env.ledger().timestamp() < auction.end_time {
            return Err(AuctionError::AuctionNotEnded);
        }
        if auction.finalized {
            return Err(AuctionError::AlreadyFinalized);
        }

        if auction.highest_bid > 0 {
            let token_id: Address = env.storage().instance().get(&DataKey::Token).unwrap();
            let token_client = token::Client::new(&env, &token_id);
            token_client.transfer(&env.current_contract_address(), &auction.seller, &auction.highest_bid);

            // Inter-contract iletişim: sonuçlanan satışı platform geneli registry'e bildir.
            // `record_finalized_auction` bu contract'ın kendi adresiyle `require_auth()`
            // çağırır; çağrı zincirinde doğrudan çağıran biz olduğumuz için Soroban bunu
            // imza gerektirmeden "contract kendi kendini yetkilendiriyor" olarak kabul eder.
            // v2: registry artık (adres, id) ikilisine göre tekilleştiriyor çünkü tek bir
            // auction contract adresinden artık birden fazla açık artırma sonuçlanabiliyor.
            let registry_id: Address = env.storage().instance().get(&DataKey::Registry).unwrap();
            let registry_client = RegistryClient::new(&env, &registry_id);
            registry_client.record_finalized_auction(
                &env.current_contract_address(),
                &id,
                &auction.seller,
                &auction.highest_bid,
            );
        }

        auction.finalized = true;
        let winning_bid = auction.highest_bid;
        env.storage().persistent().set(&DataKey::Auction(id), &auction);

        AuctionFinalized { id, winning_bid }.publish(&env);

        Ok(())
    }
}

mod test;
