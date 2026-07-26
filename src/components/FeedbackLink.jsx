import { FEEDBACK_FORM_URL } from "../lib/config";
import { useLanguage } from "../lib/i18n";

// Level 4: "kullanıcı geri bildirimi toplama" gereksinimi — özel bir backend
// kurmak yerine bilinçli olarak en basit çözüm: bir Google Form linki.
// Form URL'i henüz oluşturulmadıysa (config.js'te boş), kart hiç gösterilmez.
export function FeedbackLink() {
  const { t } = useLanguage();

  if (!FEEDBACK_FORM_URL) return null;

  return (
    <div className="card">
      <h2>{t("feedback.title")}</h2>
      <p className="small-text hint">{t("feedback.prompt")}</p>
      <a className="btn secondary" href={FEEDBACK_FORM_URL} target="_blank" rel="noreferrer">
        {t("feedback.button")}
      </a>
    </div>
  );
}
