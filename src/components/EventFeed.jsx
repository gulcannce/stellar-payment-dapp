import { shortAddress, formatXlm } from "../lib/format";

function describeEvent(ev) {
  if (ev.kind === "new_bid") {
    return `${shortAddress(ev.bidder)} → ${formatXlm(ev.amount)} teklif verdi`;
  }
  if (ev.kind === "auction_finalized") {
    return `Açık artırma sonuçlandı: kazanan teklif ${formatXlm(ev.winningBid)}`;
  }
  if (ev.kind === "auction_recorded") {
    return `📋 Sicile kaydedildi: ${shortAddress(ev.auction)} — ${formatXlm(ev.winningBid)}`;
  }
  if (ev.kind === "invoice_created") {
    return `🧾 Yeni fatura #${ev.invoiceId}: ${shortAddress(ev.payee)} → ${shortAddress(ev.payer)} (${formatXlm(ev.amount)})`;
  }
  if (ev.kind === "invoice_sent") {
    return `📤 Fatura #${ev.invoiceId} gönderildi`;
  }
  if (ev.kind === "invoice_paid") {
    return `✅ Fatura #${ev.invoiceId} ödendi: ${shortAddress(ev.payer)} → ${formatXlm(ev.amount)}`;
  }
  if (ev.kind === "invoice_cancelled") {
    return `❌ Fatura #${ev.invoiceId} iptal edildi`;
  }
  return ev.kind;
}

// Level 4: auction + invoice event'leri tek bir "Canlı Olay Akışı" hissi
// vermek için burada birleştirilip ledger sırasına göre sıralanıyor.
export function EventFeed({ events = [], invoiceEvents = [] }) {
  const combined = [...events, ...invoiceEvents].sort((a, b) => b.ledger - a.ledger);

  if (combined.length === 0) {
    return (
      <div className="card">
        <h2>📡 Canlı Olay Akışı</h2>
        <p className="small-text hint">Henüz bir olay yok. İlk teklifi sen ver!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📡 Canlı Olay Akışı</h2>
      <ul className="history">
        {combined.map((ev) => (
          <li key={ev.id}>
            <span className="amt">{describeEvent(ev)}</span>
            <span className="mono other">#{ev.ledger}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
