import "@testing-library/jest-dom/vitest";

// Bu vitest/jsdom sürümünde window.localStorage getter'ı jsdom environment
// setup'ının global'e kopyalama adımında sessizce kayboluyor (doğrudan
// `new JSDOM()` ile çalışıyor ama vitest'in populateGlobal'i üzerinden değil).
// AuctionForm/BidForm'un isim hatırlama özelliği localStorage'a bağlı olduğu
// için basit bir in-memory polyfill ile garantiye alıyoruz.
if (typeof window !== "undefined" && !window.localStorage) {
  const store = new Map();
  const memoryStorage = {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
    key: (index) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size;
    },
  };
  Object.defineProperty(window, "localStorage", {
    value: memoryStorage,
    writable: true,
    configurable: true,
  });
}
