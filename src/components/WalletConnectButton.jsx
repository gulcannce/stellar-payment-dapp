import { shortAddress } from "../lib/format";

export function WalletConnectButton({ address, connecting, onConnect, onDisconnect }) {
  if (!address) {
    return (
      <button className="btn primary big" onClick={onConnect} disabled={connecting}>
        {connecting ? "Bağlanıyor..." : "🔗 Cüzdan Bağla"}
      </button>
    );
  }

  return (
    <div className="row">
      <div>
        <span className="label">Bağlı Cüzdan</span>
        <p className="mono" title={address}>
          {shortAddress(address)}
        </p>
      </div>
      <button className="btn secondary" onClick={onDisconnect}>
        Bağlantıyı Kes
      </button>
    </div>
  );
}
