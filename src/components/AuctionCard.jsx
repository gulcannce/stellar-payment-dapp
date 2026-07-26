import { BidForm } from "./BidForm";
import { shortAddress, formatXlm, formatDateTime, isPast } from "../lib/format";
import { useLanguage } from "../lib/i18n";

export function AuctionCard({ auction, address, balance, submitting, onBid, onFinalize }) {
  const { t } = useLanguage();
  const ended = isPast(auction.endTime);
  const minNextBid = auction.highestBidder ? auction.highestBid + 0.01 : auction.minBid;
  const isHighestBidder = address && auction.highestBidder === address;
  const isSeller = address && auction.seller === address;

  return (
    <div className="card auction-card">
      <div className="row">
        <h3>🔨 {auction.itemName}</h3>
        <span className={`badge ${ended ? "ended" : "active"}`}>
          {ended ? t("auction.statusEnded") : t("auction.statusActive")}
        </span>
      </div>

      {auction.description && <p className="small-text hint">{auction.description}</p>}

      <div className="auction-highlight">
        <span className="label">{t("auction.highestBidLabel")}</span>
        <p className="balance-value">{formatXlm(auction.highestBid)}</p>
        {auction.highestBidder && (
          <p className="small-text" title={auction.highestBidder}>
            {isHighestBidder ? t("auction.youAreLeading") : auction.highestBidderName || shortAddress(auction.highestBidder)}
          </p>
        )}
      </div>

      <div className="auction-meta">
        <span>
          {t("auction.sellerLabel")} {auction.sellerName || <span className="mono">{shortAddress(auction.seller)}</span>}
          {isSeller && ` ${t("auction.youMarker")}`}
        </span>
        <span>
          {t("auction.endLabel")} {formatDateTime(auction.endTime)}
        </span>
        <span>
          {t("auction.minBidMetaLabel")} {formatXlm(auction.minBid)}
        </span>
      </div>

      {!ended && !auction.finalized && (
        <BidForm
          minNextBid={minNextBid}
          disabled={!address}
          submitting={submitting}
          onBid={(amount, bidderName) => onBid(auction.id, amount, bidderName, balance)}
        />
      )}

      {!address && !ended && <p className="small-text hint">{t("auction.connectToBidHint")}</p>}

      {ended && !auction.finalized && (
        <>
          <p className="small-text hint">{t("auction.endedFinalizeHint")}</p>
          <button className="btn primary" disabled={!address || submitting} onClick={() => onFinalize(auction.id)}>
            {submitting ? t("auction.finalizing") : t("auction.finalizeButton")}
          </button>
        </>
      )}

      {auction.finalized && <p className="small-text hint">{t("auction.finalizedHint")}</p>}
    </div>
  );
}
