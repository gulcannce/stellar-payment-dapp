import { useState, useCallback } from "react";
import {
  isConnected,
  requestAccess,
  getAddress,
  signTransaction,
} from "@stellar/freighter-api";
import * as StellarSdk from "@stellar/stellar-sdk";
import "./App.css";

const HORIZON_URL = "https://horizon-testnet.stellar.org";
const server = new StellarSdk.Horizon.Server(HORIZON_URL);

function App() {
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState(null);
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(null); // { type: "success" | "error" | "info", message, hash? }
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async (pk) => {
    try {
      const res = await server
        .payments()
        .forAccount(pk)
        .order("desc")
        .limit(5)
        .call();
      setHistory(
        res.records.filter((r) => r.type === "payment" || r.type === "create_account")
      );
    } catch {
      setHistory([]);
    }
  }, []);

  const fetchBalance = useCallback(async (pk) => {
    try {
      const account = await server.loadAccount(pk);
      const native = account.balances.find((b) => b.asset_type === "native");
      setBalance(native ? native.balance : "0");
    } catch {
      setBalance("0");
      setStatus({
        type: "error",
        message:
          "Hesap bulunamadı. Freighter'da Friendbot ile hesabını fonladığından emin ol.",
      });
    }
  }, []);

  const connectWallet = async () => {
    setStatus(null);
    try {
      const connected = await isConnected();
      if (!connected.isConnected) {
        setStatus({
          type: "error",
          message:
            "Freighter bulunamadı. Lütfen Freighter eklentisini kur: freighter.app",
        });
        return;
      }
      const access = await requestAccess();
      if (access.error) {
        setStatus({ type: "error", message: "Bağlantı reddedildi." });
        return;
      }
      const addr = await getAddress();
      setPublicKey(addr.address);
      await fetchBalance(addr.address);
      await fetchHistory(addr.address);
    } catch (e) {
      setStatus({ type: "error", message: "Bağlantı hatası: " + e.message });
    }
  };

  const disconnectWallet = () => {
    setPublicKey("");
    setBalance(null);
    setStatus(null);
    setHistory([]);
  };

  const sendPayment = async (e) => {
    e.preventDefault();
    setStatus({ type: "info", message: "İşlem hazırlanıyor..." });
    setLoading(true);
    try {
      const sourceAccount = await server.loadAccount(publicKey);
      const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destination.trim(),
            asset: StellarSdk.Asset.native(),
            amount: amount,
          })
        )
        .setTimeout(60)
        .build();

      setStatus({ type: "info", message: "Freighter'da işlemi onayla..." });
      const signed = await signTransaction(tx.toXDR(), {
        networkPassphrase: StellarSdk.Networks.TESTNET,
      });
      if (signed.error) {
        throw new Error("İmzalama reddedildi.");
      }

      setStatus({ type: "info", message: "İşlem gönderiliyor..." });
      const result = await server.submitTransaction(
        StellarSdk.TransactionBuilder.fromXDR(
          signed.signedTxXdr,
          StellarSdk.Networks.TESTNET
        )
      );

      setStatus({
        type: "success",
        message: "İşlem başarılı! 🎉",
        hash: result.hash,
      });
      setDestination("");
      setAmount("");
      await fetchBalance(publicKey);
      await fetchHistory(publicKey);
    } catch (err) {
      setStatus({
        type: "error",
        message:
          "İşlem başarısız: " +
          (err?.response?.data?.extras?.result_codes
            ? JSON.stringify(err.response.data.extras.result_codes)
            : err.message),
      });
    } finally {
      setLoading(false);
    }
  };

  const short = (pk) => pk.slice(0, 6) + "..." + pk.slice(-6);

  return (
    <div className="container">
      <header>
        <h1>🌟 Stellar Payment dApp</h1>
        <p className="subtitle">Stellar Testnet üzerinde XLM gönder</p>
      </header>

      {!publicKey ? (
        <button className="btn primary big" onClick={connectWallet}>
          🔗 Freighter Cüzdanını Bağla
        </button>
      ) : (
        <>
          <div className="card">
            <div className="row">
              <div>
                <span className="label">Bağlı Cüzdan</span>
                <p className="mono" title={publicKey}>{short(publicKey)}</p>
              </div>
              <button className="btn secondary" onClick={disconnectWallet}>
                Bağlantıyı Kes
              </button>
            </div>
            <div className="balance">
              <span className="label">XLM Bakiyesi</span>
              <p className="balance-value">
                {balance === null ? "Yükleniyor..." : `${Number(balance).toFixed(2)} XLM`}
              </p>
              <button
                className="btn secondary small"
                onClick={() => fetchBalance(publicKey)}
              >
                ↻ Yenile
              </button>
            </div>
          </div>

          <form className="card" onSubmit={sendPayment}>
            <h2>💸 XLM Gönder</h2>
            <label>
              Alıcı Adresi
              <input
                type="text"
                placeholder="G..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </label>
            <label>
              Miktar (XLM)
              <input
                type="number"
                step="0.0000001"
                min="0.0000001"
                placeholder="10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </label>
            <button className="btn primary" type="submit" disabled={loading}>
              {loading ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>

          {history.length > 0 && (
            <div className="card">
              <h2>🕘 Son İşlemler</h2>
              <ul className="history">
                {history.map((h) => {
                  const isOut = h.from === publicKey || h.funder === publicKey;
                  const other = isOut
                    ? h.to || h.account
                    : h.from || h.funder;
                  const amt = h.amount || h.starting_balance;
                  return (
                    <li key={h.id}>
                      <span className={isOut ? "out" : "in"}>
                        {isOut ? "➤ Gönderildi" : "✔ Alındı"}
                      </span>
                      <span className="amt">
                        {isOut ? "-" : "+"}
                        {Number(amt).toFixed(2)} XLM
                      </span>
                      <span className="mono other" title={other}>
                        {other ? short(other) : ""}
                      </span>
                      <a
                        href={`https://stellar.expert/explorer/testnet/tx/${h.transaction_hash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        ↗
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}

      {status && (
        <div className={`status ${status.type}`}>
          <p>{status.message}</p>
          {status.hash && (
            <p className="mono small-text">
              Hash: {status.hash}
              <br />
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${status.hash}`}
                target="_blank"
                rel="noreferrer"
              >
                Stellar Expert'te görüntüle ↗
              </a>
            </p>
          )}
        </div>
      )}

      <footer>Stellar Testnet · Freighter Wallet</footer>
    </div>
  );
}

export default App;
