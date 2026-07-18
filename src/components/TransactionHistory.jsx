import { shortAddress } from "../lib/format";
import { explorerTxUrl } from "../lib/config";

export function TransactionHistory({ history, publicKey }) {
  if (history.length === 0) return null;

  return (
    <div className="card">
      <h2>🕘 Son İşlemler</h2>
      <ul className="history">
        {history.map((h) => {
          const isOut = h.from === publicKey || h.funder === publicKey;
          const other = isOut ? h.to || h.account : h.from || h.funder;
          const amt = h.amount || h.starting_balance;
          return (
            <li key={h.id}>
              <span className={isOut ? "out" : "in"}>{isOut ? "➤ Gönderildi" : "✔ Alındı"}</span>
              <span className="amt">
                {isOut ? "-" : "+"}
                {Number(amt).toFixed(2)} XLM
              </span>
              <span className="mono other" title={other}>
                {other ? shortAddress(other) : ""}
              </span>
              <a href={explorerTxUrl(h.transaction_hash)} target="_blank" rel="noreferrer">
                ↗
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
