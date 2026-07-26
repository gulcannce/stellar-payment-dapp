import { shortAddress } from "../lib/format";
import { useLanguage } from "../lib/i18n";

export function WalletConnectButton({ address, connecting, onConnect, onDisconnect }) {
  const { t } = useLanguage();

  if (!address) {
    return (
      <button className="btn primary big" onClick={onConnect} disabled={connecting}>
        {connecting ? t("wallet.connecting") : t("wallet.connect")}
      </button>
    );
  }

  return (
    <div className="row">
      <div>
        <span className="label">{t("wallet.connectedLabel")}</span>
        <p className="mono" title={address}>
          {shortAddress(address)}
        </p>
      </div>
      <button className="btn secondary" onClick={onDisconnect}>
        {t("wallet.disconnect")}
      </button>
    </div>
  );
}
