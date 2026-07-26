import { useState } from "react";
import { getSavedDisplayName, saveDisplayName } from "../lib/displayName";

export function AuctionForm({ disabled, submitting, onCreate }) {
  const [sellerName, setSellerName] = useState(getSavedDisplayName());
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [minBid, setMinBid] = useState("");
  const [durationHours, setDurationHours] = useState("24");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sellerName || !itemName || !minBid || !durationHours) return;
    const durationSecs = Math.round(Number(durationHours) * 3600);
    try {
      await onCreate(sellerName, itemName, description, minBid, durationSecs);
      saveDisplayName(sellerName);
      setItemName("");
      setDescription("");
      setMinBid("");
      setDurationHours("24");
    } catch {
      // Hata zaten StatusBanner üzerinden gösteriliyor.
    }
  };

  return (
    <form className="auction-form" onSubmit={handleSubmit}>
      <label>
        Adın
        <input
          type="text"
          placeholder="Ayşe Yılmaz"
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
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
        Süre (saat)
        <input
          type="number"
          step="1"
          min="1"
          placeholder="24"
          value={durationHours}
          onChange={(e) => setDurationHours(e.target.value)}
          required
          disabled={disabled}
        />
      </label>
      <button className="btn primary" type="submit" disabled={disabled || submitting}>
        {submitting ? "Açık artırma oluşturuluyor..." : "🔨 Açık Artırma Oluştur"}
      </button>
    </form>
  );
}
