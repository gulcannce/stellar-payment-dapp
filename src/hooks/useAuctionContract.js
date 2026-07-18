import { useCallback, useEffect, useState } from "react";
import { readContract, invokeWithAuth, addressScVal, i128ScVal } from "../lib/contractClient";
import { CONTRACT_ID, STROOPS_PER_XLM } from "../lib/config";
import { classifyError, assertSufficientBalance, ERROR_TYPES } from "../lib/errors";

// Cüzdan bağlı değilken bile açık artırma durumunu okuyabilmek için kullanılan,
// testnet'te fonlanmış salt-okunur bir hesap (bu contract'ın satıcısı/deployer'ı).
const FALLBACK_READ_SOURCE = "GAJVW2R2Y2KSPPBKS5DOUADFGK7AOZKZTBVUYYX2KIVPDYKJS3ODFH67";

function fromRawState(raw) {
  return {
    seller: raw.seller,
    token: raw.token,
    minBid: Number(raw.min_bid) / STROOPS_PER_XLM,
    endTime: Number(raw.end_time),
    highestBid: Number(raw.highest_bid) / STROOPS_PER_XLM,
    highestBidder: raw.highest_bidder ?? null,
    finalized: raw.finalized,
    registry: raw.registry,
  };
}

export function useAuctionContract({ address, signTransaction }) {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [txStatus, setTxStatus] = useState({ phase: "idle" });

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await readContract("get_state", [], address || FALLBACK_READ_SOURCE);
      setState(fromRawState(raw));
    } catch {
      // Contract henüz initialize edilmemiş olabilir; state null kalır.
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const bid = useCallback(
    async (amountXlm, balanceXlm) => {
      setTxStatus({ phase: "pending", message: "İşlem hazırlanıyor..." });
      try {
        if (!address) {
          throw { type: ERROR_TYPES.WALLET_NOT_FOUND, message: "Önce bir cüzdan bağla." };
        }
        assertSufficientBalance(balanceXlm, amountXlm);

        const amountStroops = Math.round(Number(amountXlm) * STROOPS_PER_XLM);
        const { hash } = await invokeWithAuth({
          method: "bid",
          scArgs: [addressScVal(address), i128ScVal(amountStroops)],
          sourcePublicKey: address,
          signTransaction,
          onStatus: (s) => setTxStatus({ phase: s.phase, message: s.message, hash: s.hash }),
        });

        setTxStatus({ phase: "success", message: "Teklif başarıyla kabul edildi! 🎉", hash });
        await refresh();
        return hash;
      } catch (err) {
        const classified = classifyError(err);
        setTxStatus({ phase: "fail", message: classified.message, errorType: classified.type });
        throw classified;
      }
    },
    [address, signTransaction, refresh]
  );

  // Süre dolduktan sonra herkes çağırabilir (permissionless settlement):
  // en yüksek teklifi satıcıya öder ve registry contract'ına (inter-contract
  // iletişim) sonucu bildirir.
  const finalize = useCallback(async () => {
    setTxStatus({ phase: "pending", message: "İşlem hazırlanıyor..." });
    try {
      if (!address) {
        throw { type: ERROR_TYPES.WALLET_NOT_FOUND, message: "Önce bir cüzdan bağla." };
      }

      const { hash } = await invokeWithAuth({
        method: "finalize",
        scArgs: [],
        sourcePublicKey: address,
        signTransaction,
        onStatus: (s) => setTxStatus({ phase: s.phase, message: s.message, hash: s.hash }),
      });

      setTxStatus({ phase: "success", message: "Açık artırma sonuçlandırıldı! 🏁", hash });
      await refresh();
      return hash;
    } catch (err) {
      const classified = classifyError(err);
      setTxStatus({ phase: "fail", message: classified.message, errorType: classified.type });
      throw classified;
    }
  }, [address, signTransaction, refresh]);

  return { state, loading, txStatus, refresh, bid, finalize, contractId: CONTRACT_ID };
}
