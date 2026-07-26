import { useState } from "react";
import { useLanguage } from "../lib/i18n";

export function PaymentForm({ onSend, loading }) {
  const { t } = useLanguage();
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
      <h2>{t("payment.title")}</h2>
      <label>
        {t("payment.destinationLabel")}
        <input
          type="text"
          placeholder="G..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </label>
      <label>
        {t("payment.amountLabel")}
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
        {loading ? t("common.sending") : t("payment.sendButton")}
      </button>
    </form>
  );
}
