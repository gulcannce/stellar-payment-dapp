import { useState } from "react";

// İsim daha önce kaydedilmişse (bkz. lib/displayName) her formda yeniden
// doldurulması gereken bir input yerine tek satırlık bir "değiştir" bağlantısı
// gösterir — kullanıcı her teklif/ilanda aynı zorunlu alanı tekrar görmesin.
export function NameField({ name, onChange, disabled }) {
  const [editing, setEditing] = useState(!name);

  if (!editing) {
    return (
      <p className="small-text hint name-display">
        👤 <strong>{name}</strong> olarak işlem yapıyorsun ·{" "}
        <button type="button" className="link-button" onClick={() => setEditing(true)} disabled={disabled}>
          değiştir
        </button>
      </p>
    );
  }

  return (
    <label>
      Adın
      <input
        type="text"
        placeholder="Ayşe Yılmaz"
        value={name}
        onChange={(e) => onChange(e.target.value)}
        required
        disabled={disabled}
      />
    </label>
  );
}
