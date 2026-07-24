import { useCallback, useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import {
  readContract,
  invokeWithAuth,
  addressScVal,
  i128ScVal,
  u64ScVal,
  u32ScVal,
  stringScVal,
} from "../lib/invoiceContractClient";
import { STROOPS_PER_XLM } from "../lib/config";
import { classifyError, assertSufficientBalance, ERROR_TYPES } from "../lib/errors";

function fromRawInvoice(raw) {
  return {
    id: raw.id,
    payee: raw.payee,
    payer: raw.payer,
    amount: Number(raw.amount) / STROOPS_PER_XLM,
    dueDate: Number(raw.due_date),
    memo: raw.memo,
    // Contract'ın InvoiceStatus enum'u soroban_sdk tarafından JS'e
    // { tag: "Draft" | "Sent" | "Overdue" | "Paid" | "Cancelled", values: [] } olarak dönüyor.
    status: raw.status?.tag ?? raw.status,
  };
}

export function useInvoiceContract({ address, signTransaction }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txStatus, setTxStatus] = useState({ phase: "idle" });

  // Cüzdan bağlı değilken gösterilecek fatura yok — auction'ın aksine tek bir
  // paylaşılan durum değil, kişiye özel bir liste olduğu için fallback okuma
  // kaynağı anlamsız.
  const refresh = useCallback(async () => {
    if (!address) {
      setInvoices([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const raw = await readContract("get_invoices_for", [addressScVal(address)], address);
      setInvoices(raw.map(fromRawInvoice));
    } catch {
      // Invoice contract henüz initialize/deploy edilmemiş olabilir.
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createInvoice = useCallback(
    async (payerAddress, amountXlm, dueDateTimestamp, memo) => {
      setTxStatus({ phase: "pending", message: "İşlem hazırlanıyor..." });
      try {
        if (!address) {
          throw { type: ERROR_TYPES.WALLET_NOT_FOUND, message: "Önce bir cüzdan bağla." };
        }
        const amountStroops = Math.round(Number(amountXlm) * STROOPS_PER_XLM);
        const { hash } = await invokeWithAuth({
          method: "create_invoice",
          scArgs: [
            addressScVal(address),
            addressScVal(payerAddress),
            i128ScVal(amountStroops),
            u64ScVal(dueDateTimestamp),
            stringScVal(memo),
          ],
          sourcePublicKey: address,
          signTransaction,
          onStatus: (s) => setTxStatus({ phase: s.phase, message: s.message, hash: s.hash }),
        });

        setTxStatus({ phase: "success", message: "Fatura oluşturuldu! 🧾", hash });
        track("invoice_created");
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

  const sendInvoice = useCallback(
    async (id) => {
      setTxStatus({ phase: "pending", message: "İşlem hazırlanıyor..." });
      try {
        if (!address) {
          throw { type: ERROR_TYPES.WALLET_NOT_FOUND, message: "Önce bir cüzdan bağla." };
        }
        const { hash } = await invokeWithAuth({
          method: "send_invoice",
          scArgs: [u32ScVal(id)],
          sourcePublicKey: address,
          signTransaction,
          onStatus: (s) => setTxStatus({ phase: s.phase, message: s.message, hash: s.hash }),
        });

        setTxStatus({ phase: "success", message: "Fatura gönderildi. 📤", hash });
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

  const payInvoice = useCallback(
    async (id, amountXlm, balanceXlm) => {
      setTxStatus({ phase: "pending", message: "İşlem hazırlanıyor..." });
      try {
        if (!address) {
          throw { type: ERROR_TYPES.WALLET_NOT_FOUND, message: "Önce bir cüzdan bağla." };
        }
        assertSufficientBalance(balanceXlm, amountXlm);

        const { hash } = await invokeWithAuth({
          method: "pay_invoice",
          scArgs: [u32ScVal(id)],
          sourcePublicKey: address,
          signTransaction,
          onStatus: (s) => setTxStatus({ phase: s.phase, message: s.message, hash: s.hash }),
        });

        setTxStatus({ phase: "success", message: "Fatura ödendi! ✅", hash });
        track("invoice_paid");
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

  const cancelInvoice = useCallback(
    async (id) => {
      setTxStatus({ phase: "pending", message: "İşlem hazırlanıyor..." });
      try {
        if (!address) {
          throw { type: ERROR_TYPES.WALLET_NOT_FOUND, message: "Önce bir cüzdan bağla." };
        }
        const { hash } = await invokeWithAuth({
          method: "cancel_invoice",
          scArgs: [u32ScVal(id)],
          sourcePublicKey: address,
          signTransaction,
          onStatus: (s) => setTxStatus({ phase: s.phase, message: s.message, hash: s.hash }),
        });

        setTxStatus({ phase: "success", message: "Fatura iptal edildi.", hash });
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

  return { invoices, loading, txStatus, refresh, createInvoice, sendInvoice, payInvoice, cancelInvoice };
}
