import { useCallback, useState } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import { HORIZON_URL } from "../lib/config";

const server = new StellarSdk.Horizon.Server(HORIZON_URL);

// Level 1'den korunan bakiye + son işlemler mantığı; artık genel amaçlı bir hook.
export function useBalance() {
  const [balance, setBalance] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = useCallback(async (pk) => {
    try {
      const res = await server.payments().forAccount(pk).order("desc").limit(5).call();
      setHistory(res.records.filter((r) => r.type === "payment" || r.type === "create_account"));
    } catch {
      setHistory([]);
    }
  }, []);

  const fetchBalance = useCallback(async (pk) => {
    try {
      const account = await server.loadAccount(pk);
      const native = account.balances.find((b) => b.asset_type === "native");
      setBalance(native ? native.balance : "0");
    } catch {
      setBalance("0");
    }
  }, []);

  const refresh = useCallback(
    async (pk) => {
      await Promise.all([fetchBalance(pk), fetchHistory(pk)]);
    },
    [fetchBalance, fetchHistory]
  );

  const reset = useCallback(() => {
    setBalance(null);
    setHistory([]);
  }, []);

  return { balance, history, fetchBalance, fetchHistory, refresh, reset };
}
