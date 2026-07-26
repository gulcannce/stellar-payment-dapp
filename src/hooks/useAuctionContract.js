import { useCallback, useEffect, useState } from "react";
import {
  readContract,
  invokeWithAuth,
  addressScVal,
  i128ScVal,
  u64ScVal,
  u32ScVal,
  stringScVal,
} from "../lib/contractClient";
import { CONTRACT_ID, STROOPS_PER_XLM } from "../lib/config";
import { classifyError, assertSufficientBalance, ERROR_TYPES } from "../lib/errors";

// Cüzdan bağlı değilken bile açık artırmaları listeleyebilmek için kullanılan,
// testnet'te fonlanmış salt-okunur bir hesap (gezinme herkese açık, tıpkı bir
// pazar yeri vitrini gibi — fatura listesinin aksine kişiye özel değil).
const FALLBACK_READ_SOURCE = "GAJVW2R2Y2KSPPBKS5DOUADFGK7AOZKZTBVUYYX2KIVPDYKJS3ODFH67";

function fromRawAuction(raw) {
  return {
    id: raw.id,
    seller: raw.seller,
    itemName: raw.item_name,
    description: raw.description,
    minBid: Number(raw.min_bid) / STROOPS_PER_XLM,
    endTime: Number(raw.end_time),
    highestBid: Number(raw.highest_bid) / STROOPS_PER_XLM,
    highestBidder: raw.highest_bidder ?? null,
    finalized: raw.finalized,
  };
}

// v5: tek bir deploy edilmiş instance artık birden fazla açık artırma barındırıyor
// (contracts/invoice'daki NextId + map deseninin aynısı) — bu yüzden burada page-level
// tek bir `state` yerine bir `auctions` listesi tutuluyor.
export function useAuctionContract({ address, signTransaction }) {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txStatus, setTxStatus] = useState({ phase: "idle" });

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const raw = await readContract("get_active_auctions", [], address || FALLBACK_READ_SOURCE);
      setAuctions(raw.map(fromRawAuction));
    } catch {
      // Contract henüz initialize edilmemiş olabilir; liste boş kalır.
      setAuctions([]);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createAuction = useCallback(
    async (itemName, description, minBidXlm, durationSecs) => {
      setTxStatus({ phase: "pending", message: "İşlem hazırlanıyor..." });
      try {
        if (!address) {
          throw { type: ERROR_TYPES.WALLET_NOT_FOUND, message: "Önce bir cüzdan bağla." };
        }
        const minBidStroops = Math.round(Number(minBidXlm) * STROOPS_PER_XLM);
        const { hash } = await invokeWithAuth({
          method: "create_auction",
          scArgs: [
            addressScVal(address),
            stringScVal(itemName),
            stringScVal(description),
            i128ScVal(minBidStroops),
            u64ScVal(durationSecs),
          ],
          sourcePublicKey: address,
          signTransaction,
          onStatus: (s) => setTxStatus({ phase: s.phase, message: s.message, hash: s.hash }),
        });

        setTxStatus({ phase: "success", message: "Açık artırma oluşturuldu! 🏺", hash });
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

  const bid = useCallback(
    async (id, amountXlm, balanceXlm) => {
      setTxStatus({ phase: "pending", message: "İşlem hazırlanıyor..." });
      try {
        if (!address) {
          throw { type: ERROR_TYPES.WALLET_NOT_FOUND, message: "Önce bir cüzdan bağla." };
        }
        assertSufficientBalance(balanceXlm, amountXlm);

        const amountStroops = Math.round(Number(amountXlm) * STROOPS_PER_XLM);
        const { hash } = await invokeWithAuth({
          method: "bid",
          scArgs: [u32ScVal(id), addressScVal(address), i128ScVal(amountStroops)],
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
  const finalize = useCallback(
    async (id) => {
      setTxStatus({ phase: "pending", message: "İşlem hazırlanıyor..." });
      try {
        if (!address) {
          throw { type: ERROR_TYPES.WALLET_NOT_FOUND, message: "Önce bir cüzdan bağla." };
        }

        const { hash } = await invokeWithAuth({
          method: "finalize",
          scArgs: [u32ScVal(id)],
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
    },
    [address, signTransaction, refresh]
  );

  return { auctions, loading, txStatus, refresh, createAuction, bid, finalize, contractId: CONTRACT_ID };
}
