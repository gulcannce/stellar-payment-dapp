import { AuctionCard } from "./AuctionCard";

// Faturaların aksine açık artırmalar herkese açık bir vitrin — cüzdan
// bağlı olmasa da listelenebilir, sadece teklif verme/sonuçlandırma
// cüzdan gerektirir (bkz. AuctionCard'ın kendi address kontrolleri).
export function AuctionList({ auctions, loading, address, balance, submitting, onBid, onFinalize }) {
  if (loading) {
    return (
      <div className="card">
        <h2>🏺 Açık Artırmalar</h2>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (auctions.length === 0) {
    return (
      <div className="card">
        <h2>🏺 Açık Artırmalar</h2>
        <p className="small-text hint">Şu an açık bir artırma yok. Yukarıdan ilkini sen oluştur!</p>
      </div>
    );
  }

  return (
    <div className="invoice-list">
      <h2>🏺 Açık Artırmalar</h2>
      {auctions.map((auction) => (
        <AuctionCard
          key={auction.id}
          auction={auction}
          address={address}
          balance={balance}
          submitting={submitting}
          onBid={onBid}
          onFinalize={onFinalize}
        />
      ))}
    </div>
  );
}
