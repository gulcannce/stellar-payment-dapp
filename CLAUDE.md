# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Standartlar
- Dil: Türkçe (kod içi yorumlar dahil — mevcut yorumlar Türkçe, bu üsluba devam et)

## Proje bağlamı

Rise In "Stellar Journey to Mastery" challenge submission'ı. Seviyeler tek bir repo/uygulama üzerinde ilerletiliyor — her level bir öncekinin üzerine inşa ediliyor, eskisi silinmiyor:
- **Level 1 (Approved):** basit ödeme dApp'ı (Freighter, XLM bakiye/gönderme, işlem geçmişi) — hâlâ uygulamada mevcut.
- **Level 2 (Approved):** aynı uygulama canlı bir **on-chain açık artırma**ya evrildi — multi-wallet, deploy edilmiş Soroban contract (`contracts/auction`), gerçek zamanlı event senkronizasyonu, açık transaction-status state machine.
- **Level 3 (24 Temmuz 2026'da submit edildi, RiseIn'de "Pending Review" — inceleme bekleniyor):** `contracts/registry` eklendi — auction'ın `finalize()`'ı registry'yi çağırıyor (inter-contract iletişim). CI/CD (`.github/workflows/ci.yml`) bu seviyenin bir gereksinimi. README'ye demo video linki (Google Drive) eklendi, submission checklist'i tamamen tamamlandı.
- **Level 4 (24 Temmuz 2026'da kod tarafı + deploy tamamlandı, henüz RiseIn'e submit edilmedi):** Onaylanan Idea Submission'a (Cross-Border Freelancer Payment & Invoice Tracker) dayanan bir Invoice Tracker MVP'si. `contracts/invoice` (multi-invoice, tek deploy — adres: `CD6FLY7IQ2J2ZI5E6OJC37D44A6PHYAGX7WX3KHY5F2JHIYWNMK47NKI`, `deployer` identity'siyle deploy edildi) + `useInvoiceContract`/`useInvoiceEvents` hook'ları + `InvoiceForm`/`InvoiceCard`/`InvoiceList` component'leri + Vercel Analytics (`@vercel/analytics`, `wallet_connected`/`invoice_created`/`invoice_paid` custom event'leri) + Google Form feedback linki (config.js'teki `FEEDBACK_FORM_URL`) eklendi. Uygulama artık **Vercel'de canlı**: https://stellar-payment-dapp-beta.vercel.app (proje: `gulcanncee-gmailcoms-projects` scope'unda `stellar-payment-dapp`, `npx vercel deploy --prod --scope gulcanncee-gmailcoms-projects` ile yeniden deploy edilebilir) — GitHub Pages de hâlâ ayrı olarak canlı (Level 1-3 kanıtı). **Hâlâ insan tarafından yapılması gerekenler:** 10+ gerçek kullanıcı fatura oluşturup/ödeyerek onboard edilmeli (Vercel Analytics dashboard'unda ve stellar.expert'te kanıt oluşacak), ekran görüntüleri alınmalı, demo video çekilmeli. Detaylı plan: `~/.claude/plans/resilient-discovering-toast.md` (bu oturumda onaylanan plan dosyası).

**Demo video için not (24 Temmuz 2026):** O tarihte canlı sitedeki auction'ın (v2, `CCWBM53K...`) süresi dolmuştu; video kaydı için `contracts/auction`'ın **yeni bir instance'ı** (`auction_v3`, adres: `CCIO4FACYBGQJJIPBRPQFJ3UGWSOELLM52YG7BICEBTUHSXN75G7WS25`) aynı registry'yi kullanarak 24 saatlik bir `end_time` ile deploy edildi ve `src/lib/config.js`'deki `CONTRACT_ID` buna güncellendi (gh-pages'e de deploy edildi). Eğer bu auction da süresi dolup "sonuçlanmayı bekliyor" durumuna geçerse, aynı yöntemle (`stellar contract deploy` + `initialize` + config.js güncelle + `npm run build` + `npx gh-pages -d dist`) yeni bir instance açılabilir — README'deki "Example Transactions" tx hash'leri ise daha önceki v2 instance'a ait, hâlâ geçerli kanıt olarak duruyor.

Güncel level durumu ve gereksinimleri için kullanıcının Claude hafızasındaki `stellar-challenge` kaydına bakılabilir; bu dosya kod/mimari odaklıdır, level ilerleme takibi için değildir.

## Komutlar

```bash
npm run dev          # vite dev server -> http://localhost:5173/stellar-payment-dapp/
npm run build         # production build (dist/)
npm run preview       # build'i lokal önizle
npm run lint           # oxlint
npm run test           # vitest run (tek seferlik)
npm run test:watch     # vitest watch modu
npx vitest run src/lib/__tests__/errors.test.js   # tek bir test dosyası
```

Smart contract (Rust / Soroban, `contracts/auction`, `contracts/registry`, `contracts/invoice`):
```bash
cd contracts/auction && cargo test           # bu paketin unit testleri
cd contracts/registry && cargo test
cd contracts/invoice && cargo test           # invoice contract'ı diğerlerinden bağımsız, registry'ye bağımlı değil
cd contracts/auction && make build           # registry'yi önce, sonra auction'ı derler (bkz. Makefile)
cd contracts/invoice && make build           # bağımsız, sıra önemli değil
```
`make build` sırası önemli (sadece auction için): `auction`, derlenmiş `registry.wasm`'ı `contractimport!` ile client-only içe aktarıyor (bkz. `contracts/auction/src/lib.rs`), yani registry önce build edilmeli. `invoice` hiçbir contract'a bağımlı değil, registry'ye cross-contract çağrı yapmıyor (Level 4 kasıtlı olarak bu scope'un dışında tutuldu — bkz. Mimari).

Not: `cargo`/`stellar` CLI bu makinede `~/.rustup/toolchains/stable-aarch64-apple-darwin/bin` altında, PATH'e her zaman ekli olmayabilir — gerekirse `export PATH="$HOME/.rustup/toolchains/stable-aarch64-apple-darwin/bin:$PATH"` çalıştır.

CI (`ci.yml`), her push/PR'da `npm ci && npm run lint && npm run test && npm run build` çalıştırıyor — Rust/contract testleri CI'ya dahil değil, elle çalıştırılmalı.

## Mimari

**Frontend ↔ contract akışı** üç katmanda:
- `src/lib/config.js` — network sabitleri (testnet RPC/Horizon) ve deploy edilmiş contract ID'leri (`CONTRACT_ID`, `REGISTRY_ID`, `TOKEN_ID`, `INVOICE_CONTRACT_ID`, `FEEDBACK_FORM_URL`). Build-time'da `VITE_*` env değişkenleriyle ezilebilir (Vercel deploy'u için); yoksa bilinen testnet adresleri kullanılır. `INVOICE_CONTRACT_ID`/`FEEDBACK_FORM_URL` artık gerçek değerlerle dolu (24 Temmuz 2026'da deploy edildi/oluşturuldu).
- `src/lib/contractClient.js` — Soroban RPC ile ham işlem katmanı. İki tip çağrı: `readContract` (imzasız simülasyon, cüzdan bağlı olmadan da çalışır — örn. `get_state`) ve `invokeWithAuth` (imza gerektiren çağrılar — `bid`, `finalize` — `onStatus` callback'iyle `building → awaiting-signature → pending → success|fail` state machine'ini UI'a bildirir).
- `src/lib/invoiceContractClient.js` (Level 4) — `contractClient.js`'in bilinçli olarak birebir kopyası, tek fark `CONTRACT_ID` yerine `INVOICE_CONTRACT_ID` kullanması. Parametrize etmek yerine ayrı dosya tutuldu ki çalışan Level 2/3 kodu hiç değişmesin. `rpcServer`'ı tekrar oluşturmuyor, `contractClient.js`'ten import ediyor (`useInvoiceEvents.js` de aynısını yapıyor).
- `src/hooks/useAuctionContract.js`, `useAuctionEvents.js`, `useWallet.js`, `useBalance.js`, `usePayment.js` — bu iki katmanı React state'ine bağlayan hook'lar. `useAuctionEvents` Soroban RPC `getEvents`'i cursor-based polling ile kullanıyor (websocket değil — bu bilinçli bir tercih, README'de gerekçesi var).
- `src/hooks/useInvoiceContract.js`, `useInvoiceEvents.js` (Level 4) — `useAuctionContract.js`/`useAuctionEvents.js` ile birebir aynı desen (aynı `txStatus` state machine, aynı cursor polling). `useInvoiceEvents`, `INVOICE_CONTRACT_ID` boşsa poll'u hiç başlatmıyor (deploy edilmeden önce hataya düşmesin diye). `useInvoiceContract`'ta `createInvoice`/`payInvoice` başarı anında `@vercel/analytics`'in `track()` fonksiyonu çağrılıyor (Level 4'ün "10+ kullanıcı etkileşimi kanıtı" gereksinimi için).

**Cüzdan entegrasyonu:** `@creit.tech/stellar-wallets-kit` üzerinden tek bir connect flow'la Freighter/xBull/Albedo/Rabet/Lobstr/Hana destekleniyor (Level 1'deki tek-cüzdan `@stellar/freighter-api` yaklaşımından Level 2'de buna geçildi).

**Hata sınıflandırması** (`src/lib/errors.js`): `wallet-not-found`, `rejected`, `insufficient-balance` — insufficient-balance dahil hepsi **client-side, submit öncesi** kontrol ediliyor (bakiye − fee/reserve buffer < amount).

**Contract mimarisi:**
- `contracts/auction` — escrow + otomatik iade mantığı: yeni en yüksek teklif geldiğinde XLM contract'a çekiliyor, bir önceki en yüksek teklif sahibine aynı transaction içinde otomatik iade ediliyor. `finalize()` artık `contracts/registry`'yi çağırıp platform geneli istatistik tutuyor (Level 3 inter-contract iletişimi).
- `contracts/registry` — auction'lardan bağımsız, platform geneli `AuctionRecorded` event'i ve toplam istatistik (`TotalFinalized`, `TotalVolume`) tutan ayrı bir contract.
- `contracts/invoice` (Level 4) — auction'ın aksine **tek bir deploy edilmiş instance, birden fazla faturayı** `DataKey::Invoice(u32)` ile anahtarlanmış olarak tutuyor (bkz. `NextId` counter — registry'nin `TotalFinalized` counter'ıyla aynı desen). Escrow yok — `pay_invoice` doğrudan payer'dan payee'ye transfer yapıyor (bu bir fatura takibi, teklif değil, o yüzden bilinçli olarak daha basit). `Overdue` durumu hiç saklanmıyor, `get_invoice`/`get_invoices_for` her okumada `due_date`'e göre anlık hesaplıyor (`with_derived_status`) — bir cron/keeper'a ihtiyaç yok. Registry'ye cross-contract çağrı yapmıyor (Level 3'ün gereksinimiydi, Level 4'ün değil — scope'u bilinçli olarak dar tutmak için atlandı).
- Deploy edilmiş adresler `src/lib/config.js`'de sabit; yeniden deploy edilirse buradan güncellenmeli (registry önce, auction sonra — auction registry adresini `initialize`'da alıyor). `invoice` hiçbirine bağımlı değil, bağımsız deploy edilebilir.

**Build/deploy notu:** `vite.config.js`'de `base: './'` bilinçli olarak göreli tutuluyor — hem GitHub Pages'in alt path'inde (`/stellar-payment-dapp/`) hem Vercel'in kök domain'inde çalışsın diye. `vitest.config.js` ayrı bir dosya, bu `base` ayarına dokunmadan test ortamını (jsdom) tanımlıyor. Level 4 ile birlikte Vercel gerçek deploy hedefi olacak (şu ana kadar sadece GitHub Pages kullanılıyordu, Vercel hiç kurulmamıştı) — analytics/monitoring gereksinimi için `@vercel/analytics` seçildi, bu paket sadece gerçek bir Vercel deploy'unda veri toplar.

**Analytics/feedback (Level 4):** `src/App.jsx`'e eklenen `<Analytics />` (`@vercel/analytics/react`) ve `useWallet.js`/`useInvoiceContract.js` içindeki `track()` çağrıları artık gerçek Vercel deploy'unda veri topluyor (dashboard: vercel.com/gulcanncee-gmailcoms-projects/stellar-payment-dapp/analytics). `FeedbackLink.jsx` component'i artık `FEEDBACK_FORM_URL` dolu olduğu için render oluyor (`config.js`'e bak).

## Güncel tutma

Bu dosya seviyeler ilerledikçe (Level 3 submit edilince, Level 4 başlayınca vb.) güncellenmeli — özellikle "Proje bağlamı" ve "Mimari" bölümleri. Claude'a repo üzerinde büyük bir mimari değişiklik yaptırdıktan sonra (yeni contract, yeni hook katmanı, yeni deploy hedefi vb.) bu dosyayı elden geçirmesini iste.
