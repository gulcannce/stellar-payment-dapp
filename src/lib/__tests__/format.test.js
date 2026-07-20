import { describe, expect, it } from "vitest";
import { shortAddress, formatXlm, formatDateTime, isPast } from "../format";

describe("shortAddress", () => {
  it("truncates a normal address to first 6 and last 6 characters", () => {
    expect(shortAddress("GAJVW2R2Y2KSPPBKS5DOUADFGK7AOZKZTBVUYYX2KIVPDYKJS3ODFH67")).toBe(
      "GAJVW2...ODFH67"
    );
  });

  it("returns an empty string for falsy input", () => {
    expect(shortAddress("")).toBe("");
    expect(shortAddress(null)).toBe("");
    expect(shortAddress(undefined)).toBe("");
  });
});

describe("formatXlm", () => {
  it("formats a number with two decimal places and the XLM suffix", () => {
    expect(formatXlm(1)).toBe("1.00 XLM");
    expect(formatXlm(3.456)).toBe("3.46 XLM");
    expect(formatXlm(0)).toBe("0.00 XLM");
  });

  it("coerces numeric strings", () => {
    expect(formatXlm("10")).toBe("10.00 XLM");
  });
});

describe("isPast", () => {
  it("returns true for a timestamp in the past", () => {
    expect(isPast(Math.floor(Date.now() / 1000) - 10)).toBe(true);
  });

  it("returns false for a timestamp in the future", () => {
    expect(isPast(Math.floor(Date.now() / 1000) + 10_000)).toBe(false);
  });
});

describe("formatDateTime", () => {
  it("produces a non-empty, locale-formatted string", () => {
    const formatted = formatDateTime(1784374024);
    expect(typeof formatted).toBe("string");
    expect(formatted.length).toBeGreaterThan(0);
  });
});
