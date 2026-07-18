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
  return ev.kind;
}

export function EventFeed({ events }) {
  if (events.length === 0) {
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
        {events.map((ev) => (
          <li key={ev.id}>
            <span className="amt">{describeEvent(ev)}</span>
            <span className="mono other">#{ev.ledger}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
