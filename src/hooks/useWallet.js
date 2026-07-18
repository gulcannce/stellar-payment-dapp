import { useCallback, useState } from "react";
import { StellarWalletsKit } from "@creit.tech/stellar-wallets-kit/sdk";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";
import { Networks } from "@creit.tech/stellar-wallets-kit";
import { classifyError } from "../lib/errors";

let kitReady = false;
function ensureKit() {
  if (kitReady) return;
  StellarWalletsKit.init({
    modules: defaultModules(),
    network: Networks.TESTNET,
  });
  kitReady = true;
}

// Level 2: @creit.tech/stellar-wallets-kit ile Freighter, xBull, Albedo, Rabet,
// Lobstr, Hana gibi tüm ek konfigürasyon gerektirmeyen cüzdanları tek bir
// "cüzdan bağla" akışında sunar (Level 1'deki Freighter'a özel koda kıyasla).
export function useWallet() {
  const [address, setAddress] = useState("");
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async () => {
    ensureKit();
    setConnecting(true);
    try {
      const result = await StellarWalletsKit.authModal();
      setAddress(result.address);
      return result.address;
    } catch (err) {
      throw classifyError(err);
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await StellarWalletsKit.disconnect();
    setAddress("");
  }, []);

  const signTransaction = useCallback(
    async (xdr) => {
      try {
        const { signedTxXdr } = await StellarWalletsKit.signTransaction(xdr, {
          networkPassphrase: Networks.TESTNET,
          address,
        });
        return signedTxXdr;
      } catch (err) {
        throw classifyError(err);
      }
    },
    [address]
  );

  return { address, connecting, connect, disconnect, signTransaction };
}
