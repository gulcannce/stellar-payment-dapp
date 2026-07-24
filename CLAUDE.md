# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Standartlar
- Dil: Türkçe (kod içi yorumlar dahil — mevcut yorumlar Türkçe, bu üsluba devam et)

## Proje bağlamı

Rise In "Stellar Journey to Mastery" challenge submission'ı. Seviyeler tek bir repo/uygulama üzerinde ilerletiliyor — her level bir öncekinin üzerine inşa ediliyor, eskisi silinmiyor:
- **Level 1 (Approved):** basit ödeme dApp'ı (Freighter, XLM bakiye/gönderme, işlem geçmişi) — hâlâ uygulamada mevcut.
- **Level 2 (Approved):** aynı uygulama canlı bir **on-chain açık artırma**ya evrildi — multi-wallet, deploy edilmiş Soroban contract (`contracts/auction`), gerçek zamanlı event senkronizasyonu, açık transaction-status state machine.
- **Level 3 (24 Temmuz 2026'da submit edildi, RiseIn'de "Pending Review" — inceleme bekleniyor):** `contracts/registry` eklendi — auction'ın `finalize()`'ı registry'yi çağırıyor (inter-contract iletişim). CI/CD (`.github/workflows/ci.yml`) bu seviyenin bir gereksinimi. README'ye demo video linki (Google Drive) eklendi, submission checklist'i tamamen tamamlandı.

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

Smart contract (Rust / Soroban, `contracts/auction`, `contracts/registry`):
```bash
cd contracts/auction && cargo test           # bu paketin unit testleri
cd contracts/registry && cargo test
cd contracts/auction && make build           # registry'yi önce, sonra auction'ı derler (bkz. Makefile)
```
`make build` sırası önemli: `auction`, derlenmiş `registry.wasm`'ı `contractimport!` ile client-only içe aktarıyor (bkz. `contracts/auction/src/lib.rs`), yani registry önce build edilmeli.

CI (`ci.yml`), her push/PR'da `npm ci && npm run lint && npm run test && npm run build` çalıştırıyor — Rust/contract testleri CI'ya dahil değil, elle çalıştırılmalı.

## Mimari

**Frontend ↔ contract akışı** üç katmanda:
- `src/lib/config.js` — network sabitleri (testnet RPC/Horizon) ve deploy edilmiş contract ID'leri (`CONTRACT_ID`, `REGISTRY_ID`, `TOKEN_ID`). Build-time'da `VITE_*` env değişkenleriyle ezilebilir (Vercel deploy'u için); yoksa bilinen testnet adresleri kullanılır.
- `src/lib/contractClient.js` — Soroban RPC ile ham işlem katmanı. İki tip çağrı: `readContract` (imzasız simülasyon, cüzdan bağlı olmadan da çalışır — örn. `get_state`) ve `invokeWithAuth` (imza gerektiren çağrılar — `bid`, `finalize` — `onStatus` callback'iyle `building → awaiting-signature → pending → success|fail` state machine'ini UI'a bildirir).
- `src/hooks/useAuctionContract.js`, `useAuctionEvents.js`, `useWallet.js`, `useBalance.js`, `usePayment.js` — bu iki katmanı React state'ine bağlayan hook'lar. `useAuctionEvents` Soroban RPC `getEvents`'i cursor-based polling ile kullanıyor (websocket değil — bu bilinçli bir tercih, README'de gerekçesi var).

**Cüzdan entegrasyonu:** `@creit.tech/stellar-wallets-kit` üzerinden tek bir connect flow'la Freighter/xBull/Albedo/Rabet/Lobstr/Hana destekleniyor (Level 1'deki tek-cüzdan `@stellar/freighter-api` yaklaşımından Level 2'de buna geçildi).

**Hata sınıflandırması** (`src/lib/errors.js`): `wallet-not-found`, `rejected`, `insufficient-balance` — insufficient-balance dahil hepsi **client-side, submit öncesi** kontrol ediliyor (bakiye − fee/reserve buffer < amount).

**Contract mimarisi:**
- `contracts/auction` — escrow + otomatik iade mantığı: yeni en yüksek teklif geldiğinde XLM contract'a çekiliyor, bir önceki en yüksek teklif sahibine aynı transaction içinde otomatik iade ediliyor. `finalize()` artık `contracts/registry`'yi çağırıp platform geneli istatistik tutuyor (Level 3 inter-contract iletişimi).
- `contracts/registry` — auction'lardan bağımsız, platform geneli `AuctionRecorded` event'i ve toplam istatistik (`TotalFinalized`, `TotalVolume`) tutan ayrı bir contract.
- Deploy edilmiş adresler `src/lib/config.js`'de sabit; yeniden deploy edilirse buradan güncellenmeli (registry önce, auction sonra — auction registry adresini `initialize`'da alıyor).

**Build/deploy notu:** `vite.config.js`'de `base: './'` bilinçli olarak göreli tutuluyor — hem GitHub Pages'in alt path'inde (`/stellar-payment-dapp/`) hem Vercel'in kök domain'inde çalışsın diye. `vitest.config.js` ayrı bir dosya, bu `base` ayarına dokunmadan test ortamını (jsdom) tanımlıyor.

## Güncel tutma

Bu dosya seviyeler ilerledikçe (Level 3 submit edilince, Level 4 başlayınca vb.) güncellenmeli — özellikle "Proje bağlamı" ve "Mimari" bölümleri. Claude'a repo üzerinde büyük bir mimari değişiklik yaptırdıktan sonra (yeni contract, yeni hook katmanı, yeni deploy hedefi vb.) bu dosyayı elden geçirmesini iste.
