import { BidForm } from "./BidForm";
import { shortAddress, formatXlm, formatDateTime, isPast } from "../lib/format";

export function AuctionCard({ auction, address, balance, submitting, onBid, onFinalize }) {
  const ended = isPast(auction.endTime);
  const minNextBid = auction.highestBidder ? auction.highestBid + 0.01 : auction.minBid;
  const isHighestBidder = address && auction.highestBidder === address;
  const isSeller = address && auction.seller === address;

  return (
    <div className="card auction-card">
      <div className="row">
        <h3>🏺 {auction.itemName}</h3>
        <span className={`badge ${ended ? "ended" : "active"}`}>
          {ended ? "Süre Doldu" : "Açık"}
        </span>
      </div>

      {auction.description && <p className="small-text hint">{auction.description}</p>}

      <div className="auction-highlight">
        <span className="label">En Yüksek Teklif</span>
        <p className="balance-value">{formatXlm(auction.highestBid)}</p>
        {auction.highestBidder && (
          <p className="mono small-text" title={auction.highestBidder}>
            {isHighestBidder ? "👑 Sen önde gidiyorsun!" : shortAddress(auction.highestBidder)}
          </p>
        )}
      </div>

      <div className="auction-meta">
        <span>
          Satıcı: <span className="mono">{shortAddress(auction.seller)}</span>
          {isSeller && " (sen)"}
        </span>
        <span>Bitiş: {formatDateTime(auction.endTime)}</span>
        <span>Taban teklif: {formatXlm(auction.minBid)}</span>
      </div>

      {!ended && !auction.finalized && (
        <BidForm
          minNextBid={minNextBid}
          disabled={!address}
          submitting={submitting}
          onBid={(amount) => onBid(auction.id, amount, balance)}
        />
      )}

      {!address && !ended && (
        <p className="small-text hint">Teklif verebilmek için önce cüzdanını bağla.</p>
      )}

      {ended && !auction.finalized && (
        <>
          <p className="small-text hint">
            Süre doldu. Herkes sonuçlandırabilir — kazanan bedel satıcıya aktarılır ve platform
            sicil (registry) contract'ına bildirilir.
          </p>
          <button className="btn primary" disabled={!address || submitting} onClick={() => onFinalize(auction.id)}>
            {submitting ? "Sonuçlandırılıyor..." : "🏁 Sonuçlandır"}
          </button>
        </>
      )}

      {auction.finalized && (
        <p className="small-text hint">
          Açık artırma sonuçlandı, kazanan bedeli satıcıya aktarıldı ve registry contract'ına
          kaydedildi.
        </p>
      )}
    </div>
  );
}
