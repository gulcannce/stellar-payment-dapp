import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BidForm } from "../BidForm";

describe("BidForm", () => {
  it("renders the minimum next bid in the label and placeholder", () => {
    render(<BidForm minNextBid={3.5} disabled={false} submitting={false} onBid={vi.fn()} />);
    expect(screen.getByText(/en az 3\.50 XLM/i)).toBeInTheDocument();
  });

  it("calls onBid with the entered amount on valid submit", async () => {
    const user = userEvent.setup();
    const onBid = vi.fn().mockResolvedValue("some-hash");

    render(<BidForm minNextBid={1} disabled={false} submitting={false} onBid={onBid} />);

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "5");
    await user.click(screen.getByRole("button", { name: /teklif ver/i }));

    expect(onBid).toHaveBeenCalledWith("5");
  });

  it("clears the input after a successful submit", async () => {
    const user = userEvent.setup();
    const onBid = vi.fn().mockResolvedValue("some-hash");

    render(<BidForm minNextBid={1} disabled={false} submitting={false} onBid={onBid} />);

    const input = screen.getByRole("spinbutton");
    await user.type(input, "5");
    await user.click(screen.getByRole("button", { name: /teklif ver/i }));

    expect(input).toHaveValue(null);
  });

  it("does not clear the input if onBid rejects", async () => {
    const user = userEvent.setup();
    const onBid = vi.fn().mockRejectedValue({ type: "insufficient-balance", message: "nope" });

    render(<BidForm minNextBid={1} disabled={false} submitting={false} onBid={onBid} />);

    const input = screen.getByRole("spinbutton");
    await user.type(input, "5");
    await user.click(screen.getByRole("button", { name: /teklif ver/i }));

    expect(input).toHaveValue(5);
  });

  it("disables the input and button when disabled prop is true", () => {
    render(<BidForm minNextBid={1} disabled={true} submitting={false} onBid={vi.fn()} />);
    expect(screen.getByRole("spinbutton")).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows a submitting label and disables the button while submitting", () => {
    render(<BidForm minNextBid={1} disabled={false} submitting={true} onBid={vi.fn()} />);
    expect(screen.getByRole("button", { name: /gönderiliyor/i })).toBeDisabled();
  });
});
