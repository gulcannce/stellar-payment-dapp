import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { InvoiceCard } from "../InvoiceCard";

const baseInvoice = {
  id: 1,
  payee: "GPAYEE",
  payer: "GPAYER",
  amount: 100,
  dueDate: Math.floor(Date.now() / 1000) + 86400,
  memo: "Test",
};

function renderCard(overrides, address) {
  return render(
    <InvoiceCard
      invoice={{ ...baseInvoice, ...overrides }}
      address={address}
      submitting={false}
      onSend={vi.fn()}
      onPay={vi.fn()}
      onCancel={vi.fn()}
    />
  );
}

describe("InvoiceCard", () => {
  it("shows Gönder and İptal Et buttons for the payee on a Draft invoice", () => {
    renderCard({ status: "Draft" }, "GPAYEE");
    expect(screen.getByRole("button", { name: /gönder/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ptal et/i })).toBeInTheDocument();
  });

  it("shows a waiting hint with no actions for the payer on a Draft invoice", () => {
    renderCard({ status: "Draft" }, "GPAYER");
    expect(screen.getByText(/henüz gönderilmedi/i)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows an Öde button for the payer on a Sent invoice", () => {
    renderCard({ status: "Sent" }, "GPAYER");
    expect(screen.getByRole("button", { name: /öde/i })).toBeInTheDocument();
  });

  it("shows a waiting hint and cancel button for the payee on a Sent invoice", () => {
    renderCard({ status: "Sent" }, "GPAYEE");
    expect(screen.getByText(/ödemesi bekleniyor/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ptal et/i })).toBeInTheDocument();
  });

  it("still allows payment and shows the overdue badge on an Overdue invoice", () => {
    renderCard({ status: "Overdue" }, "GPAYER");
    expect(screen.getByText(/süresi geçti/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /öde/i })).toBeInTheDocument();
  });

  it("shows a terminal message with no actions when Paid", () => {
    renderCard({ status: "Paid" }, "GPAYEE");
    expect(screen.getByText(/bu fatura ödendi/i)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows a terminal message with no actions when Cancelled", () => {
    renderCard({ status: "Cancelled" }, "GPAYEE");
    expect(screen.getByText(/bu fatura iptal edildi/i)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
