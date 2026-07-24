#![no_std]
use soroban_sdk::{
    contract, contracterror, contractevent, contractimpl, contracttype, token, vec, Address, Env,
    String, Vec,
};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Token,
    NextId,
    Invoice(u32),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum InvoiceStatus {
    Draft,
    Sent,
    // Sözleşmede saklanmaz — Sent durumundaki bir faturanın due_date'i geçtiğinde
    // get_invoice/get_invoices_for tarafından anlık hesaplanır (bkz. with_derived_status).
    // Bu sayede bir cron/keeper'a ihtiyaç kalmıyor.
    Overdue,
    Paid,
    Cancelled,
}

#[contracttype]
#[derive(Clone)]
pub struct Invoice {
    pub id: u32,
    pub payee: Address,
    pub payer: Address,
    pub amount: i128,
    pub due_date: u64,
    pub memo: String,
    pub status: InvoiceStatus,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum InvoiceError {
    NotInitialized = 1,
    AlreadyInitialized = 2,
    InvoiceNotFound = 3,
    NotDraft = 4,
    NotSent = 5,
    AlreadyPaid = 6,
    WrongPayer = 7,
    AlreadyCancelled = 8,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct InvoiceCreated {
    #[topic]
    pub id: u32,
    pub payee: Address,
    pub payer: Address,
    pub amount: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct InvoiceSent {
    #[topic]
    pub id: u32,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct InvoicePaid {
    #[topic]
    pub id: u32,
    pub payer: Address,
    pub amount: i128,
}

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct InvoiceCancelled {
    #[topic]
    pub id: u32,
}

#[contract]
pub struct Contract;

fn with_derived_status(env: &Env, mut invoice: Invoice) -> Invoice {
    if invoice.status == InvoiceStatus::Sent && env.ledger().timestamp() > invoice.due_date {
        invoice.status = InvoiceStatus::Overdue;
    }
    invoice
}

#[contractimpl]
impl Contract {
    /// Bir defaya mahsus kurulum: platformdaki tüm faturaların ödeneceği token
    /// (testnet'te native XLM'in Stellar Asset Contract'ı). Auction'ın aksine
    /// tek bir contract instance'ı, id ile anahtarlanan birden fazla faturayı
    /// tutar — her yeni fatura için yeniden deploy gerekmez.
    pub fn initialize(env: Env, token: Address) -> Result<(), InvoiceError> {
        if env.storage().instance().has(&DataKey::Token) {
            return Err(InvoiceError::AlreadyInitialized);
        }
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::NextId, &0u32);
        Ok(())
    }

    /// Yeni bir fatura oluşturur (serbest çalışan/alacaklı = payee). `Draft`
    /// durumunda başlar, `send_invoice` çağrılana kadar payer'a görünmez sayılır
    /// (UI tarafında filtrelenir).
    pub fn create_invoice(
        env: Env,
        payee: Address,
        payer: Address,
        amount: i128,
        due_date: u64,
        memo: String,
    ) -> Result<u32, InvoiceError> {
        payee.require_auth();
        if !env.storage().instance().has(&DataKey::Token) {
            return Err(InvoiceError::NotInitialized);
        }

        let id: u32 = env.storage().instance().get(&DataKey::NextId).unwrap_or(0);
        let invoice = Invoice {
            id,
            payee: payee.clone(),
            payer: payer.clone(),
            amount,
            due_date,
            memo,
            status: InvoiceStatus::Draft,
        };
        env.storage().persistent().set(&DataKey::Invoice(id), &invoice);
        env.storage().instance().set(&DataKey::NextId, &(id + 1));

        InvoiceCreated { id, payee, payer, amount }.publish(&env);
        Ok(id)
    }

    /// Draft -> Sent: fatura artık payer tarafından ödenebilir/görülebilir.
    pub fn send_invoice(env: Env, id: u32) -> Result<(), InvoiceError> {
        let mut invoice: Invoice = env
            .storage()
            .persistent()
            .get(&DataKey::Invoice(id))
            .ok_or(InvoiceError::InvoiceNotFound)?;
        invoice.payee.require_auth();

        if invoice.status != InvoiceStatus::Draft {
            return Err(InvoiceError::NotDraft);
        }
        invoice.status = InvoiceStatus::Sent;
        env.storage().persistent().set(&DataKey::Invoice(id), &invoice);

        InvoiceSent { id }.publish(&env);
        Ok(())
    }

    /// Payer, faturayı öder: token doğrudan payer'dan payee'ye transfer edilir
    /// (auction'daki escrow'un aksine — bu bir ödeme takibi, teklif değil, o
    /// yüzden bilinçli olarak daha basit tutuldu, fonlar contract'ta bekletilmiyor).
    pub fn pay_invoice(env: Env, id: u32) -> Result<(), InvoiceError> {
        let mut invoice: Invoice = env
            .storage()
            .persistent()
            .get(&DataKey::Invoice(id))
            .ok_or(InvoiceError::InvoiceNotFound)?;
        invoice.payer.require_auth();

        let derived = with_derived_status(&env, invoice.clone());
        if derived.status != InvoiceStatus::Sent && derived.status != InvoiceStatus::Overdue {
            return Err(InvoiceError::NotSent);
        }

        let token_id: Address = env
            .storage()
            .instance()
            .get(&DataKey::Token)
            .ok_or(InvoiceError::NotInitialized)?;
        let token_client = token::Client::new(&env, &token_id);
        token_client.transfer(&invoice.payer, &invoice.payee, &invoice.amount);

        invoice.status = InvoiceStatus::Paid;
        env.storage().persistent().set(&DataKey::Invoice(id), &invoice);

        InvoicePaid { id, payer: invoice.payer, amount: invoice.amount }.publish(&env);
        Ok(())
    }

    /// Payee, henüz ödenmemiş bir faturayı iptal eder.
    pub fn cancel_invoice(env: Env, id: u32) -> Result<(), InvoiceError> {
        let mut invoice: Invoice = env
            .storage()
            .persistent()
            .get(&DataKey::Invoice(id))
            .ok_or(InvoiceError::InvoiceNotFound)?;
        invoice.payee.require_auth();

        if invoice.status == InvoiceStatus::Paid {
            return Err(InvoiceError::AlreadyPaid);
        }
        if invoice.status == InvoiceStatus::Cancelled {
            return Err(InvoiceError::AlreadyCancelled);
        }
        invoice.status = InvoiceStatus::Cancelled;
        env.storage().persistent().set(&DataKey::Invoice(id), &invoice);

        InvoiceCancelled { id }.publish(&env);
        Ok(())
    }

    /// Salt-okunur: tek bir faturanın güncel durumu (Overdue anlık hesaplanır).
    pub fn get_invoice(env: Env, id: u32) -> Result<Invoice, InvoiceError> {
        let invoice: Invoice = env
            .storage()
            .persistent()
            .get(&DataKey::Invoice(id))
            .ok_or(InvoiceError::InvoiceNotFound)?;
        Ok(with_derived_status(&env, invoice))
    }

    /// Salt-okunur: verilen adresin payee ya da payer olduğu tüm faturalar.
    /// MVP ölçeğinde (testnet, az sayıda kullanıcı) doğrusal tarama yeterli;
    /// gerçek bir index gerekmez.
    pub fn get_invoices_for(env: Env, address: Address) -> Vec<Invoice> {
        let next_id: u32 = env.storage().instance().get(&DataKey::NextId).unwrap_or(0);
        let mut result: Vec<Invoice> = vec![&env];
        for id in 0..next_id {
            if let Some(invoice) = env.storage().persistent().get::<DataKey, Invoice>(&DataKey::Invoice(id)) {
                if invoice.payee == address || invoice.payer == address {
                    result.push_back(with_derived_status(&env, invoice));
                }
            }
        }
        result
    }
}

mod test;
