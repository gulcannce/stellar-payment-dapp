import { useState } from "react";
import { getSavedDisplayName, saveDisplayName } from "../lib/displayName";
import { NameField } from "./NameField";

const DURATION_PRESETS = [
  { label: "24 saat", hours: 24 },
  { label: "3 gün", hours: 72 },
  { label: "7 gün", hours: 168 },
];

export function AuctionForm({ disabled, submitting, onCreate }) {
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
        Ürün Adı
        <input
          type="text"
          placeholder="Vintage Fotoğraf Makinesi"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      {showDescription ? (
        <label>
          Açıklama (opsiyonel)
          <input
            type="text"
            placeholder="35mm film makinesi, çalışır durumda"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={disabled}
          />
        </label>
      ) : (
        <button type="button" className="link-button" onClick={() => setShowDescription(true)} disabled={disabled}>
          + Açıklama ekle (opsiyonel)
        </button>
      )}
      <label>
        Taban Teklif (XLM)
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
        Süre
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
        {submitting ? "Açık artırma oluşturuluyor..." : "🔨 Açık Artırma Oluştur"}
      </button>
    </form>
  );
}
