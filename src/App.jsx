import { useCallback } from "react";
import "./App.css";

import { useWallet } from "./hooks/useWallet";
import { useBalance } from "./hooks/useBalance";
import { usePayment } from "./hooks/usePayment";
import { useAuctionContract } from "./hooks/useAuctionContract";
import { useAuctionEvents } from "./hooks/useAuctionEvents";

import { WalletConnectButton } from "./components/WalletConnectButton";
import { BalanceCard } from "./components/BalanceCard";
import { PaymentForm } from "./components/PaymentForm";
import { TransactionHistory } from "./components/TransactionHistory";
import { AuctionCard } from "./components/AuctionCard";
import { EventFeed } from "./components/EventFeed";
import { StatusBanner } from "./components/StatusBanner";

function App() {
  const wallet = useWallet();
  const balanceHook = useBalance();
  const auction = useAuctionContract({
    address: wallet.address,
    signTransaction: wallet.signTransaction,
  });
  const events = useAuctionEvents();

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

  return (
    <div className="container">
      <header>
        <h1>🌟 Stellar Live Auction dApp</h1>
        <p className="subtitle">Stellar Testnet üzerinde çoklu cüzdanla açık artırma</p>
      </header>

      <div className="card">
        <WalletConnectButton
          address={wallet.address}
          connecting={wallet.connecting}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
        {wallet.address && <BalanceCard balance={balanceHook.balance} onRefresh={() => balanceHook.refresh(wallet.address)} />}
      </div>

      <AuctionCard
        state={auction.state}
        loading={auction.loading}
        address={wallet.address}
        balance={balanceHook.balance}
        submitting={auction.txStatus.phase === "pending"}
        onBid={auction.bid}
        onFinalize={auction.finalize}
      />
      <StatusBanner status={auction.txStatus} />

      <EventFeed events={events} />

      {wallet.address && (
        <>
          <PaymentForm onSend={(dest, amt) => payment.send(dest, amt, balanceHook.balance)} loading={payment.status.phase === "pending"} />
          <StatusBanner status={payment.status} />
          <TransactionHistory history={balanceHook.history} publicKey={wallet.address} />
        </>
      )}

      <footer>
        Stellar Testnet · Freighter · xBull · Albedo · Rabet · Lobstr · Hana (StellarWalletsKit)
      </footer>
    </div>
  );
}

export default App;
