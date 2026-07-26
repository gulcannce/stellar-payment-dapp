import { useState } from "react";
import { getSavedDisplayName, saveDisplayName } from "../lib/displayName";
import { useLanguage } from "../lib/i18n";
import { NameField } from "./NameField";

export function BidForm({ minNextBid, disabled, submitting, onBid }) {
  const { t } = useLanguage();
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
      <NameField name={bidderName} onChange={setBidderName} disabled={disabled} />
      <label>
        {t("bid.amountLabel", { min: minNextBid.toFixed(2) })}
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
        {submitting ? t("bid.submitting") : t("bid.submitButton")}
      </button>
    </form>
  );
}
