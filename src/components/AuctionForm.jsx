import { useState } from "react";
import { getSavedDisplayName, saveDisplayName } from "../lib/displayName";
import { useLanguage } from "../lib/i18n";
import { NameField } from "./NameField";

export function AuctionForm({ disabled, submitting, onCreate }) {
  const { t } = useLanguage();
  const DURATION_PRESETS = [
    { label: t("auction.duration24h"), hours: 24 },
    { label: t("auction.duration3d"), hours: 72 },
    { label: t("auction.duration7d"), hours: 168 },
  ];
  const [sellerName, setSellerName] = useState(getSavedDisplayName());
  const [itemName, setItemName] = useState("");
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [minBid, setMinBid] = useState("");
  const [durationHours, setDurationHours] = useState(DURATION_PRESETS[0].hours);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sellerName || !itemName || !minBid) return;
    const durationSecs = Math.round(Number(durationHours) * 3600);
    try {
      await onCreate(sellerName, itemName, description, minBid, durationSecs);
      saveDisplayName(sellerName);
      setItemName("");
      setDescription("");
      setShowDescription(false);
      setMinBid("");
      setDurationHours(DURATION_PRESETS[0].hours);
    } catch {
      // Hata zaten StatusBanner üzerinden gösteriliyor.
    }
  };

  return (
    <form className="auction-form" onSubmit={handleSubmit}>
      <NameField name={sellerName} onChange={setSellerName} disabled={disabled} />
      <label>
        {t("auction.itemNameLabel")}
        <input
          type="text"
          placeholder={t("auction.itemNamePlaceholder")}
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      {showDescription ? (
        <label>
          {t("auction.descriptionLabel")}
          <input
            type="text"
            placeholder={t("auction.descriptionPlaceholder")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={disabled}
          />
        </label>
      ) : (
        <button type="button" className="link-button" onClick={() => setShowDescription(true)} disabled={disabled}>
          {t("auction.addDescriptionToggle")}
        </button>
      )}
      <label>
        {t("auction.minBidLabel")}
        <input
          type="number"
          step="0.0000001"
          min="0.0000001"
          placeholder="100"
          value={minBid}
          onChange={(e) => setMinBid(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      <label>
        {t("auction.durationLabel")}
        <select
          value={durationHours}
          onChange={(e) => setDurationHours(Number(e.target.value))}
          disabled={disabled}
        >
          {DURATION_PRESETS.map((preset) => (
            <option key={preset.hours} value={preset.hours}>
              {preset.label}
            </option>
          ))}
        </select>
      </label>
      <button className="btn primary" type="submit" disabled={disabled || submitting}>
        {submitting ? t("auction.submitting") : t("auction.submitButton")}
      </button>
    </form>
  );
}
