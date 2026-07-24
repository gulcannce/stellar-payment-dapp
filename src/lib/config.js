export const RPC_URL = "https://soroban-testnet.stellar.org";
export const HORIZON_URL = "https://horizon-testnet.stellar.org";
export const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

// contracts/auction v3 — 24 Temmuz 2026'da demo videosu için yeni bir açık artırma
// instance'ı deploy edildi (v2'nin süresi dolmuştu). Aynı registry yeniden kullanıldı.
// Level 3 kanıtı olarak v2 hâlâ canlı: CCWBM53KQO4OO5FUTT7U6ZEXSE3IUEGGYBVVHW54LMBVLBE36F7MZBRM
// Level 2 kanıtı olarak eski v1 contract'ı hâlâ canlı: CCQFEVYW2DXCV4P6YRLJIPWXHV6WWOYKKWRYEYEXLFDZH6IOPCXSMTZV
// Build-time'da import.meta.env.VITE_* ile ezilebilir (bkz. Vercel deploy ayarları);
// yoksa yerel geliştirme için bilinen testnet adresleri kullanılır.
export const CONTRACT_ID =
  import.meta.env.VITE_CONTRACT_ID || "CCIO4FACYBGQJJIPBRPQFJ3UGWSOELLM52YG7BICEBTUHSXN75G7WS25";
// contracts/registry — auction'ın finalize()'ının çağırdığı platform geneli
// istatistik contract'ı (inter-contract iletişim).
export const REGISTRY_ID =
  import.meta.env.VITE_REGISTRY_ID || "CAIRCD3TGGTYML4FFK3WFBC2KFCIJ5ZHQCOVG67FGBHQBAEXOLXE7CV7";
// Native XLM'in Stellar Asset Contract (SAC) adresi — auction contract'ının
// ödeme/iade transferlerinde kullandığı token.
export const TOKEN_ID =
  import.meta.env.VITE_TOKEN_ID || "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC";

// contracts/invoice (Level 4) — 24 Temmuz 2026'da testnet'e deploy edildi,
// aynı native XLM token'ıyla initialize edildi.
export const INVOICE_CONTRACT_ID =
  import.meta.env.VITE_INVOICE_CONTRACT_ID || "CD6FLY7IQ2J2ZI5E6OJC37D44A6PHYAGX7WX3KHY5F2JHIYWNMK47NKI";

// Level 4 kullanıcı geri bildirim formu (Google Form, 24 Temmuz 2026'da oluşturuldu).
export const FEEDBACK_FORM_URL =
  import.meta.env.VITE_FEEDBACK_FORM_URL ||
  "https://docs.google.com/forms/d/e/1FAIpQLSeBVrfm_zY98r8lfZe9aEegB3RpHIxmpYerP17BTstCC0NDaA/viewform";

export const STROOPS_PER_XLM = 10_000_000;

export const explorerTxUrl = (hash) =>
  `https://stellar.expert/explorer/testnet/tx/${hash}`;
export const explorerContractUrl = (id) =>
  `https://stellar.expert/explorer/testnet/contract/${id}`;
