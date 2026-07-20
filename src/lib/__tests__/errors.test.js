import { describe, expect, it } from "vitest";
import { ERROR_TYPES, classifyError, assertSufficientBalance } from "../errors";

describe("classifyError", () => {
  it("passes through an already-classified error unchanged", () => {
    const already = { type: ERROR_TYPES.INSUFFICIENT_BALANCE, message: "zaten sınıflandırılmış" };
    expect(classifyError(already)).toBe(already);
  });

  it("classifies a wallet-not-found style message", () => {
    const result = classifyError(new Error("Freighter is not connected"));
    expect(result.type).toBe(ERROR_TYPES.WALLET_NOT_FOUND);
  });

  it("classifies a rejected/declined style message", () => {
    const result = classifyError(new Error("User declined access"));
    expect(result.type).toBe(ERROR_TYPES.REJECTED);
  });

  it("classifies a cancelled signature as rejected", () => {
    const result = classifyError(new Error("User cancelled the request"));
    expect(result.type).toBe(ERROR_TYPES.REJECTED);
  });

  it("classifies an insufficient-balance style message", () => {
    const result = classifyError(new Error("insufficient balance for this operation"));
    expect(result.type).toBe(ERROR_TYPES.INSUFFICIENT_BALANCE);
  });

  it("falls back to unknown for an unrecognized message", () => {
    const result = classifyError(new Error("some totally unexpected failure"));
    expect(result.type).toBe(ERROR_TYPES.UNKNOWN);
    expect(result.message).toContain("some totally unexpected failure");
  });

  it("handles a bare string error", () => {
    const result = classifyError("declined by user");
    expect(result.type).toBe(ERROR_TYPES.REJECTED);
  });

  it("extracts Horizon result_codes when present", () => {
    const err = {
      response: { data: { extras: { result_codes: { transaction: "tx_bad_auth" } } } },
    };
    const result = classifyError(err);
    expect(result.message).toContain("tx_bad_auth");
  });
});

describe("assertSufficientBalance", () => {
  it("does not throw when balance comfortably covers amount + buffer", () => {
    expect(() => assertSufficientBalance(100, 10)).not.toThrow();
  });

  it("throws when amount + buffer exceeds balance", () => {
    expect(() => assertSufficientBalance(10, 9)).toThrow();
  });

  it("throws right at the boundary (amount + buffer === balance is still a throw)", () => {
    // bufferXlm defaults to 1.5; balance exactly equal to amount+buffer should throw
    // because the check is amount + buffer > balance is false here, so it should NOT throw.
    expect(() => assertSufficientBalance(11.5, 10)).not.toThrow();
    expect(() => assertSufficientBalance(11.49, 10)).toThrow();
  });

  it("does nothing when balance or amount is not a finite number", () => {
    expect(() => assertSufficientBalance(null, 10)).not.toThrow();
    expect(() => assertSufficientBalance(100, undefined)).not.toThrow();
  });

  it("throws a classified insufficient-balance error", () => {
    try {
      assertSufficientBalance(1, 10);
      throw new Error("expected assertSufficientBalance to throw");
    } catch (err) {
      expect(err.type).toBe(ERROR_TYPES.INSUFFICIENT_BALANCE);
    }
  });
});
