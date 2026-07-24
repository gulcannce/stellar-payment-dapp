import { FEEDBACK_FORM_URL } from "../lib/config";

// Level 4: "kullanıcı geri bildirimi toplama" gereksinimi — özel bir backend
// kurmak yerine bilinçli olarak en basit çözüm: bir Google Form linki.
// Form URL'i henüz oluşturulmadıysa (config.js'te boş), kart hiç gösterilmez.
export function FeedbackLink() {
  if (!FEEDBACK_FORM_URL) return null;

  return (
    <div className="card">
      <h2>📝 Geri Bildirim</h2>
      <p className="small-text hint">Uygulamayı denedin mi? Görüşlerin bir sonraki sürümü şekillendirir.</p>
      <a className="btn secondary" href={FEEDBACK_FORM_URL} target="_blank" rel="noreferrer">
        Geri Bildirim Bırak
      </a>
    </div>
  );
}
