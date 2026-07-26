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

fn item_name(env: &Env) -> String {
    String::from_str(env, "Vintage Camera")
}

fn description(env: &Env) -> String {
    String::from_str(env, "35mm film camera, works great")
}

fn seller_name(env: &Env) -> String {
    String::from_str(env, "Ayşe")
}

fn bidder_name(env: &Env) -> String {
    String::from_str(env, "Mehmet")
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

    client.initialize(&token_id, &registry_id);
    let id = client.create_auction(
        &seller,
        &seller_name(&env),
        &item_name(&env),
        &description(&env),
        &100,
        &1000,
    );
    assert_eq!(id, 0);
    assert_eq!(client.get_auction(&id).seller_name, seller_name(&env));

    // First bid at the minimum is accepted.
    client.bid(&id, &bidder_a, &bidder_name(&env), &100);
    let auction = client.get_auction(&id);
    assert_eq!(auction.highest_bid, 100);
    assert_eq!(auction.highest_bidder, Some(bidder_a.clone()));
    assert_eq!(auction.highest_bidder_name, bidder_name(&env));
    assert_eq!(token_client.balance(&bidder_a), 900);
    assert_eq!(token_client.balance(&contract_id), 100);

    // A lower bid than the current highest is rejected.
    let result = client.try_bid(&id, &bidder_b, &bidder_name(&env), &50);
    assert_eq!(result, Err(Ok(AuctionError::BidTooLow)));

    // A higher bid is accepted, and the previous bidder is refunded automatically.
    let bidder_b_name = String::from_str(&env, "Zeynep");
    client.bid(&id, &bidder_b, &bidder_b_name, &200);
    let auction = client.get_auction(&id);
    assert_eq!(auction.highest_bid, 200);
    assert_eq!(auction.highest_bidder, Some(bidder_b.clone()));
    assert_eq!(auction.highest_bidder_name, bidder_b_name);
    assert_eq!(token_client.balance(&bidder_a), 1_000);
    assert_eq!(token_client.balance(&bidder_b), 800);
    assert_eq!(token_client.balance(&contract_id), 200);

    // Bidding after the end time fails.
    set_time(&env, 2000);
    let result = client.try_bid(&id, &bidder_a, &bidder_name(&env), &500);
    assert_eq!(result, Err(Ok(AuctionError::AuctionEnded)));

    // Finalize pays the winning bid out to the seller AND records it on the
    // cross-contract registry (inter-contract communication).
    client.finalize(&id);
    let auction = client.get_auction(&id);
    assert!(auction.finalized);
    assert_eq!(token_client.balance(&seller), 200);
    assert_eq!(token_client.balance(&contract_id), 0);

    let stats = registry_client.get_stats();
    assert_eq!(stats.total_finalized, 1);
    assert_eq!(stats.total_volume, 200);
    let recent = registry_client.get_recent_auctions();
    assert_eq!(recent.get(0).unwrap().auction, contract_id);
    assert_eq!(recent.get(0).unwrap().auction_id, 0);
    assert_eq!(recent.get(0).unwrap().winning_bid, 200);

    // Finalizing twice is rejected, and the registry is not double-recorded.
    let result = client.try_finalize(&id);
    assert_eq!(result, Err(Ok(AuctionError::AlreadyFinalized)));
    assert_eq!(registry_client.get_stats().total_finalized, 1);
}

#[test]
fn multiple_concurrent_auctions_do_not_interfere_with_each_other() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let seller_a = Address::generate(&env);
    let seller_b = Address::generate(&env);
    let bidder_a = Address::generate(&env);
    let bidder_b = Address::generate(&env);
    let token_admin = Address::generate(&env);

    let (token_id, asset_client, token_client) = create_token(&env, &token_admin);
    asset_client.mint(&bidder_a, &1_000);
    asset_client.mint(&bidder_b, &1_000);

    let (registry_id, registry_client) = create_registry(&env);

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);
    client.initialize(&token_id, &registry_id);

    // Two independent listings from the same deployed contract instance.
    let seller_a_name = String::from_str(&env, "Ayşe");
    let seller_b_name = String::from_str(&env, "Mehmet");
    let id_a = client.create_auction(
        &seller_a,
        &seller_a_name,
        &item_name(&env),
        &description(&env),
        &100,
        &1000,
    );
    let id_b = client.create_auction(
        &seller_b,
        &seller_b_name,
        &item_name(&env),
        &description(&env),
        &50,
        &1000,
    );
    assert_eq!(id_a, 0);
    assert_eq!(id_b, 1);

    let bidder_a_name = String::from_str(&env, "Zeynep");
    let bidder_b_name = String::from_str(&env, "Ali");
    client.bid(&id_a, &bidder_a, &bidder_a_name, &150);
    client.bid(&id_b, &bidder_b, &bidder_b_name, &75);

    // Each auction tracks its own highest bid AND bidder name independently.
    assert_eq!(client.get_auction(&id_a).highest_bid, 150);
    assert_eq!(client.get_auction(&id_a).highest_bidder_name, bidder_a_name);
    assert_eq!(client.get_auction(&id_b).highest_bid, 75);
    assert_eq!(client.get_auction(&id_b).highest_bidder_name, bidder_b_name);

    let active = client.get_active_auctions();
    assert_eq!(active.len(), 2);

    set_time(&env, 2000);
    client.finalize(&id_a);
    client.finalize(&id_b);

    assert_eq!(token_client.balance(&seller_a), 150);
    assert_eq!(token_client.balance(&seller_b), 75);

    // Both finalizations must reach the registry, even though they came from
    // the exact same contract address — this is the v2 composite-idempotency
    // fix (previously the second one would have been silently ignored).
    let stats = registry_client.get_stats();
    assert_eq!(stats.total_finalized, 2);
    assert_eq!(stats.total_volume, 225);

    // Both listings are gone from the active list once finalized.
    assert_eq!(client.get_active_auctions().len(), 0);

    // The seller's own listing view still shows both, regardless of status.
    assert_eq!(client.get_auctions_for(&seller_a).len(), 1);
}

#[test]
fn cannot_initialize_twice() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let token_admin = Address::generate(&env);
    let (token_id, _asset_client, _token_client) = create_token(&env, &token_admin);
    let (registry_id, _registry_client) = create_registry(&env);

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.initialize(&token_id, &registry_id);
    let result = client.try_initialize(&token_id, &registry_id);
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
    client.initialize(&token_id, &registry_id);
    let id = client.create_auction(
        &seller,
        &seller_name(&env),
        &item_name(&env),
        &description(&env),
        &100,
        &1000,
    );

    set_time(&env, 2000);
    client.finalize(&id);

    let stats = registry_client.get_stats();
    assert_eq!(stats.total_finalized, 0);
    assert_eq!(stats.total_volume, 0);
}

#[test]
fn bidding_or_finalizing_an_unknown_id_fails() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let token_admin = Address::generate(&env);
    let bidder = Address::generate(&env);
    let (token_id, asset_client, _token_client) = create_token(&env, &token_admin);
    asset_client.mint(&bidder, &1_000);
    let (registry_id, _registry_client) = create_registry(&env);

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);
    client.initialize(&token_id, &registry_id);

    let result = client.try_bid(&99, &bidder, &bidder_name(&env), &100);
    assert_eq!(result, Err(Ok(AuctionError::AuctionNotFound)));

    let result = client.try_finalize(&99);
    assert_eq!(result, Err(Ok(AuctionError::AuctionNotFound)));
}
