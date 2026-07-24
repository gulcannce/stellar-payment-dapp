import { InvoiceCard } from "./InvoiceCard";

export function InvoiceList({ invoices, loading, address, submitting, onSend, onPay, onCancel }) {
  if (!address) {
    return null;
  }

  if (loading) {
    return (
      <div className="card">
        <h2>🧾 Faturalarım</h2>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="card">
        <h2>🧾 Faturalarım</h2>
        <p className="small-text hint">Henüz bir faturan yok. Yukarıdan ilk faturanı oluştur!</p>
      </div>
    );
  }

  return (
    <div className="invoice-list">
      <h2>🧾 Faturalarım</h2>
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
