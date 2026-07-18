import { useState } from "react";

export function BidForm({ minNextBid, disabled, submitting, onBid }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;
    try {
      await onBid(amount);
      setAmount("");
    } catch {
      // Hata zaten StatusBanner üzerinden gösteriliyor.
    }
  };

  return (
    <form className="bid-form" onSubmit={handleSubmit}>
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
