#![no_std]
use soroban_sdk::{
    contract, contracterror, contractevent, contractimpl, contracttype, token, Address, Env,
};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Seller,
    Token,
    MinBid,
    EndTime,
    HighestBidder,
    HighestBid,
    Finalized,
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
}

#[contracttype]
#[derive(Clone)]
pub struct AuctionState {
    pub seller: Address,
    pub token: Address,
    pub min_bid: i128,
    pub end_time: u64,
    pub highest_bidder: Option<Address>,
    pub highest_bid: i128,
    pub finalized: bool,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct NewBid {
    #[topic]
    pub bidder: Address,
    pub amount: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct AuctionFinalized {
    pub winning_bid: i128,
}

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    /// Bir defaya mahsus kurulum: satıcı, ödeme yapılacak token (testnet'te native XLM'in
    /// Stellar Asset Contract'ı), taban teklif ve bitiş zamanı (unix timestamp, saniye).
    pub fn initialize(
        env: Env,
        seller: Address,
        token: Address,
        min_bid: i128,
        end_time: u64,
    ) -> Result<(), AuctionError> {
        if env.storage().instance().has(&DataKey::Seller) {
            return Err(AuctionError::AlreadyInitialized);
        }
        seller.require_auth();

        env.storage().instance().set(&DataKey::Seller, &seller);
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::MinBid, &min_bid);
        env.storage().instance().set(&DataKey::EndTime, &end_time);
        env.storage().instance().set(&DataKey::HighestBid, &0i128);
        env.storage().instance().set(&DataKey::Finalized, &false);

        Ok(())
    }

    /// Yeni teklif: mevcut en yüksek tekliften düşükse reddedilir; kabul edilirse bidder'dan
    /// contract'a (escrow) transfer edilir, önceki en yüksek teklif sahibine otomatik iade
    /// yapılır ve `new_bid` event'i yayınlanır.
    pub fn bid(env: Env, bidder: Address, amount: i128) -> Result<(), AuctionError> {
        bidder.require_auth();

        let end_time: u64 = env
            .storage()
            .instance()
            .get(&DataKey::EndTime)
            .ok_or(AuctionError::NotInitialized)?;
        if env.ledger().timestamp() >= end_time {
            return Err(AuctionError::AuctionEnded);
        }

        let min_bid: i128 = env
            .storage()
            .instance()
            .get(&DataKey::MinBid)
            .ok_or(AuctionError::NotInitialized)?;
        let highest_bid: i128 = env.storage().instance().get(&DataKey::HighestBid).unwrap_or(0);
        let highest_bidder: Option<Address> = env.storage().instance().get(&DataKey::HighestBidder);

        let floor = if highest_bid > 0 { highest_bid } else { min_bid - 1 };
        if amount <= floor {
            return Err(AuctionError::BidTooLow);
        }

        let token_id: Address = env
            .storage()
            .instance()
            .get(&DataKey::Token)
            .ok_or(AuctionError::NotInitialized)?;
        let token_client = token::Client::new(&env, &token_id);

        token_client.transfer(&bidder, &env.current_contract_address(), &amount);

        if let Some(prev_bidder) = highest_bidder {
            token_client.transfer(&env.current_contract_address(), &prev_bidder, &highest_bid);
        }

        env.storage().instance().set(&DataKey::HighestBid, &amount);
        env.storage().instance().set(&DataKey::HighestBidder, &bidder);

        NewBid { bidder, amount }.publish(&env);

        Ok(())
    }

    /// Salt-okunur: mevcut açık artırma durumu.
    pub fn get_state(env: Env) -> AuctionState {
        AuctionState {
            seller: env.storage().instance().get(&DataKey::Seller).unwrap(),
            token: env.storage().instance().get(&DataKey::Token).unwrap(),
            min_bid: env.storage().instance().get(&DataKey::MinBid).unwrap(),
            end_time: env.storage().instance().get(&DataKey::EndTime).unwrap(),
            highest_bidder: env.storage().instance().get(&DataKey::HighestBidder),
            highest_bid: env.storage().instance().get(&DataKey::HighestBid).unwrap_or(0),
            finalized: env.storage().instance().get(&DataKey::Finalized).unwrap_or(false),
        }
    }

    /// Süre dolduktan sonra tek seferlik çağrılır: en yüksek teklifi satıcıya serbest bırakır.
    pub fn finalize(env: Env) -> Result<(), AuctionError> {
        let end_time: u64 = env
            .storage()
            .instance()
            .get(&DataKey::EndTime)
            .ok_or(AuctionError::NotInitialized)?;
        if env.ledger().timestamp() < end_time {
            return Err(AuctionError::AuctionNotEnded);
        }

        let finalized: bool = env.storage().instance().get(&DataKey::Finalized).unwrap_or(false);
        if finalized {
            return Err(AuctionError::AlreadyFinalized);
        }

        let highest_bid: i128 = env.storage().instance().get(&DataKey::HighestBid).unwrap_or(0);
        if highest_bid > 0 {
            let seller: Address = env.storage().instance().get(&DataKey::Seller).unwrap();
            let token_id: Address = env.storage().instance().get(&DataKey::Token).unwrap();
            let token_client = token::Client::new(&env, &token_id);
            token_client.transfer(&env.current_contract_address(), &seller, &highest_bid);
        }

        env.storage().instance().set(&DataKey::Finalized, &true);
        AuctionFinalized {
            winning_bid: highest_bid,
        }
        .publish(&env);

        Ok(())
    }
}

mod test;
