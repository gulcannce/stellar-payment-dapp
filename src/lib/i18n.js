import { useEffect, useState } from "react";

const STORAGE_KEY = "glowpay_lang";

function readSavedLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "tr" || saved === "en" ? saved : "tr";
  } catch {
    return "tr";
  }
}

let currentLang = readSavedLanguage();
const listeners = new Set();

export function getLanguage() {
  return currentLang;
}

export function setLanguage(lang) {
  if (lang !== "tr" && lang !== "en") return;
  currentLang = lang;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage kullanılamıyorsa (gizli sekme vb.) sessizce yok say.
  }
  listeners.forEach((listener) => listener(lang));
}

const translations = {
  tr: {
    "app.subtitle": "Stellar Testnet üzerinde fatura takibi ve açık artırma",

    "tabs.auction": "🔨 Açık Artırma",
    "tabs.invoice": "🧾 Faturalar",
    "tabs.payment": "💸 Ödeme",

    "common.loading": "Yükleniyor...",
    "common.sending": "Gönderiliyor...",

    "wallet.connecting": "Bağlanıyor...",
    "wallet.connect": "🔗 Cüzdan Bağla",
    "wallet.connectedLabel": "Bağlı Cüzdan",
    "wallet.disconnect": "Bağlantıyı Kes",

    "balance.label": "XLM Bakiyesi",
    "balance.refresh": "↻ Yenile",
    "balance.fund": "🚰 Test XLM Al",

    "payment.title": "💸 XLM Gönder",
    "payment.destinationLabel": "Alıcı Adresi",
    "payment.amountLabel": "Miktar (XLM)",
    "payment.sendButton": "Gönder",
    "payment.connectHint": "Ödeme gönderebilmek için önce cüzdanını bağla.",

    "history.title": "🕘 Son İşlemler",
    "history.sent": "➤ Gönderildi",
    "history.received": "✔ Alındı",

    "auction.createTitle": "🔨 Açık Artırma Oluştur",
    "auction.itemNameLabel": "Ürün Adı",
    "auction.itemNamePlaceholder": "Vintage Fotoğraf Makinesi",
    "auction.descriptionLabel": "Açıklama (opsiyonel)",
    "auction.descriptionPlaceholder": "35mm film makinesi, çalışır durumda",
    "auction.addDescriptionToggle": "+ Açıklama ekle (opsiyonel)",
    "auction.minBidLabel": "Taban Teklif (XLM)",
    "auction.durationLabel": "Süre",
    "auction.duration24h": "24 saat",
    "auction.duration3d": "3 gün",
    "auction.duration7d": "7 gün",
    "auction.submitButton": "🔨 Açık Artırma Oluştur",
    "auction.submitting": "Açık artırma oluşturuluyor...",
    "auction.listTitle": "🔨 Açık Artırmalar",
    "auction.emptyHint": "Şu an açık bir artırma yok. Yukarıdan ilkini sen oluştur!",
    "auction.highestBidLabel": "En Yüksek Teklif",
    "auction.youAreLeading": "👑 Sen önde gidiyorsun!",
    "auction.sellerLabel": "Satıcı:",
    "auction.youMarker": "(sen)",
    "auction.endLabel": "Bitiş:",
    "auction.minBidMetaLabel": "Taban teklif:",
    "auction.connectToBidHint": "Teklif verebilmek için önce cüzdanını bağla.",
    "auction.endedFinalizeHint":
      "Süre doldu. Herkes sonuçlandırabilir — kazanan bedel satıcıya aktarılır ve platform sicil (registry) contract'ına bildirilir.",
    "auction.finalizeButton": "🏁 Sonuçlandır",
    "auction.finalizing": "Sonuçlandırılıyor...",
    "auction.finalizedHint":
      "Açık artırma sonuçlandı, kazanan bedeli satıcıya aktarıldı ve registry contract'ına kaydedildi.",
    "auction.statusEnded": "Süre Doldu",
    "auction.statusActive": "Açık",
    "auction.createdSuccess": "Açık artırma oluşturuldu! 🔨",
    "auction.bidSuccess": "Teklif başarıyla kabul edildi! 🎉",
    "auction.finalizeSuccess": "Açık artırma sonuçlandırıldı! 🏁",

    "nameField.label": "Adın",
    "nameField.placeholder": "Ayşe Yılmaz",
    "nameField.actingAsBefore": "",
    "nameField.actingAsAfter": " olarak işlem yapıyorsun",
    "nameField.change": "değiştir",

    "bid.amountLabel": "Teklifin (XLM) — en az {min} XLM",
    "bid.submitButton": "🔨 Teklif Ver",
    "bid.submitting": "Teklif gönderiliyor...",

    "invoice.createTitle": "🧾 Fatura Oluştur",
    "invoice.payerLabel": "Ödeyecek Kişinin Adresi",
    "invoice.amountLabel": "Tutar (XLM)",
    "invoice.dueDateLabel": "Son Ödeme Tarihi",
    "invoice.memoLabel": "Açıklama (opsiyonel)",
    "invoice.memoPlaceholder": "Web sitesi tasarımı",
    "invoice.submitButton": "🧾 Fatura Oluştur",
    "invoice.submitting": "Fatura oluşturuluyor...",
    "invoice.connectHint": "Faturalarını görmek ve oluşturmak için önce cüzdanını bağla.",
    "invoice.listTitle": "🧾 Faturalarım",
    "invoice.emptyHint": "Henüz bir faturan yok. Yukarıdan ilk faturanı oluştur!",
    "invoice.statusDraft": "Taslak",
    "invoice.statusSent": "Gönderildi",
    "invoice.statusOverdue": "Süresi Geçti",
    "invoice.statusPaid": "Ödendi",
    "invoice.statusCancelled": "İptal Edildi",
    "invoice.cardTitle": "🧾 Fatura #{id}",
    "invoice.amountMetaLabel": "Tutar",
    "invoice.payeeLabel": "Alacaklı:",
    "invoice.payerMetaLabel": "Borçlu:",
    "invoice.dueMetaLabel": "Son ödeme:",
    "invoice.memoMetaLabel": "Açıklama:",
    "invoice.sendButton": "📤 Gönder",
    "invoice.cancelButton": "İptal Et",
    "invoice.payButton": "✅ Öde",
    "invoice.paying": "Ödeniyor...",
    "invoice.awaitingPaymentHint": "Borçlunun ödemesi bekleniyor.",
    "invoice.notSentHint": "Bu fatura henüz gönderilmedi.",
    "invoice.paidHint": "Bu fatura ödendi.",
    "invoice.cancelledHint": "Bu fatura iptal edildi.",
    "invoice.createdSuccess": "Fatura oluşturuldu! 🧾",
    "invoice.sentSuccess": "Fatura gönderildi. 📤",
    "invoice.paidSuccess": "Fatura ödendi! ✅",
    "invoice.cancelledSuccess": "Fatura iptal edildi.",

    "eventFeed.title": "📡 Canlı Olay Akışı",
    "eventFeed.emptyHint": "Henüz bir olay yok. İlk teklifi sen ver!",
    "eventFeed.showMore": "+ {n} olay daha göster",
    "eventFeed.collapse": "daralt",
    "eventFeed.auctionCreated": "🔨 Yeni açık artırma #{id}: taban teklif {amount}",
    "eventFeed.newBid": "Açık Artırma #{id}: {bidder} → {amount} teklif verdi",
    "eventFeed.auctionFinalized": "Açık Artırma #{id} sonuçlandı: kazanan teklif {amount}",
    "eventFeed.auctionRecorded": "📋 Sicile kaydedildi: Açık Artırma #{id} ({address}) — {amount}",
    "eventFeed.invoiceCreated": "🧾 Yeni fatura #{id}: {payee} → {payer} ({amount})",
    "eventFeed.invoiceSent": "📤 Fatura #{id} gönderildi",
    "eventFeed.invoicePaid": "✅ Fatura #{id} ödendi: {payer} → {amount}",
    "eventFeed.invoiceCancelled": "❌ Fatura #{id} iptal edildi",

    "feedback.title": "📝 Geri Bildirim",
    "feedback.prompt": "Uygulamayı denedin mi? Görüşlerin bir sonraki sürümü şekillendirir.",
    "feedback.button": "Geri Bildirim Bırak",

    "statusBanner.errorTypeLabel": "Hata türü:",
    "statusBanner.hashLabel": "Hash:",
    "statusBanner.viewOnExplorer": "Stellar Expert'te görüntüle ↗",

    "tx.preparing": "İşlem hazırlanıyor...",
    "tx.awaitingSignature": "Cüzdanda işlemi onayla...",
    "tx.submitting": "İşlem ağa gönderiliyor...",
    "tx.confirming": "İşlem ledger'a işleniyor, onay bekleniyor...",
    "tx.submitFailed": "İşlem gönderilemedi: {status}",
    "tx.txFailed": "İşlem başarısız oldu: {status}",

    "payment.success": "İşlem başarılı! 🎉",

    "friendbot.requesting": "Test XLM isteniyor...",
    "friendbot.funded": "10.000 test XLM hesabına gönderildi! 🎉",
    "friendbot.alreadyFunded": "Bu cüzdan zaten fonlanmış, ek test XLM'e gerek yok.",
    "friendbot.genericError": "Friendbot hatası ({status})",

    "error.walletNotFound":
      "Cüzdan bulunamadı. Seçtiğin cüzdanın tarayıcında kurulu ve bağlı olduğundan emin ol.",
    "error.rejected": "İşlem cüzdanda reddedildi.",
    "error.insufficientBalance": "Yetersiz bakiye. Testnet'te Friendbot ile fonlaman gerekebilir.",
    "error.unknown": "Bilinmeyen bir hata oluştu.",
    "error.connectWalletFirst": "Önce bir cüzdan bağla.",
    "error.insufficientBalanceDetailed":
      "Yetersiz bakiye: {amount} XLM göndermek için (+{buffer} XLM ücret/rezerv payı) en az {required} XLM gerekli, mevcut bakiye {balance} XLM.",
  },
  en: {
    "app.subtitle": "Invoice tracking and live auctions on Stellar Testnet",

    "tabs.auction": "🔨 Auction",
    "tabs.invoice": "🧾 Invoices",
    "tabs.payment": "💸 Payment",

    "common.loading": "Loading...",
    "common.sending": "Sending...",

    "wallet.connecting": "Connecting...",
    "wallet.connect": "🔗 Connect Wallet",
    "wallet.connectedLabel": "Connected Wallet",
    "wallet.disconnect": "Disconnect",

    "balance.label": "XLM Balance",
    "balance.refresh": "↻ Refresh",
    "balance.fund": "🚰 Get Test XLM",

    "payment.title": "💸 Send XLM",
    "payment.destinationLabel": "Recipient Address",
    "payment.amountLabel": "Amount (XLM)",
    "payment.sendButton": "Send",
    "payment.connectHint": "Connect your wallet first to send a payment.",

    "history.title": "🕘 Recent Transactions",
    "history.sent": "➤ Sent",
    "history.received": "✔ Received",

    "auction.createTitle": "🔨 Create Auction",
    "auction.itemNameLabel": "Item Name",
    "auction.itemNamePlaceholder": "Vintage Camera",
    "auction.descriptionLabel": "Description (optional)",
    "auction.descriptionPlaceholder": "35mm film camera, works great",
    "auction.addDescriptionToggle": "+ Add description (optional)",
    "auction.minBidLabel": "Starting Bid (XLM)",
    "auction.durationLabel": "Duration",
    "auction.duration24h": "24 hours",
    "auction.duration3d": "3 days",
    "auction.duration7d": "7 days",
    "auction.submitButton": "🔨 Create Auction",
    "auction.submitting": "Creating auction...",
    "auction.listTitle": "🔨 Auctions",
    "auction.emptyHint": "No open auctions yet. Create the first one above!",
    "auction.highestBidLabel": "Highest Bid",
    "auction.youAreLeading": "👑 You're in the lead!",
    "auction.sellerLabel": "Seller:",
    "auction.youMarker": "(you)",
    "auction.endLabel": "Ends:",
    "auction.minBidMetaLabel": "Starting bid:",
    "auction.connectToBidHint": "Connect your wallet first to place a bid.",
    "auction.endedFinalizeHint":
      "Time's up. Anyone can finalize it — the winning bid is released to the seller and reported to the platform registry contract.",
    "auction.finalizeButton": "🏁 Finalize",
    "auction.finalizing": "Finalizing...",
    "auction.finalizedHint":
      "This auction has been finalized — the winning bid was released to the seller and recorded on the registry contract.",
    "auction.statusEnded": "Ended",
    "auction.statusActive": "Open",
    "auction.createdSuccess": "Auction created! 🔨",
    "auction.bidSuccess": "Bid accepted! 🎉",
    "auction.finalizeSuccess": "Auction finalized! 🏁",

    "nameField.label": "Your name",
    "nameField.placeholder": "Jane Doe",
    "nameField.actingAsBefore": "Acting as ",
    "nameField.actingAsAfter": "",
    "nameField.change": "change",

    "bid.amountLabel": "Your bid (XLM) — at least {min} XLM",
    "bid.submitButton": "🔨 Place Bid",
    "bid.submitting": "Submitting bid...",

    "invoice.createTitle": "🧾 Create Invoice",
    "invoice.payerLabel": "Payer's Address",
    "invoice.amountLabel": "Amount (XLM)",
    "invoice.dueDateLabel": "Due Date",
    "invoice.memoLabel": "Memo (optional)",
    "invoice.memoPlaceholder": "Website design",
    "invoice.submitButton": "🧾 Create Invoice",
    "invoice.submitting": "Creating invoice...",
    "invoice.connectHint": "Connect your wallet first to view and create invoices.",
    "invoice.listTitle": "🧾 My Invoices",
    "invoice.emptyHint": "You don't have any invoices yet. Create your first one above!",
    "invoice.statusDraft": "Draft",
    "invoice.statusSent": "Sent",
    "invoice.statusOverdue": "Overdue",
    "invoice.statusPaid": "Paid",
    "invoice.statusCancelled": "Cancelled",
    "invoice.cardTitle": "🧾 Invoice #{id}",
    "invoice.amountMetaLabel": "Amount",
    "invoice.payeeLabel": "Payee:",
    "invoice.payerMetaLabel": "Payer:",
    "invoice.dueMetaLabel": "Due:",
    "invoice.memoMetaLabel": "Memo:",
    "invoice.sendButton": "📤 Send",
    "invoice.cancelButton": "Cancel",
    "invoice.payButton": "✅ Pay",
    "invoice.paying": "Paying...",
    "invoice.awaitingPaymentHint": "Waiting for the payer to pay.",
    "invoice.notSentHint": "This invoice hasn't been sent yet.",
    "invoice.paidHint": "This invoice has been paid.",
    "invoice.cancelledHint": "This invoice has been cancelled.",
    "invoice.createdSuccess": "Invoice created! 🧾",
    "invoice.sentSuccess": "Invoice sent. 📤",
    "invoice.paidSuccess": "Invoice paid! ✅",
    "invoice.cancelledSuccess": "Invoice cancelled.",

    "eventFeed.title": "📡 Live Activity Feed",
    "eventFeed.emptyHint": "No activity yet. Place the first bid!",
    "eventFeed.showMore": "+ {n} more events",
    "eventFeed.collapse": "collapse",
    "eventFeed.auctionCreated": "🔨 New auction #{id}: starting bid {amount}",
    "eventFeed.newBid": "Auction #{id}: {bidder} bid {amount}",
    "eventFeed.auctionFinalized": "Auction #{id} finalized: winning bid {amount}",
    "eventFeed.auctionRecorded": "📋 Recorded in registry: Auction #{id} ({address}) — {amount}",
    "eventFeed.invoiceCreated": "🧾 New invoice #{id}: {payee} → {payer} ({amount})",
    "eventFeed.invoiceSent": "📤 Invoice #{id} sent",
    "eventFeed.invoicePaid": "✅ Invoice #{id} paid: {payer} → {amount}",
    "eventFeed.invoiceCancelled": "❌ Invoice #{id} cancelled",

    "feedback.title": "📝 Feedback",
    "feedback.prompt": "Tried the app? Your feedback shapes the next version.",
    "feedback.button": "Leave Feedback",

    "statusBanner.errorTypeLabel": "Error type:",
    "statusBanner.hashLabel": "Hash:",
    "statusBanner.viewOnExplorer": "View on Stellar Expert ↗",

    "tx.preparing": "Preparing transaction...",
    "tx.awaitingSignature": "Approve the transaction in your wallet...",
    "tx.submitting": "Submitting transaction to the network...",
    "tx.confirming": "Waiting for ledger confirmation...",
    "tx.submitFailed": "Transaction submission failed: {status}",
    "tx.txFailed": "Transaction failed: {status}",

    "payment.success": "Payment sent! 🎉",

    "friendbot.requesting": "Requesting test XLM...",
    "friendbot.funded": "10,000 test XLM sent to your account! 🎉",
    "friendbot.alreadyFunded": "This wallet is already funded, no need for more test XLM.",
    "friendbot.genericError": "Friendbot error ({status})",

    "error.walletNotFound":
      "Wallet not found. Make sure your selected wallet is installed and connected in your browser.",
    "error.rejected": "Transaction rejected in the wallet.",
    "error.insufficientBalance": "Insufficient balance. You may need to fund your wallet via Friendbot on testnet.",
    "error.unknown": "An unknown error occurred.",
    "error.connectWalletFirst": "Connect a wallet first.",
    "error.insufficientBalanceDetailed":
      "Insufficient balance: sending {amount} XLM requires at least {required} XLM (+{buffer} XLM fee/reserve buffer), current balance is {balance} XLM.",
  },
};

export function translate(lang, key, params) {
  const dict = translations[lang] || translations.tr;
  let text = dict[key] ?? translations.tr[key] ?? key;
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.replaceAll(`{${name}}`, value);
    }
  }
  return text;
}

export function t(key, params) {
  return translate(currentLang, key, params);
}

export function useLanguage() {
  const [lang, setLangState] = useState(currentLang);

  useEffect(() => {
    listeners.add(setLangState);
    return () => listeners.delete(setLangState);
  }, []);

  return {
    lang,
    setLang: setLanguage,
    t: (key, params) => translate(lang, key, params),
  };
}
