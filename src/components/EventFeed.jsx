import { useState } from "react";
import { shortAddress, formatXlm } from "../lib/format";
import { useLanguage } from "../lib/i18n";

function describeEvent(t, ev) {
  if (ev.kind === "auction_created") {
    return t("eventFeed.auctionCreated", { id: ev.auctionId, amount: formatXlm(ev.minBid) });
  }
  if (ev.kind === "new_bid") {
    return t("eventFeed.newBid", { id: ev.auctionId, bidder: shortAddress(ev.bidder), amount: formatXlm(ev.amount) });
  }
  if (ev.kind === "auction_finalized") {
    return t("eventFeed.auctionFinalized", { id: ev.auctionId, amount: formatXlm(ev.winningBid) });
  }
  if (ev.kind === "auction_recorded") {
    return t("eventFeed.auctionRecorded", {
      id: ev.auctionId,
      address: shortAddress(ev.auction),
      amount: formatXlm(ev.winningBid),
    });
  }
  if (ev.kind === "invoice_created") {
    return t("eventFeed.invoiceCreated", {
      id: ev.invoiceId,
      payee: shortAddress(ev.payee),
      payer: shortAddress(ev.payer),
      amount: formatXlm(ev.amount),
    });
  }
  if (ev.kind === "invoice_sent") {
    return t("eventFeed.invoiceSent", { id: ev.invoiceId });
  }
  if (ev.kind === "invoice_paid") {
    return t("eventFeed.invoicePaid", { id: ev.invoiceId, payer: shortAddress(ev.payer), amount: formatXlm(ev.amount) });
  }
  if (ev.kind === "invoice_cancelled") {
    return t("eventFeed.invoiceCancelled", { id: ev.invoiceId });
  }
  return ev.kind;
}

// Level 4: auction + invoice event'leri tek bir "Canlı Olay Akışı" hissi
// vermek için burada birleştirilip ledger sırasına göre sıralanıyor.
export function EventFeed({ events = [], invoiceEvents = [] }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const combined = [...events, ...invoiceEvents].sort((a, b) => b.ledger - a.ledger);

  if (combined.length === 0) {
    return (
      <div className="card">
        <h2>{t("eventFeed.title")}</h2>
        <p className="small-text hint">{t("eventFeed.emptyHint")}</p>
      </div>
    );
  }

  const visible = expanded ? combined : combined.slice(0, 1);
  const remaining = combined.length - visible.length;

  return (
    <div className="card">
      <h2>{t("eventFeed.title")}</h2>
      <ul className="history">
        {visible.map((ev) => (
          <li key={ev.id}>
            <span className="amt">{describeEvent(t, ev)}</span>
            <span className="mono other">#{ev.ledger}</span>
          </li>
        ))}
      </ul>
      {remaining > 0 && (
        <button type="button" className="link-button" onClick={() => setExpanded(true)}>
          {t("eventFeed.showMore", { n: remaining })}
        </button>
      )}
      {expanded && combined.length > 1 && (
        <button type="button" className="link-button" onClick={() => setExpanded(false)}>
          {t("eventFeed.collapse")}
        </button>
      )}
    </div>
  );
}
