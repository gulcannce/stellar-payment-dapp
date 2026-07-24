import { shortAddress, formatXlm, formatDateTime } from "../lib/format";

const STATUS_LABEL = {
  Draft: "Taslak",
  Sent: "Gönderildi",
  Overdue: "Süresi Geçti",
  Paid: "Ödendi",
  Cancelled: "İptal Edildi",
};

const STATUS_BADGE_CLASS = {
  Draft: "draft",
  Sent: "active",
  Overdue: "ended",
  Paid: "active",
  Cancelled: "cancelled",
};

export function InvoiceCard({ invoice, address, submitting, onSend, onPay, onCancel }) {
  const isPayee = address && invoice.payee === address;
  const isPayer = address && invoice.payer === address;
  const terminal = invoice.status === "Paid" || invoice.status === "Cancelled";

  return (
    <div className="card invoice-card">
      <div className="row">
        <h3>🧾 Fatura #{invoice.id}</h3>
        <span className={`badge ${STATUS_BADGE_CLASS[invoice.status] ?? "draft"}`}>
          {STATUS_LABEL[invoice.status] ?? invoice.status}
        </span>
      </div>

      <div className="auction-highlight">
        <span className="label">Tutar</span>
        <p className="balance-value">{formatXlm(invoice.amount)}</p>
      </div>

      <div className="auction-meta">
        <span>
          Alacaklı: <span className="mono">{shortAddress(invoice.payee)}</span>
        </span>
        <span>
          Borçlu: <span className="mono">{shortAddress(invoice.payer)}</span>
        </span>
        <span>Son ödeme: {formatDateTime(invoice.dueDate)}</span>
        {invoice.memo && <span>Açıklama: {invoice.memo}</span>}
      </div>

      {invoice.status === "Draft" && isPayee && (
        <div className="row">
          <button className="btn primary" disabled={submitting} onClick={() => onSend(invoice.id)}>
            {submitting ? "Gönderiliyor..." : "📤 Gönder"}
          </button>
          <button className="btn secondary" disabled={submitting} onClick={() => onCancel(invoice.id)}>
            İptal Et
          </button>
        </div>
      )}

      {(invoice.status === "Sent" || invoice.status === "Overdue") && isPayer && (
        <button className="btn primary" disabled={submitting} onClick={() => onPay(invoice.id)}>
          {submitting ? "Ödeniyor..." : "✅ Öde"}
        </button>
      )}

      {(invoice.status === "Sent" || invoice.status === "Overdue") && isPayee && (
        <>
          <p className="small-text hint">Borçlunun ödemesi bekleniyor.</p>
          <button className="btn secondary" disabled={submitting} onClick={() => onCancel(invoice.id)}>
            İptal Et
          </button>
        </>
      )}

      {invoice.status === "Draft" && isPayer && (
        <p className="small-text hint">Bu fatura henüz gönderilmedi.</p>
      )}

      {terminal && (
        <p className="small-text hint">
          {invoice.status === "Paid" ? "Bu fatura ödendi." : "Bu fatura iptal edildi."}
        </p>
      )}
    </div>
  );
}
