export const RPC_URL = "https://soroban-testnet.stellar.org";
export const HORIZON_URL = "https://horizon-testnet.stellar.org";
export const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";
export const FRIENDBOT_URL = "https://friendbot.stellar.org";

// contracts/auction v6 — 26 Temmuz 2026'da satıcı/teklif veren için gerçek
// isim alanları eklendi (create_auction'a seller_name, bid'e bidder_name).
// Öncesinde kartlarda sadece kısaltılmış cüzdan adresi görünüyordu ("GABC...XYZ")
// — gerçek açık artırma sitelerindeki gibi okunabilir bir isim göstermek için
// Auction struct'ına seller_name + highest_bidder_name eklendi (bkz. CLAUDE.md).
// v5'teki tek listing'de ("Vintage Fotoğraf Makinesi") hiç teklif yoktu (highest_bid: 0),
// yani geçişte emanette bekleyen gerçek bir bakiye yoktu. Önceki instance'lar
// (v1-v5) geçmiş seviyelerin kanıtı olarak testnet'te canlı kalıyor:
// v5: CBERDEJ3A6DAPYDUXKMWGVOGFYMRXLMV6XTK37WPVGDUMRY73SPQK2JX
// v4: CBF6ASW3BJ6JVNBHJV7P2TXU7OPGTD2EM5HZFKGWUJ6A33EBLVXC5VVC
// v3: CCIO4FACYBGQJJIPBRPQFJ3UGWSOELLM52YG7BICEBTUHSXN75G7WS25
// v2: CCWBM53KQO4OO5FUTT7U6ZEXSE3IUEGGYBVVHW54LMBVLBE36F7MZBRM
// v1: CCQFEVYW2DXCV4P6YRLJIPWXHV6WWOYKKWRYEYEXLFDZH6IOPCXSMTZV
// Build-time'da import.meta.env.VITE_* ile ezilebilir (bkz. Vercel deploy ayarları);
// yoksa yerel geliştirme için bilinen testnet adresleri kullanılır.
export const CONTRACT_ID =
  import.meta.env.VITE_CONTRACT_ID || "CCXMH4VWSBPW5QB7C4N4WTSL2PSOLIVC3NTM5PO37XESMF4TNBEJG6WN";
// contracts/registry v2 — auction'ın finalize()'ının çağırdığı platform geneli
// istatistik contract'ı (inter-contract iletişim). v2'ye geçildi çünkü tek bir
// auction contract adresi artık birden fazla açık artırma barındırıyor;
// record_finalized_auction'a bir auction_id parametresi eklendi, tekilleştirme
// artık (adres, id) ikilisine göre yapılıyor (eskiden sadece adrese göreydi,
// bu da aynı adresten 2. bir açık artırmanın hiç kaydedilmemesine yol açardı).
// Eski registry (v1, Level 2/3 kanıtı) değişmeden testnet'te canlı kalıyor:
// v1: CAIRCD3TGGTYML4FFK3WFBC2KFCIJ5ZHQCOVG67FGBHQBAEXOLXE7CV7
export const REGISTRY_ID =
  import.meta.env.VITE_REGISTRY_ID || "CCYLRPIJTNIHTV6ISCYV2WZMQ7TXBEAZDD7DGWTHFSZXWDFAEHVDKEIW";
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
