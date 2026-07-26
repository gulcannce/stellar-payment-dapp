import { shortAddress, formatXlm, formatDateTime } from "../lib/format";
import { useLanguage } from "../lib/i18n";

const STATUS_LABEL_KEY = {
  Draft: "invoice.statusDraft",
  Sent: "invoice.statusSent",
  Overdue: "invoice.statusOverdue",
  Paid: "invoice.statusPaid",
  Cancelled: "invoice.statusCancelled",
};

const STATUS_BADGE_CLASS = {
  Draft: "draft",
  Sent: "active",
  Overdue: "ended",
  Paid: "active",
  Cancelled: "cancelled",
};

export function InvoiceCard({ invoice, address, submitting, onSend, onPay, onCancel }) {
  const { t } = useLanguage();
  const isPayee = address && invoice.payee === address;
  const isPayer = address && invoice.payer === address;
  const terminal = invoice.status === "Paid" || invoice.status === "Cancelled";

  return (
    <div className="card invoice-card">
      <div className="row">
        <h3>{t("invoice.cardTitle", { id: invoice.id })}</h3>
        <span className={`badge ${STATUS_BADGE_CLASS[invoice.status] ?? "draft"}`}>
          {STATUS_LABEL_KEY[invoice.status] ? t(STATUS_LABEL_KEY[invoice.status]) : invoice.status}
        </span>
      </div>

      <div className="auction-highlight">
        <span className="label">{t("invoice.amountMetaLabel")}</span>
        <p className="balance-value">{formatXlm(invoice.amount)}</p>
      </div>

      <div className="auction-meta">
        <span>
          {t("invoice.payeeLabel")} <span className="mono">{shortAddress(invoice.payee)}</span>
        </span>
        <span>
          {t("invoice.payerMetaLabel")} <span className="mono">{shortAddress(invoice.payer)}</span>
        </span>
        <span>
          {t("invoice.dueMetaLabel")} {formatDateTime(invoice.dueDate)}
        </span>
        {invoice.memo && (
          <span>
            {t("invoice.memoMetaLabel")} {invoice.memo}
          </span>
        )}
      </div>

      {invoice.status === "Draft" && isPayee && (
        <div className="row">
          <button className="btn primary" disabled={submitting} onClick={() => onSend(invoice.id)}>
            {submitting ? t("common.sending") : t("invoice.sendButton")}
          </button>
          <button className="btn secondary" disabled={submitting} onClick={() => onCancel(invoice.id)}>
            {t("invoice.cancelButton")}
          </button>
        </div>
      )}

      {(invoice.status === "Sent" || invoice.status === "Overdue") && isPayer && (
        <button className="btn primary" disabled={submitting} onClick={() => onPay(invoice.id)}>
          {submitting ? t("invoice.paying") : t("invoice.payButton")}
        </button>
      )}

      {(invoice.status === "Sent" || invoice.status === "Overdue") && isPayee && (
        <>
          <p className="small-text hint">{t("invoice.awaitingPaymentHint")}</p>
          <button className="btn secondary" disabled={submitting} onClick={() => onCancel(invoice.id)}>
            {t("invoice.cancelButton")}
          </button>
        </>
      )}

      {invoice.status === "Draft" && isPayer && <p className="small-text hint">{t("invoice.notSentHint")}</p>}

      {terminal && (
        <p className="small-text hint">
          {invoice.status === "Paid" ? t("invoice.paidHint") : t("invoice.cancelledHint")}
        </p>
      )}
    </div>
  );
}
