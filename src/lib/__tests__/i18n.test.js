import { afterEach, describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { t, translate, getLanguage, setLanguage, useLanguage } from "../i18n";

describe("i18n", () => {
  afterEach(() => {
    setLanguage("tr");
  });

  it("defaults to Turkish", () => {
    expect(getLanguage()).toBe("tr");
  });

  it("translates a known key in both languages", () => {
    expect(translate("tr", "wallet.connect")).toBe("🔗 Cüzdan Bağla");
    expect(translate("en", "wallet.connect")).toBe("🔗 Connect Wallet");
  });

  it("interpolates {param} placeholders", () => {
    expect(translate("en", "eventFeed.showMore", { n: 3 })).toBe("+ 3 more events");
  });

  it("falls back to the key itself when it exists in neither language", () => {
    expect(translate("en", "totally.made.up.key")).toBe("totally.made.up.key");
  });

  it("t() reads the currently active language", () => {
    expect(t("wallet.connect")).toBe("🔗 Cüzdan Bağla");
    setLanguage("en");
    expect(t("wallet.connect")).toBe("🔗 Connect Wallet");
  });

  it("useLanguage() re-renders subscribers when the language changes", () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.lang).toBe("tr");

    act(() => {
      result.current.setLang("en");
    });

    expect(result.current.lang).toBe("en");
    expect(result.current.t("wallet.connect")).toBe("🔗 Connect Wallet");
  });

  it("persists the chosen language across getLanguage() calls", () => {
    setLanguage("en");
    expect(getLanguage()).toBe("en");
  });

  it("ignores an invalid language value", () => {
    setLanguage("en");
    setLanguage("fr");
    expect(getLanguage()).toBe("en");
  });
});
