import { useEffect, useRef, useState } from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import { rpcServer } from "../lib/contractClient";
import { CONTRACT_ID, REGISTRY_ID, STROOPS_PER_XLM } from "../lib/config";

const { scValToNative } = StellarSdk;
const POLL_INTERVAL_MS = 5000;
const LOOKBACK_LEDGERS = 2000;
const MAX_EVENTS = 20;

// contractevent macro'sunun varsayılan davranışı: sabit ilk topic struct adının
// snake_case hali ("NewBid" -> "new_bid", "AuctionFinalized" -> "auction_finalized"),
// ardından #[topic] işaretli alanlar gelir; kalan alanlar data map'inde taşınır.
function decodeEvent(ev) {
  const topics = ev.topic.map((t) => scValToNative(t));
  const data = scValToNative(ev.value);
  const kind = topics[0];

  return {
    id: ev.id,
    ledger: ev.ledger,
    closedAt: ev.ledgerClosedAt,
    kind,
    bidder: kind === "new_bid" ? topics[1] : undefined,
    amount: kind === "new_bid" ? Number(data.amount) / STROOPS_PER_XLM : undefined,
    winningBid:
      kind === "auction_finalized" || kind === "auction_recorded"
        ? Number(data.winning_bid) / STROOPS_PER_XLM
        : undefined,
    auction: kind === "auction_recorded" ? topics[1] : undefined,
    seller: kind === "auction_recorded" ? data.seller : undefined,
  };
}

// Level 2: gerçek zamanlı state senkronizasyonu. Soroban RPC'de contract event'leri
// için websocket akışı olmadığından, birkaç saniyede bir getEvents ile poll edilir;
// cursor tabanlı sayfalama sayesinde her poll'da sadece yeni event'ler gelir.
export function useAuctionEvents() {
  const [events, setEvents] = useState([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let timer;

    async function poll() {
      try {
        const request = cursorRef.current
          ? {
              filters: [{ type: "contract", contractIds: [CONTRACT_ID, REGISTRY_ID] }],
              cursor: cursorRef.current,
              limit: MAX_EVENTS,
            }
          : {
              filters: [{ type: "contract", contractIds: [CONTRACT_ID, REGISTRY_ID] }],
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
