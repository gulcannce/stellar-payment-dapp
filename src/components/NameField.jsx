import { useState } from "react";
import { useLanguage } from "../lib/i18n";

// İsim daha önce kaydedilmişse (bkz. lib/displayName) her formda yeniden
// doldurulması gereken bir input yerine tek satırlık bir "değiştir" bağlantısı
// gösterir — kullanıcı her teklif/ilanda aynı zorunlu alanı tekrar görmesin.
export function NameField({ name, onChange, disabled }) {
  const { t } = useLanguage();
  const [editing, setEditing] = useState(!name);

  if (!editing) {
    return (
      <p className="small-text hint name-display">
        👤 {t("nameField.actingAsBefore")}
        <strong>{name}</strong>
        {t("nameField.actingAsAfter")} ·{" "}
        <button type="button" className="link-button" onClick={() => setEditing(true)} disabled={disabled}>
          {t("nameField.change")}
        </button>
      </p>
    );
  }

  return (
    <label>
      {t("nameField.label")}
      <input
        type="text"
        placeholder={t("nameField.placeholder")}
        value={name}
        onChange={(e) => onChange(e.target.value)}
        required
        disabled={disabled}
      />
    </label>
  );
}
