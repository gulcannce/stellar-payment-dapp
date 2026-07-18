#![cfg(test)]

use super::*;
use registry::Contract as RegistryContract;
use soroban_sdk::testutils::{Address as _, Ledger};
use soroban_sdk::Env;

fn create_token<'a>(env: &Env, admin: &Address) -> (Address, token::StellarAssetClient<'a>, token::Client<'a>) {
    let sac = env.register_stellar_asset_contract_v2(admin.clone());
    let asset_client = token::StellarAssetClient::new(env, &sac.address());
    let token_client = token::Client::new(env, &sac.address());
    (sac.address(), asset_client, token_client)
}

fn create_registry(env: &Env) -> (Address, RegistryClient<'_>) {
    let registry_id = env.register(RegistryContract, ());
    let registry_client = RegistryClient::new(env, &registry_id);
    (registry_id, registry_client)
}

fn set_time(env: &Env, timestamp: u64) {
    env.ledger().with_mut(|li| {
        li.timestamp = timestamp;
    });
}

#[test]
fn full_auction_flow_with_outbid_refund_and_finalize() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let seller = Address::generate(&env);
    let bidder_a = Address::generate(&env);
    let bidder_b = Address::generate(&env);
    let token_admin = Address::generate(&env);

    let (token_id, asset_client, token_client) = create_token(&env, &token_admin);
    asset_client.mint(&bidder_a, &1_000);
    asset_client.mint(&bidder_b, &1_000);

    let (registry_id, registry_client) = create_registry(&env);

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.initialize(&seller, &token_id, &100, &2000, &registry_id);

    // First bid at the minimum is accepted.
    client.bid(&bidder_a, &100);
    let state = client.get_state();
    assert_eq!(state.highest_bid, 100);
    assert_eq!(state.highest_bidder, Some(bidder_a.clone()));
    assert_eq!(token_client.balance(&bidder_a), 900);
    assert_eq!(token_client.balance(&contract_id), 100);

    // A lower bid than the current highest is rejected.
    let result = client.try_bid(&bidder_b, &50);
    assert_eq!(result, Err(Ok(AuctionError::BidTooLow)));

    // A higher bid is accepted, and the previous bidder is refunded automatically.
    client.bid(&bidder_b, &200);
    let state = client.get_state();
    assert_eq!(state.highest_bid, 200);
    assert_eq!(state.highest_bidder, Some(bidder_b.clone()));
    assert_eq!(token_client.balance(&bidder_a), 1_000);
    assert_eq!(token_client.balance(&bidder_b), 800);
    assert_eq!(token_client.balance(&contract_id), 200);

    // Bidding after the end time fails.
    set_time(&env, 2000);
    let result = client.try_bid(&bidder_a, &500);
    assert_eq!(result, Err(Ok(AuctionError::AuctionEnded)));

    // Finalize pays the winning bid out to the seller AND records it on the
    // cross-contract registry (inter-contract communication).
    client.finalize();
    let state = client.get_state();
    assert!(state.finalized);
    assert_eq!(token_client.balance(&seller), 200);
    assert_eq!(token_client.balance(&contract_id), 0);

    let stats = registry_client.get_stats();
    assert_eq!(stats.total_finalized, 1);
    assert_eq!(stats.total_volume, 200);
    let recent = registry_client.get_recent_auctions();
    assert_eq!(recent.get(0).unwrap().auction, contract_id);
    assert_eq!(recent.get(0).unwrap().winning_bid, 200);

    // Finalizing twice is rejected, and the registry is not double-recorded.
    let result = client.try_finalize();
    assert_eq!(result, Err(Ok(AuctionError::AlreadyFinalized)));
    assert_eq!(registry_client.get_stats().total_finalized, 1);
}

#[test]
fn cannot_initialize_twice() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let seller = Address::generate(&env);
    let token_admin = Address::generate(&env);
    let (token_id, _asset_client, _token_client) = create_token(&env, &token_admin);
    let (registry_id, _registry_client) = create_registry(&env);

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.initialize(&seller, &token_id, &100, &2000, &registry_id);
    let result = client.try_initialize(&seller, &token_id, &100, &2000, &registry_id);
    assert_eq!(result, Err(Ok(AuctionError::AlreadyInitialized)));
}

#[test]
fn finalize_with_no_bids_does_not_touch_the_registry() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let seller = Address::generate(&env);
    let token_admin = Address::generate(&env);
    let (token_id, _asset_client, _token_client) = create_token(&env, &token_admin);
    let (registry_id, registry_client) = create_registry(&env);

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);
    client.initialize(&seller, &token_id, &100, &2000, &registry_id);

    set_time(&env, 2000);
    client.finalize();

    let stats = registry_client.get_stats();
    assert_eq!(stats.total_finalized, 0);
    assert_eq!(stats.total_volume, 0);
}
