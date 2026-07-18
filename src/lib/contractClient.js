import * as StellarSdk from "@stellar/stellar-sdk";
import { RPC_URL, NETWORK_PASSPHRASE, CONTRACT_ID } from "./config";

const { rpc, Contract, TransactionBuilder, nativeToScVal, scValToNative, Address, BASE_FEE } =
  StellarSdk;

export const rpcServer = new rpc.Server(RPC_URL);

export const addressScVal = (address) => new Address(address).toScVal();
export const i128ScVal = (value) => nativeToScVal(BigInt(value), { type: "i128" });
export const u64ScVal = (value) => nativeToScVal(BigInt(value), { type: "u64" });

// Salt-okunur bir contract fonksiyonunu (get_state gibi) simüle ederek okur;
// imza veya işlem gönderimi gerekmez, bu yüzden cüzdan bağlı olmasa da çalışır.
export async function readContract(method, scArgs, readSourcePublicKey) {
  const account = await rpcServer.getAccount(readSourcePublicKey);
  const contract = new Contract(CONTRACT_ID);
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(method, ...scArgs))
    .setTimeout(30)
    .build();

  const sim = await rpcServer.simulateTransaction(tx);
  if (rpc.Api.isSimulationError(sim)) {
    throw new Error(sim.error);
  }
  return scValToNative(sim.result.retval);
}

// Auth gerektiren bir contract fonksiyonunu (bid gibi) hazırlar, cüzdana imzalatır,
// gönderir ve ledger'a işlenene kadar bekler. onStatus ile idle→pending→success|fail
// state machine'inin her aşaması UI'a bildirilir.
export async function invokeWithAuth({ method, scArgs, sourcePublicKey, signTransaction, onStatus }) {
  onStatus?.({ phase: "building", message: "İşlem hazırlanıyor..." });
  const account = await rpcServer.getAccount(sourcePublicKey);
  const contract = new Contract(CONTRACT_ID);
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(method, ...scArgs))
    .setTimeout(60)
    .build();

  const prepared = await rpcServer.prepareTransaction(tx);

  onStatus?.({ phase: "awaiting-signature", message: "Cüzdanda işlemi onayla..." });
  const signedXdr = await signTransaction(prepared.toXDR());

  onStatus?.({ phase: "pending", message: "İşlem ağa gönderiliyor..." });
  const signedTx = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE);
  const sendResult = await rpcServer.sendTransaction(signedTx);

  if (sendResult.status !== "PENDING") {
    throw new Error(`İşlem gönderilemedi: ${sendResult.status}`);
  }

  onStatus?.({
    phase: "pending",
    message: "İşlem ledger'a işleniyor, onay bekleniyor...",
    hash: sendResult.hash,
  });

  const result = await rpcServer.pollTransaction(sendResult.hash);
  if (result.status !== "SUCCESS") {
    throw new Error(`İşlem başarısız oldu: ${result.status}`);
  }

  return { hash: sendResult.hash, result };
}
