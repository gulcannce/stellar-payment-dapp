import { explorerTxUrl } from "../lib/config";
import { useLanguage } from "../lib/i18n";

// Level 2: idle → pending → success | fail durum makinesini tek bir yerden gösterir.
// Hem XLM gönderme (Level 1) hem de teklif verme (Level 2) akışları bunu paylaşır.
export function StatusBanner({ status }) {
  const { t } = useLanguage();

  if (!status || status.phase === "idle") return null;

  const cls = status.phase === "success" ? "success" : status.phase === "fail" ? "error" : "info";

  return (
    <div className={`status ${cls}`}>
      <p>{status.message}</p>
      {status.errorType && (
        <p className="small-text mono">
          {t("statusBanner.errorTypeLabel")} {status.errorType}
        </p>
      )}
      {status.hash && (
        <p className="mono small-text">
          {t("statusBanner.hashLabel")} {status.hash}
          <br />
          <a href={explorerTxUrl(status.hash)} target="_blank" rel="noreferrer">
            {t("statusBanner.viewOnExplorer")}
          </a>
        </p>
      )}
    </div>
  );
}
