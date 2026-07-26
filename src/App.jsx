import { useCallback, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

import { useWallet } from "./hooks/useWallet";
import { useBalance } from "./hooks/useBalance";
import { useFriendbot } from "./hooks/useFriendbot";
import { usePayment } from "./hooks/usePayment";
import { useAuctionContract } from "./hooks/useAuctionContract";
import { useAuctionEvents } from "./hooks/useAuctionEvents";
import { useInvoiceContract } from "./hooks/useInvoiceContract";
import { useInvoiceEvents } from "./hooks/useInvoiceEvents";
import { useLanguage } from "./lib/i18n";

import { WalletConnectButton } from "./components/WalletConnectButton";
import { BalanceCard } from "./components/BalanceCard";
import { PaymentForm } from "./components/PaymentForm";
import { TransactionHistory } from "./components/TransactionHistory";
import { AuctionForm } from "./components/AuctionForm";
import { AuctionList } from "./components/AuctionList";
import { EventFeed } from "./components/EventFeed";
import { StatusBanner } from "./components/StatusBanner";
import { InvoiceForm } from "./components/InvoiceForm";
import { InvoiceList } from "./components/InvoiceList";
import { FeedbackLink } from "./components/FeedbackLink";

function App() {
  const { lang, setLang, t } = useLanguage();
  const TABS = [
    { key: "auction", label: t("tabs.auction") },
    { key: "invoice", label: t("tabs.invoice") },
    { key: "payment", label: t("tabs.payment") },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const wallet = useWallet();
  const balanceHook = useBalance();
  const friendbot = useFriendbot();
  const auction = useAuctionContract({
    address: wallet.address,
    signTransaction: wallet.signTransaction,
  });
  const events = useAuctionEvents();
  const invoices = useInvoiceContract({
    address: wallet.address,
    signTransaction: wallet.signTransaction,
  });
  const invoiceEvents = useInvoiceEvents();

  const refreshAccountData = useCallback(async () => {
    if (wallet.address) await balanceHook.refresh(wallet.address);
  }, [wallet.address, balanceHook]);

  const payment = usePayment({
    address: wallet.address,
    signTransaction: wallet.signTransaction,
    onSettled: refreshAccountData,
  });

  const handleConnect = async () => {
    try {
      const addr = await wallet.connect();
      await balanceHook.refresh(addr);
    } catch {
      // Hata WalletConnectButton'ın altındaki StatusBanner'da gösterilmez çünkü
      // bağlantı hatası henüz bir "status" state'ine yazılmadı; burada sessiz
      // geçiyoruz, kullanıcı tekrar deneyebilir. (bkz. useWallet.connect)
    }
  };

  const handleDisconnect = async () => {
    await wallet.disconnect();
    balanceHook.reset();
  };

  const handleFund = async () => {
    await friendbot.fund(wallet.address);
    await balanceHook.refresh(wallet.address);
  };

  return (
    <div className="container">
      <header>
        <div className="lang-switch">
          <button
            type="button"
            className={`lang-btn ${lang === "tr" ? "active" : ""}`}
            onClick={() => setLang("tr")}
          >
            TR
          </button>
          <button
            type="button"
            className={`lang-btn ${lang === "en" ? "active" : ""}`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>
        <h1>✨ GlowPay</h1>
        <p className="subtitle">{t("app.subtitle")}</p>
      </header>

      <div className="card">
        <WalletConnectButton
          address={wallet.address}
          connecting={wallet.connecting}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
        {wallet.address && (
          <BalanceCard
            balance={balanceHook.balance}
            onRefresh={() => balanceHook.refresh(wallet.address)}
            onFund={handleFund}
            funding={friendbot.status.phase === "pending"}
          />
        )}
      </div>
      <StatusBanner status={friendbot.status} />

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`tab-button ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "auction" && (
        <>
          {wallet.address && (
            <div className="card">
              <h2>{t("auction.createTitle")}</h2>
              <AuctionForm
                disabled={!wallet.address}
                submitting={auction.txStatus.phase === "pending"}
                onCreate={(sellerName, itemName, description, minBid, durationSecs) =>
                  auction.createAuction(sellerName, itemName, description, minBid, durationSecs)
                }
              />
            </div>
          )}
          <StatusBanner status={auction.txStatus} />

          <AuctionList
            auctions={auction.auctions}
            loading={auction.loading}
            address={wallet.address}
            balance={balanceHook.balance}
            submitting={auction.txStatus.phase === "pending"}
            onBid={auction.bid}
            onFinalize={auction.finalize}
          />
        </>
      )}

      {activeTab === "invoice" && (
        <>
          {wallet.address ? (
            <>
              <div className="card">
                <h2>{t("invoice.createTitle")}</h2>
                <InvoiceForm
                  disabled={!wallet.address}
                  submitting={invoices.txStatus.phase === "pending"}
                  onCreate={(payer, amount, dueDate, memo) => invoices.createInvoice(payer, amount, dueDate, memo)}
                />
              </div>
              <StatusBanner status={invoices.txStatus} />

              <InvoiceList
                invoices={invoices.invoices}
                loading={invoices.loading}
                address={wallet.address}
                submitting={invoices.txStatus.phase === "pending"}
                onSend={invoices.sendInvoice}
                onPay={(id) =>
                  invoices.payInvoice(id, invoices.invoices.find((inv) => inv.id === id)?.amount, balanceHook.balance)
                }
                onCancel={invoices.cancelInvoice}
              />
            </>
          ) : (
            <div className="card">
              <p className="small-text hint">{t("invoice.connectHint")}</p>
            </div>
          )}
        </>
      )}

      {activeTab === "payment" && (
        <>
          {wallet.address ? (
            <>
              <PaymentForm
                onSend={(dest, amt) => payment.send(dest, amt, balanceHook.balance)}
                loading={payment.status.phase === "pending"}
              />
              <StatusBanner status={payment.status} />
              <TransactionHistory history={balanceHook.history} publicKey={wallet.address} />
            </>
          ) : (
            <div className="card">
              <p className="small-text hint">{t("payment.connectHint")}</p>
            </div>
          )}
        </>
      )}

      <EventFeed events={events} invoiceEvents={invoiceEvents} />

      <FeedbackLink />

      <footer>
        Stellar Testnet · Freighter · xBull · Albedo · Rabet · Lobstr · Hana (StellarWalletsKit)
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
