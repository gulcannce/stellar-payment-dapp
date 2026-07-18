import { formatXlm } from "../lib/format";

export function BalanceCard({ balance, onRefresh }) {
  return (
    <div className="balance">
      <span className="label">XLM Bakiyesi</span>
      <p className="balance-value">{balance === null ? "Yükleniyor..." : formatXlm(balance)}</p>
      <button className="btn secondary small" onClick={onRefresh}>
        ↻ Yenile
      </button>
    </div>
  );
}
