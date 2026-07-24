import { useCallback, useState } from "react";
import { track } from "@vercel/analytics";
import { classifyError } from "../lib/errors";

// Level 3: @creit.tech/stellar-wallets-kit (~850kB) sadece kullanıcı "Cüzdan Bağla"ya
// tıkladığında dinamik olarak yüklenir; ilk sayfa yükünü küçültür.
let kitModulePromise = null;
function loadKit() {
  if (!kitModulePromise) {
    kitModulePromise = Promise.all([
      import("@creit.tech/stellar-wallets-kit/sdk"),
      import("@creit.tech/stellar-wallets-kit/modules/utils"),
      import("@creit.tech/stellar-wallets-kit"),
    ]).then(([sdk, utils, root]) => {
      const { StellarWalletsKit } = sdk;
      const { defaultModules } = utils;
      const { Networks } = root;
      StellarWalletsKit.init({
        modules: defaultModules(),
        network: Networks.TESTNET,
      });
      return { StellarWalletsKit, Networks };
    });
  }
  return kitModulePromise;
}

// Level 2: @creit.tech/stellar-wallets-kit ile Freighter, xBull, Albedo, Rabet,
// Lobstr, Hana gibi tüm ek konfigürasyon gerektirmeyen cüzdanları tek bir
// "cüzdan bağla" akışında sunar (Level 1'deki Freighter'a özel koda kıyasla).
export function useWallet() {
  const [address, setAddress] = useState("");
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async () => {
    setConnecting(true);
    try {
      const { StellarWalletsKit } = await loadKit();
      const result = await StellarWalletsKit.authModal();
      setAddress(result.address);
      // Level 4: gerçek kullanıcı cüzdan etkileşimi kanıtı (10+ kullanıcı
      // gereksinimi) — Vercel Analytics dashboard'unda görülebilir.
      track("wallet_connected");
      return result.address;
    } catch (err) {
      throw classifyError(err);
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    const { StellarWalletsKit } = await loadKit();
    await StellarWalletsKit.disconnect();
    setAddress("");
  }, []);

  const signTransaction = useCallback(
    async (xdr) => {
      try {
        const { StellarWalletsKit, Networks } = await loadKit();
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
