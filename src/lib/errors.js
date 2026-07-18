// Level 2 gereksinimi: en az 3 ayrı hata türü net biçimde sınıflandırılmalı.
export const ERROR_TYPES = {
  WALLET_NOT_FOUND: "wallet-not-found",
  REJECTED: "rejected",
  INSUFFICIENT_BALANCE: "insufficient-balance",
  UNKNOWN: "unknown",
};

const NOT_FOUND_HINTS = [
  "not connected",
  "not installed",
  "not available",
  "no wallet",
  "is not defined",
];

const REJECTED_HINTS = [
  "declin",
  "reject",
  "denied",
  "cancel",
  "user closed",
  "permission",
];

const INSUFFICIENT_BALANCE_HINTS = [
  "insufficient",
  "underfunded",
  "balance",
  "tx_bad_auth_extra",
  "trustline",
];

function messageOf(err) {
  if (!err) return "";
  if (typeof err === "string") return err;
  const resultCodes = err.response?.data?.extras?.result_codes;
  if (resultCodes) return JSON.stringify(resultCodes);
  return err.message || err.error?.message || JSON.stringify(err);
}

export function classifyError(err) {
  const message = messageOf(err);
  const lower = message.toLowerCase();

  if (err?.type && Object.values(ERROR_TYPES).includes(err.type)) {
    // Zaten sınıflandırılmışsa (örn. bakiye ön kontrolünden geliyorsa) aynen geçir.
    return err;
  }

  if (NOT_FOUND_HINTS.some((hint) => lower.includes(hint))) {
    return {
      type: ERROR_TYPES.WALLET_NOT_FOUND,
      message: "Cüzdan bulunamadı. Seçtiğin cüzdanın tarayıcında kurulu ve bağlı olduğundan emin ol.",
    };
  }

  if (REJECTED_HINTS.some((hint) => lower.includes(hint))) {
    return {
      type: ERROR_TYPES.REJECTED,
      message: "İşlem cüzdanda reddedildi.",
    };
  }

  if (INSUFFICIENT_BALANCE_HINTS.some((hint) => lower.includes(hint))) {
    return {
      type: ERROR_TYPES.INSUFFICIENT_BALANCE,
      message: "Yetersiz bakiye. Testnet'te Friendbot ile fonlaman gerekebilir.",
    };
  }

  return {
    type: ERROR_TYPES.UNKNOWN,
    message: message || "Bilinmeyen bir hata oluştu.",
  };
}

// Bakiyeyi zincire hiç göndermeden, işlem ücreti + minimum hesap rezervi için
// bir tampon bırakarak client-side ön kontrol yapar.
export function assertSufficientBalance(balanceXlm, amountXlm, { bufferXlm = 1.5 } = {}) {
  const balance = Number(balanceXlm);
  const amount = Number(amountXlm);
  if (!Number.isFinite(balance) || !Number.isFinite(amount)) return;

  if (amount + bufferXlm > balance) {
    throw {
      type: ERROR_TYPES.INSUFFICIENT_BALANCE,
      message: `Yetersiz bakiye: ${amount} XLM göndermek için (+${bufferXlm} XLM ücret/rezerv payı) en az ${(
        amount + bufferXlm
      ).toFixed(2)} XLM gerekli, mevcut bakiye ${balance.toFixed(2)} XLM.`,
    };
  }
}
