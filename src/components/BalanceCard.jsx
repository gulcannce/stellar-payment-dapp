import { formatXlm } from "../lib/format";
import { useLanguage } from "../lib/i18n";

export function BalanceCard({ balance, onRefresh, onFund, funding }) {
  const { t } = useLanguage();

  return (
    <div className="balance">
      <span className="label">{t("balance.label")}</span>
      <p className="balance-value">{balance === null ? t("common.loading") : formatXlm(balance)}</p>
      <div className="balance-actions">
        <button className="btn secondary small" onClick={onRefresh}>
          {t("balance.refresh")}
        </button>
        <button className="btn secondary small" onClick={onFund} disabled={funding}>
          {funding ? t("common.sending") : t("balance.fund")}
        </button>
      </div>
    </div>
  );
}
