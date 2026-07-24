import { formatXlm } from "../lib/format";

export function BalanceCard({ balance, onRefresh, onFund, funding }) {
  return (
    <div className="balance">
      <span className="label">XLM Bakiyesi</span>
      <p className="balance-value">{balance === null ? "Yükleniyor..." : formatXlm(balance)}</p>
      <div className="balance-actions">
        <button className="btn secondary small" onClick={onRefresh}>
          ↻ Yenile
        </button>
        <button className="btn secondary small" onClick={onFund} disabled={funding}>
          {funding ? "Gönderiliyor..." : "🚰 Test XLM Al"}
        </button>
      </div>
    </div>
  );
}
