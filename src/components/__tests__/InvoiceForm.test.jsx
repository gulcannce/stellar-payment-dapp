import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InvoiceForm } from "../InvoiceForm";

describe("InvoiceForm", () => {
  it("renders all input labels", () => {
    render(<InvoiceForm disabled={false} submitting={false} onCreate={vi.fn()} />);
    expect(screen.getByLabelText(/ödeyecek kişinin adresi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tutar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/son ödeme tarihi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/açıklama/i)).toBeInTheDocument();
  });

  it("calls onCreate with the entered values on valid submit", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockResolvedValue("some-hash");

    render(<InvoiceForm disabled={false} submitting={false} onCreate={onCreate} />);

    await user.type(screen.getByLabelText(/ödeyecek kişinin adresi/i), "GABC123");
    await user.type(screen.getByLabelText(/tutar/i), "100");
    await user.type(screen.getByLabelText(/son ödeme tarihi/i), "2026-08-01");
    await user.type(screen.getByLabelText(/açıklama/i), "Test faturası");
    await user.click(screen.getByRole("button", { name: /fatura oluştur/i }));

    expect(onCreate).toHaveBeenCalledWith(
      "GABC123",
      "100",
      Math.floor(new Date("2026-08-01").getTime() / 1000),
      "Test faturası"
    );
  });

  it("clears the fields after a successful submit", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockResolvedValue("some-hash");

    render(<InvoiceForm disabled={false} submitting={false} onCreate={onCreate} />);

    await user.type(screen.getByLabelText(/ödeyecek kişinin adresi/i), "GABC123");
    await user.type(screen.getByLabelText(/tutar/i), "100");
    await user.type(screen.getByLabelText(/son ödeme tarihi/i), "2026-08-01");
    await user.click(screen.getByRole("button", { name: /fatura oluştur/i }));

    expect(screen.getByLabelText(/ödeyecek kişinin adresi/i)).toHaveValue("");
  });

  it("keeps the entered values if onCreate rejects", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockRejectedValue({ type: "unknown", message: "nope" });

    render(<InvoiceForm disabled={false} submitting={false} onCreate={onCreate} />);

    await user.type(screen.getByLabelText(/ödeyecek kişinin adresi/i), "GABC123");
    await user.type(screen.getByLabelText(/tutar/i), "100");
    await user.type(screen.getByLabelText(/son ödeme tarihi/i), "2026-08-01");
    await user.click(screen.getByRole("button", { name: /fatura oluştur/i }));

    expect(screen.getByLabelText(/ödeyecek kişinin adresi/i)).toHaveValue("GABC123");
  });

  it("disables the inputs and button when disabled prop is true", () => {
    render(<InvoiceForm disabled={true} submitting={false} onCreate={vi.fn()} />);
    expect(screen.getByLabelText(/ödeyecek kişinin adresi/i)).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows a submitting label and disables the button while submitting", () => {
    render(<InvoiceForm disabled={false} submitting={true} onCreate={vi.fn()} />);
    expect(screen.getByRole("button", { name: /oluşturuluyor/i })).toBeDisabled();
  });
});
