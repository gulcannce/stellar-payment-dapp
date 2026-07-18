export const shortAddress = (pk) => (pk ? `${pk.slice(0, 6)}...${pk.slice(-6)}` : "");

export const formatXlm = (value) => `${Number(value).toFixed(2)} XLM`;

export const formatDateTime = (unixSeconds) =>
  new Date(unixSeconds * 1000).toLocaleString("tr-TR");

export const isPast = (unixSeconds) => Date.now() / 1000 >= unixSeconds;
