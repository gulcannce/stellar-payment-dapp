import { FRIENDBOT_URL } from "./config";

// Testçilerin "?addr=..." kısmını elle URL'ye eklerken yaptığı format hatasını
// (Friendbot'un "invalid_field: addr" ile reddettiği durum) ortadan kaldırır —
// adres doğrudan bağlı cüzdandan alınıp istek burada kurulur.
export async function fundWithFriendbot(address) {
  const res = await fetch(`${FRIENDBOT_URL}/?addr=${encodeURIComponent(address)}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const detail = body.detail || body.reason || `Friendbot hatası (${res.status})`;
    // Friendbot, zaten fonlanmış bir hesap için "account already funded to
    // starting balance" döner — mesajdaki "balance" kelimesi classifyError'da
    // yanlışlıkla "yetersiz bakiye" ile eşleşmesin diye burada ayrıca işaretliyoruz.
    const err = new Error(detail);
    err.alreadyFunded = detail.includes("already funded");
    throw err;
  }
  return res.json();
}
