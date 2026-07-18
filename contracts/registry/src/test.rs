#![cfg(test)]

use super::*;
use soroban_sdk::testutils::Address as _;
use soroban_sdk::Env;

#[test]
fn records_a_finalized_auction_and_updates_stats() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let auction = Address::generate(&env);
    let seller = Address::generate(&env);

    client.record_finalized_auction(&auction, &seller, &500);

    let stats = client.get_stats();
    assert_eq!(stats.total_finalized, 1);
    assert_eq!(stats.total_volume, 500);

    let recent = client.get_recent_auctions();
    assert_eq!(recent.len(), 1);
    assert_eq!(recent.get(0).unwrap().winning_bid, 500);
}

#[test]
fn ignores_a_duplicate_recording_for_the_same_auction() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    let auction = Address::generate(&env);
    let seller = Address::generate(&env);

    client.record_finalized_auction(&auction, &seller, &500);
    client.record_finalized_auction(&auction, &seller, &500);

    let stats = client.get_stats();
    assert_eq!(stats.total_finalized, 1);
    assert_eq!(stats.total_volume, 500);
}

#[test]
fn accumulates_stats_across_multiple_auctions_and_caps_recent_list() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);
    let seller = Address::generate(&env);

    for i in 0..25 {
        let auction = Address::generate(&env);
        client.record_finalized_auction(&auction, &seller, &(i as i128 + 1));
    }

    let stats = client.get_stats();
    assert_eq!(stats.total_finalized, 25);
    assert_eq!(stats.total_volume, (1..=25i128).sum::<i128>());

    let recent = client.get_recent_auctions();
    assert_eq!(recent.len(), 20);
    // Son eklenen en başta olmalı (en yeni 25. auction, bid = 25).
    assert_eq!(recent.get(0).unwrap().winning_bid, 25);
}
