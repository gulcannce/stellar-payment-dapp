export const RPC_URL = "https://soroban-testnet.stellar.org";
export const HORIZON_URL = "https://horizon-testnet.stellar.org";
export const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

// contracts/auction — 18 Temmuz 2026'da testnet'e deploy edildi (bkz. README).
export const CONTRACT_ID =
  "CCQFEVYW2DXCV4P6YRLJIPWXHV6WWOYKKWRYEYEXLFDZH6IOPCXSMTZV";
// Native XLM'in Stellar Asset Contract (SAC) adresi — auction contract'ının
// ödeme/iade transferlerinde kullandığı token.
export const TOKEN_ID =
  "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC";

export const STROOPS_PER_XLM = 10_000_000;

export const explorerTxUrl = (hash) =>
  `https://stellar.expert/explorer/testnet/tx/${hash}`;
export const explorerContractUrl = (id) =>
  `https://stellar.expert/explorer/testnet/contract/${id}`;
