import { useState } from "react";

export function PaymentForm({ onSend, loading }) {
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSend(destination.trim(), amount);
      setDestination("");
      setAmount("");
    } catch {
      // Hata zaten StatusBanner üzerinden gösteriliyor.
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>💸 XLM Gönder</h2>
      <label>
        Alıcı Adresi
        <input
          type="text"
          placeholder="G..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </label>
      <label>
        Miktar (XLM)
        <input
          type="number"
          step="0.0000001"
          min="0.0000001"
          placeholder="10"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <button className="btn primary" type="submit" disabled={loading}>
        {loading ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}
