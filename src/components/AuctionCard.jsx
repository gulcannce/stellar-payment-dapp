import { BidForm } from "./BidForm";
import { shortAddress, formatXlm, formatDateTime, isPast } from "../lib/format";

export function AuctionCard({ state, loading, address, balance, submitting, onBid }) {
  if (loading && !state) {
    return (
      <div className="card">
        <h2>🏺 Canlı Açık Artırma</h2>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!state) {
    return (
      <div className="card">
        <h2>🏺 Canlı Açık Artırma</h2>
        <p>Contract henüz başlatılmamış.</p>
      </div>
    );
  }

  const ended = isPast(state.endTime);
  const minNextBid = state.highestBidder ? state.highestBid + 0.01 : state.minBid;
  const isHighestBidder = address && state.highestBidder === address;

  return (
    <div className="card auction-card">
      <div className="row">
        <h2>🏺 Canlı Açık Artırma</h2>
        <span className={`badge ${ended ? "ended" : "active"}`}>
          {ended ? "Süre Doldu" : "Açık"}
        </span>
      </div>

      <div className="auction-highlight">
        <span className="label">En Yüksek Teklif</span>
        <p className="balance-value">{formatXlm(state.highestBid)}</p>
        {state.highestBidder && (
          <p className="mono small-text" title={state.highestBidder}>
            {isHighestBidder ? "👑 Sen önde gidiyorsun!" : shortAddress(state.highestBidder)}
          </p>
        )}
      </div>

      <div className="auction-meta">
        <span>
          Satıcı: <span className="mono">{shortAddress(state.seller)}</span>
        </span>
        <span>Bitiş: {formatDateTime(state.endTime)}</span>
        <span>Taban teklif: {formatXlm(state.minBid)}</span>
      </div>

      {!ended && !state.finalized && (
        <BidForm
          minNextBid={minNextBid}
          disabled={!address}
          submitting={submitting}
          onBid={(amount) => onBid(amount, balance)}
        />
      )}

      {!address && !ended && (
        <p className="small-text hint">Teklif verebilmek için önce cüzdanını bağla.</p>
      )}

      {(ended || state.finalized) && (
        <p className="small-text hint">
          {state.finalized
            ? "Açık artırma sonuçlandı, kazanan bedeli satıcıya aktarıldı."
            : "Süre doldu, sonuçlanmayı bekliyor."}
        </p>
      )}
    </div>
  );
}
