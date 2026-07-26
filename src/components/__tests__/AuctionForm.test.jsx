import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuctionForm } from "../AuctionForm";

describe("AuctionForm", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the core input labels, with description collapsed behind a toggle", () => {
    render(<AuctionForm disabled={false} submitting={false} onCreate={vi.fn()} />);
    expect(screen.getByLabelText(/^adın/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ürün adı/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/taban teklif/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^süre/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/açıklama/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /açıklama ekle/i })).toBeInTheDocument();
  });

  it("reveals the description field when its toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<AuctionForm disabled={false} submitting={false} onCreate={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /açıklama ekle/i }));

    expect(screen.getByLabelText(/açıklama/i)).toBeInTheDocument();
  });

  it("defaults the duration to 24 hours and calls onCreate with the entered values on valid submit", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockResolvedValue("some-hash");

    render(<AuctionForm disabled={false} submitting={false} onCreate={onCreate} />);

    expect(screen.getByLabelText(/^süre/i)).toHaveValue("24");

    await user.type(screen.getByLabelText(/^adın/i), "Ayşe Yılmaz");
    await user.type(screen.getByLabelText(/ürün adı/i), "Vintage Kamera");
    await user.type(screen.getByLabelText(/taban teklif/i), "100");
    await user.selectOptions(screen.getByLabelText(/^süre/i), "72");
    await user.click(screen.getByRole("button", { name: /açık artırma oluştur/i }));

    expect(onCreate).toHaveBeenCalledWith("Ayşe Yılmaz", "Vintage Kamera", "", "100", 72 * 3600);
  });

  it("remembers the entered name for the next auction via localStorage", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockResolvedValue("some-hash");

    render(<AuctionForm disabled={false} submitting={false} onCreate={onCreate} />);

    await user.type(screen.getByLabelText(/^adın/i), "Ayşe Yılmaz");
    await user.type(screen.getByLabelText(/ürün adı/i), "Vintage Kamera");
    await user.type(screen.getByLabelText(/taban teklif/i), "100");
    await user.click(screen.getByRole("button", { name: /açık artırma oluştur/i }));

    expect(window.localStorage.getItem("glowpay_display_name")).toBe("Ayşe Yılmaz");
  });

  it("clears the item fields but keeps the name after a successful submit", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockResolvedValue("some-hash");

    render(<AuctionForm disabled={false} submitting={false} onCreate={onCreate} />);

    await user.type(screen.getByLabelText(/^adın/i), "Ayşe Yılmaz");
    await user.type(screen.getByLabelText(/ürün adı/i), "Vintage Kamera");
    await user.type(screen.getByLabelText(/taban teklif/i), "100");
    await user.click(screen.getByRole("button", { name: /açık artırma oluştur/i }));

    expect(screen.getByLabelText(/ürün adı/i)).toHaveValue("");
  });

  it("keeps the entered values if onCreate rejects", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockRejectedValue({ type: "unknown", message: "nope" });

    render(<AuctionForm disabled={false} submitting={false} onCreate={onCreate} />);

    await user.type(screen.getByLabelText(/^adın/i), "Ayşe Yılmaz");
    await user.type(screen.getByLabelText(/ürün adı/i), "Vintage Kamera");
    await user.type(screen.getByLabelText(/taban teklif/i), "100");
    await user.click(screen.getByRole("button", { name: /açık artırma oluştur/i }));

    expect(screen.getByLabelText(/ürün adı/i)).toHaveValue("Vintage Kamera");
  });

  it("disables the inputs and button when disabled prop is true", () => {
    render(<AuctionForm disabled={true} submitting={false} onCreate={vi.fn()} />);
    expect(screen.getByLabelText(/^adın/i)).toBeDisabled();
    expect(screen.getByLabelText(/ürün adı/i)).toBeDisabled();
    expect(screen.getByRole("button", { name: /açıklama ekle/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /açık artırma oluştur/i })).toBeDisabled();
  });

  it("shows a submitting label and disables the button while submitting", () => {
    render(<AuctionForm disabled={false} submitting={true} onCreate={vi.fn()} />);
    expect(screen.getByRole("button", { name: /oluşturuluyor/i })).toBeDisabled();
  });
});
