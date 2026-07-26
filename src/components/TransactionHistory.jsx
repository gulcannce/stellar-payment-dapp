import { shortAddress } from "../lib/format";
import { explorerTxUrl } from "../lib/config";
import { useLanguage } from "../lib/i18n";

export function TransactionHistory({ history, publicKey }) {
  const { t } = useLanguage();

  if (history.length === 0) return null;

  return (
    <div className="card">
      <h2>{t("history.title")}</h2>
      <ul className="history">
        {history.map((h) => {
          const isOut = h.from === publicKey || h.funder === publicKey;
          const other = isOut ? h.to || h.account : h.from || h.funder;
          const amt = h.amount || h.starting_balance;
          return (
            <li key={h.id}>
              <span className={isOut ? "out" : "in"}>{isOut ? t("history.sent") : t("history.received")}</span>
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
