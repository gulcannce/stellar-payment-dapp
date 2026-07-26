import { useLanguage } from "../lib/i18n";
import { InvoiceCard } from "./InvoiceCard";

export function InvoiceList({ invoices, loading, address, submitting, onSend, onPay, onCancel }) {
  const { t } = useLanguage();

  if (!address) {
    return null;
  }

  if (loading) {
    return (
      <div className="card">
        <h2>{t("invoice.listTitle")}</h2>
        <p>{t("common.loading")}</p>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="card">
        <h2>{t("invoice.listTitle")}</h2>
        <p className="small-text hint">{t("invoice.emptyHint")}</p>
      </div>
    );
  }

  return (
    <div className="invoice-list">
      <h2>{t("invoice.listTitle")}</h2>
      {invoices.map((invoice) => (
        <InvoiceCard
          key={invoice.id}
          invoice={invoice}
          address={address}
          submitting={submitting}
          onSend={onSend}
          onPay={onPay}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
