import { explorerTxUrl } from "../lib/config";

// Level 2: idle → pending → success | fail durum makinesini tek bir yerden gösterir.
// Hem XLM gönderme (Level 1) hem de teklif verme (Level 2) akışları bunu paylaşır.
export function StatusBanner({ status }) {
  if (!status || status.phase === "idle") return null;

  const cls = status.phase === "success" ? "success" : status.phase === "fail" ? "error" : "info";

  return (
    <div className={`status ${cls}`}>
      <p>{status.message}</p>
      {status.errorType && <p className="small-text mono">Hata türü: {status.errorType}</p>}
      {status.hash && (
        <p className="mono small-text">
          Hash: {status.hash}
          <br />
          <a href={explorerTxUrl(status.hash)} target="_blank" rel="noreferrer">
            Stellar Expert'te görüntüle ↗
          </a>
        </p>
      )}
    </div>
  );
}
