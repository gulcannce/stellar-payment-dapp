import { useState } from "react";
import { getSavedDisplayName, saveDisplayName } from "../lib/displayName";

export function BidForm({ minNextBid, disabled, submitting, onBid }) {
  const [bidderName, setBidderName] = useState(getSavedDisplayName());
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bidderName || !amount) return;
    try {
      await onBid(amount, bidderName);
      saveDisplayName(bidderName);
      setAmount("");
    } catch {
      // Hata zaten StatusBanner üzerinden gösteriliyor.
    }
  };

  return (
    <form className="bid-form" onSubmit={handleSubmit}>
      <label>
        Adın
        <input
          type="text"
          placeholder="Ayşe Yılmaz"
          value={bidderName}
          onChange={(e) => setBidderName(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      <label>
        Teklifin (XLM) — en az {minNextBid.toFixed(2)} XLM
        <input
          type="number"
          step="0.0000001"
          min={minNextBid}
          placeholder={minNextBid.toFixed(2)}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      <button className="btn primary" type="submit" disabled={disabled || submitting}>
        {submitting ? "Teklif gönderiliyor..." : "🔨 Teklif Ver"}
      </button>
    </form>
  );
}
