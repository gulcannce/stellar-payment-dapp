import * as StellarSdk from "@stellar/stellar-sdk";
import { RPC_URL, NETWORK_PASSPHRASE, INVOICE_CONTRACT_ID } from "./config";

// contracts/invoice (Level 4) için contractClient.js'in birebir kopyası —
// tek fark CONTRACT_ID yerine INVOICE_CONTRACT_ID kullanılması. Çalışan
// Level 2/3 dosyasına dokunmamak için parametrize etmek yerine ayrı bir
// dosya olarak tutuluyor. rpcServer (getEvents/getLatestLedger için)
// contractClient.js'ten yeniden kullanılıyor, burada tekrar oluşturulmuyor.
const { rpc, Contract, TransactionBuilder, nativeToScVal, scValToNative, Address, BASE_FEE } =
  StellarSdk;

const rpcServer = new rpc.Server(RPC_URL);

export const addressScVal = (address) => new Address(address).toScVal();
export const i128ScVal = (value) => nativeToScVal(BigInt(value), { type: "i128" });
export const u64ScVal = (value) => nativeToScVal(BigInt(value), { type: "u64" });
export const u32ScVal = (value) => nativeToScVal(value, { type: "u32" });
export const stringScVal = (value) => nativeToScVal(value, { type: "string" });

export async function readContract(method, scArgs, readSourcePublicKey) {
  const account = await rpcServer.getAccount(readSourcePublicKey);
  const contract = new Contract(INVOICE_CONTRACT_ID);
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

export async function invokeWithAuth({ method, scArgs, sourcePublicKey, signTransaction, onStatus }) {
  onStatus?.({ phase: "building", message: "İşlem hazırlanıyor..." });
  const account = await rpcServer.getAccount(sourcePublicKey);
  const contract = new Contract(INVOICE_CONTRACT_ID);
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
