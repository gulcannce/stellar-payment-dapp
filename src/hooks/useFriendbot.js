import { useCallback, useState } from "react";
import { fundWithFriendbot } from "../lib/friendbot";
import { classifyError } from "../lib/errors";

// Level 4 hardening: testçilerin manuel Friendbot URL'i oluştururken takıldığı
// adımı ortadan kaldırıp uygulama içinden tek tıkla fonlama sağlar.
export function useFriendbot() {
  const [status, setStatus] = useState({ phase: "idle" });

  const fund = useCallback(async (address) => {
    setStatus({ phase: "pending", message: "Test XLM isteniyor..." });
    try {
      await fundWithFriendbot(address);
      setStatus({ phase: "success", message: "10.000 test XLM hesabına gönderildi! 🎉" });
    } catch (err) {
      if (err?.alreadyFunded) {
        setStatus({ phase: "success", message: "Bu cüzdan zaten fonlanmış, ek test XLM'e gerek yok." });
        return;
      }
      const classified = classifyError(err);
      setStatus({ phase: "fail", message: classified.message, errorType: classified.type });
    }
  }, []);

  return { status, fund };
}
