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

fn setup<'a>(env: &Env) -> (ContractClient<'a>, token::StellarAssetClient<'a>, token::Client<'a>) {
    let token_admin = Address::generate(env);
    let (token_id, asset_client, token_client) = create_token(env, &token_admin);

    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(env, &contract_id);
    client.initialize(&token_id);

    (client, asset_client, token_client)
}

#[test]
fn full_invoice_flow_create_send_pay() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let (client, asset_client, token_client) = setup(&env);
    let payee = Address::generate(&env);
    let payer = Address::generate(&env);
    asset_client.mint(&payer, &1_000);

    let id = client.create_invoice(&payee, &payer, &500, &2000, &String::from_str(&env, "Web sitesi tasarımı"));
    assert_eq!(id, 0);

    let invoice = client.get_invoice(&id);
    assert_eq!(invoice.status, InvoiceStatus::Draft);

    client.send_invoice(&id);
    let invoice = client.get_invoice(&id);
    assert_eq!(invoice.status, InvoiceStatus::Sent);

    client.pay_invoice(&id);

    let invoice = client.get_invoice(&id);
    assert_eq!(invoice.status, InvoiceStatus::Paid);
    assert_eq!(token_client.balance(&payee), 500);
    assert_eq!(token_client.balance(&payer), 500);
}

#[test]
fn cannot_initialize_twice() {
    let env = Env::default();
    env.mock_all_auths();

    let token_admin = Address::generate(&env);
    let (token_id, _asset_client, _token_client) = create_token(&env, &token_admin);
    let contract_id = env.register(Contract, ());
    let client = ContractClient::new(&env, &contract_id);
    client.initialize(&token_id);

    let result = client.try_initialize(&token_id);
    assert_eq!(result, Err(Ok(InvoiceError::AlreadyInitialized)));
}

#[test]
fn cannot_pay_before_sent() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let (client, asset_client, _token_client) = setup(&env);
    let payee = Address::generate(&env);
    let payer = Address::generate(&env);
    asset_client.mint(&payer, &1_000);
    let id = client.create_invoice(&payee, &payer, &100, &2000, &String::from_str(&env, "Test"));

    let result = client.try_pay_invoice(&id);
    assert_eq!(result, Err(Ok(InvoiceError::NotSent)));
}

#[test]
fn cannot_double_pay() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let (client, asset_client, _token_client) = setup(&env);
    let payee = Address::generate(&env);
    let payer = Address::generate(&env);
    asset_client.mint(&payer, &1_000);
    let id = client.create_invoice(&payee, &payer, &100, &2000, &String::from_str(&env, "Test"));
    client.send_invoice(&id);
    client.pay_invoice(&id);

    let result = client.try_pay_invoice(&id);
    assert_eq!(result, Err(Ok(InvoiceError::NotSent)));
}

#[test]
fn cancel_before_and_after_paid() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let (client, asset_client, _token_client) = setup(&env);
    let payee = Address::generate(&env);
    let payer = Address::generate(&env);
    asset_client.mint(&payer, &1_000);

    let id1 = client.create_invoice(&payee, &payer, &100, &2000, &String::from_str(&env, "Fatura 1"));
    client.cancel_invoice(&id1);
    let invoice = client.get_invoice(&id1);
    assert_eq!(invoice.status, InvoiceStatus::Cancelled);

    let result = client.try_cancel_invoice(&id1);
    assert_eq!(result, Err(Ok(InvoiceError::AlreadyCancelled)));

    let id2 = client.create_invoice(&payee, &payer, &100, &2000, &String::from_str(&env, "Fatura 2"));
    client.send_invoice(&id2);
    client.pay_invoice(&id2);
    let result = client.try_cancel_invoice(&id2);
    assert_eq!(result, Err(Ok(InvoiceError::AlreadyPaid)));
}

#[test]
fn overdue_is_derived_not_stored() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let (client, asset_client, _token_client) = setup(&env);
    let payee = Address::generate(&env);
    let payer = Address::generate(&env);
    asset_client.mint(&payer, &1_000);
    let id = client.create_invoice(&payee, &payer, &100, &2000, &String::from_str(&env, "Test"));
    client.send_invoice(&id);

    // due_date henüz geçmedi.
    let invoice = client.get_invoice(&id);
    assert_eq!(invoice.status, InvoiceStatus::Sent);

    // due_date'i geçtik: Overdue olarak görünmeli, ama hâlâ ödenebilir olmalı.
    set_time(&env, 3000);
    let invoice = client.get_invoice(&id);
    assert_eq!(invoice.status, InvoiceStatus::Overdue);

    client.pay_invoice(&id);
    let invoice = client.get_invoice(&id);
    assert_eq!(invoice.status, InvoiceStatus::Paid);
}

#[test]
fn get_invoices_for_filters_by_payee_and_payer() {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1000);

    let (client, _asset_client, _token_client) = setup(&env);
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    let carol = Address::generate(&env);

    client.create_invoice(&alice, &bob, &100, &2000, &String::from_str(&env, "Alice -> Bob"));
    client.create_invoice(&carol, &alice, &200, &2000, &String::from_str(&env, "Carol -> Alice"));
    client.create_invoice(&bob, &carol, &300, &2000, &String::from_str(&env, "Bob -> Carol"));

    // Alice hem ilk faturanın payee'si hem ikinci faturanın payer'ı.
    let alice_invoices = client.get_invoices_for(&alice);
    assert_eq!(alice_invoices.len(), 2);

    let bob_invoices = client.get_invoices_for(&bob);
    assert_eq!(bob_invoices.len(), 2);

    let carol_invoices = client.get_invoices_for(&carol);
    assert_eq!(carol_invoices.len(), 2);
}
