import { useCallback, useState } from "react";
import { fundWithFriendbot } from "../lib/friendbot";
import { classifyError } from "../lib/errors";
import { t } from "../lib/i18n";

// Level 4 hardening: testçilerin manuel Friendbot URL'i oluştururken takıldığı
// adımı ortadan kaldırıp uygulama içinden tek tıkla fonlama sağlar.
export function useFriendbot() {
  const [status, setStatus] = useState({ phase: "idle" });

  const fund = useCallback(async (address) => {
    setStatus({ phase: "pending", message: t("friendbot.requesting") });
    try {
      await fundWithFriendbot(address);
      setStatus({ phase: "success", message: t("friendbot.funded") });
    } catch (err) {
      if (err?.alreadyFunded) {
        setStatus({ phase: "success", message: t("friendbot.alreadyFunded") });
        return;
      }
      const classified = classifyError(err);
      setStatus({ phase: "fail", message: classified.message, errorType: classified.type });
    }
  }, []);

  return { status, fund };
}
