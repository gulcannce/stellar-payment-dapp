#![cfg(test)]

use super::*;
use soroban_sdk::testutils::{Address as _, Ledger};
use soroban_sdk::Env;

fn create_token<'a>(env: &Env, admin: &Address) -> (Address, token::StellarAssetClient<'a>, token::Client<'a>) {
    let sac = env.register_stellar_asset_contract_v2(admin.clone());
    let asset_client = token::StellarAssetClient::new(env, &sac.address());
    let token_client = token::Client::new(env, &sac.address());
    (sac.address(), asset_client, token_client)
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

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.initialize(&seller, &token_id, &100, &2000);

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

    // Finalize pays the winning bid out to the seller.
    client.finalize();
    let state = client.get_state();
    assert!(state.finalized);
    assert_eq!(token_client.balance(&seller), 200);
    assert_eq!(token_client.balance(&contract_id), 0);

    // Finalizing twice is rejected.
    let result = client.try_finalize();
    assert_eq!(result, Err(Ok(AuctionError::AlreadyFinalized)));
}

#[test]
fn cannot_initialize_twice() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let seller = Address::generate(&env);
    let token_admin = Address::generate(&env);
    let (token_id, _asset_client, _token_client) = create_token(&env, &token_admin);

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);

    client.initialize(&seller, &token_id, &100, &2000);
    let result = client.try_initialize(&seller, &token_id, &100, &2000);
    assert_eq!(result, Err(Ok(AuctionError::AlreadyInitialized)));
}
