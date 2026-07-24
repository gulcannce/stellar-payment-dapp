import { useEffect, useRef, useState } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import { rpcServer } from "../lib/contractClient";
import { INVOICE_CONTRACT_ID, STROOPS_PER_XLM } from "../lib/config";

const { scValToNative } = StellarSdk;
const POLL_INTERVAL_MS = 5000;
const LOOKBACK_LEDGERS = 2000;
const MAX_EVENTS = 20;

// useAuctionEvents.js ile aynı desen (contractevent macro'sunun struct adını
// snake_case ilk topic olarak yayınlaması + #[topic] alanlar + kalan data map'i).
function decodeEvent(ev) {
  const topics = ev.topic.map((t) => scValToNative(t));
  const data = scValToNative(ev.value);
  const kind = topics[0];
  const id = ["invoice_created", "invoice_sent", "invoice_paid", "invoice_cancelled"].includes(kind)
    ? Number(topics[1])
    : undefined;

  return {
    id: ev.id,
    ledger: ev.ledger,
    closedAt: ev.ledgerClosedAt,
    kind,
    invoiceId: id,
    payee: kind === "invoice_created" ? data.payee : undefined,
    payer: kind === "invoice_created" || kind === "invoice_paid" ? data.payer : undefined,
    amount:
      kind === "invoice_created" || kind === "invoice_paid"
        ? Number(data.amount) / STROOPS_PER_XLM
        : undefined,
  };
}

// Level 4: fatura durumu değişikliklerinin (oluşturuldu/gönderildi/ödendi/iptal)
// canlı takibi — useAuctionEvents.js ile birebir aynı cursor tabanlı polling.
export function useInvoiceEvents() {
  const [events, setEvents] = useState([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Invoice contract henüz deploy edilmediyse (INVOICE_CONTRACT_ID boş),
    // poll'u hiç başlatma.
    if (!INVOICE_CONTRACT_ID) return;

    let cancelled = false;
    let timer;

    async function poll() {
      try {
        const request = cursorRef.current
          ? {
              filters: [{ type: "contract", contractIds: [INVOICE_CONTRACT_ID] }],
              cursor: cursorRef.current,
              limit: MAX_EVENTS,
            }
          : {
              filters: [{ type: "contract", contractIds: [INVOICE_CONTRACT_ID] }],
              startLedger: undefined,
              limit: MAX_EVENTS,
            };

        if (!cursorRef.current) {
          const latest = await rpcServer.getLatestLedger();
          request.startLedger = Math.max(latest.sequence - LOOKBACK_LEDGERS, 1);
        }

        const res = await rpcServer.getEvents(request);
        cursorRef.current = res.cursor;

        if (!cancelled && res.events.length > 0) {
          const decoded = res.events.map(decodeEvent).reverse();
          setEvents((prev) => [...decoded, ...prev].slice(0, MAX_EVENTS));
        }
      } catch {
        // Ağ hatası: sessizce yut, bir sonraki pollde tekrar denenir.
      } finally {
        if (!cancelled) {
          timer = setTimeout(poll, POLL_INTERVAL_MS);
        }
      }
    }

    poll();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return events;
}
