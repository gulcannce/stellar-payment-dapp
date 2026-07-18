#![no_std]
use soroban_sdk::{contract, contractevent, contractimpl, contracttype, vec, Address, Env, Vec};

#[contracttype]
#[derive(Clone)]
pub enum RegistryDataKey {
    TotalFinalized,
    TotalVolume,
    Recorded(Address),
    RecentAuctions,
}

#[contracttype]
#[derive(Clone)]
pub struct RegistryStats {
    pub total_finalized: u32,
    pub total_volume: i128,
}

#[contracttype]
#[derive(Clone)]
pub struct AuctionRecord {
    pub auction: Address,
    pub seller: Address,
    pub winning_bid: i128,
}

const MAX_RECENT: u32 = 20;

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct AuctionRecorded {
    #[topic]
    pub auction: Address,
    pub seller: Address,
    pub winning_bid: i128,
}

#[contract]
pub struct Contract;

#[contractimpl]
impl Contract {
    /// Platform genelindeki sonuçlanmış açık artırmaları kaydeder. Sadece
    /// `auction` adresindeki contract'ın kendisi (çağrı zincirinde
    /// yetkilendirilmiş olarak) bu fonksiyonu çağırabilir — imzaya gerek
    /// yoktur, Soroban bunu "contract calling as itself" olarak doğrular.
    /// Aynı auction adresi için ikinci bir kayda izin verilmez (idempotency).
    pub fn record_finalized_auction(env: Env, auction: Address, seller: Address, winning_bid: i128) {
        auction.require_auth();

        let already_recorded = env
            .storage()
            .persistent()
            .get(&RegistryDataKey::Recorded(auction.clone()))
            .unwrap_or(false);
        if already_recorded {
            return;
        }
        env.storage()
            .persistent()
            .set(&RegistryDataKey::Recorded(auction.clone()), &true);

        let total_finalized: u32 = env
            .storage()
            .instance()
            .get(&RegistryDataKey::TotalFinalized)
            .unwrap_or(0);
        let total_volume: i128 = env
            .storage()
            .instance()
            .get(&RegistryDataKey::TotalVolume)
            .unwrap_or(0);

        env.storage()
            .instance()
            .set(&RegistryDataKey::TotalFinalized, &(total_finalized + 1));
        env.storage()
            .instance()
            .set(&RegistryDataKey::TotalVolume, &(total_volume + winning_bid));

        let mut recent: Vec<AuctionRecord> = env
            .storage()
            .instance()
            .get(&RegistryDataKey::RecentAuctions)
            .unwrap_or(vec![&env]);
        recent.insert(
            0,
            AuctionRecord {
                auction: auction.clone(),
                seller: seller.clone(),
                winning_bid,
            },
        );
        while recent.len() > MAX_RECENT {
            recent.pop_back();
        }
        env.storage()
            .instance()
            .set(&RegistryDataKey::RecentAuctions, &recent);

        AuctionRecorded {
            auction,
            seller,
            winning_bid,
        }
        .publish(&env);
    }

    /// Salt-okunur: platform genelindeki toplam istatistikler.
    pub fn get_stats(env: Env) -> RegistryStats {
        RegistryStats {
            total_finalized: env
                .storage()
                .instance()
                .get(&RegistryDataKey::TotalFinalized)
                .unwrap_or(0),
            total_volume: env.storage().instance().get(&RegistryDataKey::TotalVolume).unwrap_or(0),
        }
    }

    /// Salt-okunur: en son sonuçlanan (en fazla MAX_RECENT) açık artırmalar.
    pub fn get_recent_auctions(env: Env) -> Vec<AuctionRecord> {
        env.storage()
            .instance()
            .get(&RegistryDataKey::RecentAuctions)
            .unwrap_or(vec![&env])
    }
}

mod test;
