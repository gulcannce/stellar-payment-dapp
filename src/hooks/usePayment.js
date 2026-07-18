import { useCallback, useState } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import { HORIZON_URL, NETWORK_PASSPHRASE } from "../lib/config";
import { classifyError, assertSufficientBalance } from "../lib/errors";

const server = new StellarSdk.Horizon.Server(HORIZON_URL);

// Level 1'den taşınan XLM gönderme akışı; artık imzalama Freighter'a özel değil,
// useWallet üzerinden hangi cüzdan bağlıysa onunla yapılır.
export function usePayment({ address, signTransaction, onSettled }) {
  const [status, setStatus] = useState({ phase: "idle" });

  const send = useCallback(
    async (destination, amount, balance) => {
      setStatus({ phase: "pending", message: "İşlem hazırlanıyor..." });
      try {
        assertSufficientBalance(balance, amount);

        const sourceAccount = await server.loadAccount(address);
        const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
          fee: StellarSdk.BASE_FEE,
          networkPassphrase: NETWORK_PASSPHRASE,
        })
          .addOperation(
            StellarSdk.Operation.payment({
              destination: destination.trim(),
              asset: StellarSdk.Asset.native(),
              amount: String(amount),
            })
          )
          .setTimeout(60)
          .build();

        setStatus({ phase: "pending", message: "Cüzdanda işlemi onayla..." });
        const signedXdr = await signTransaction(tx.toXDR());

        setStatus({ phase: "pending", message: "İşlem gönderiliyor..." });
        const result = await server.submitTransaction(
          StellarSdk.TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE)
        );

        setStatus({ phase: "success", message: "İşlem başarılı! 🎉", hash: result.hash });
        await onSettled?.();
        return result.hash;
      } catch (err) {
        const classified = classifyError(err);
        setStatus({ phase: "fail", message: classified.message, errorType: classified.type });
        throw classified;
      }
    },
    [address, signTransaction, onSettled]
  );

  return { status, send };
}
