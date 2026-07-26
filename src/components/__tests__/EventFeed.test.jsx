import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EventFeed } from "../EventFeed";

const events = [
  { id: "a1", kind: "auction_created", ledger: 100, auctionId: 1, minBid: 1000000000 },
  { id: "a2", kind: "new_bid", ledger: 200, auctionId: 1, bidder: "GBIDDERADDRESS", amount: 2000000000 },
  { id: "a3", kind: "auction_finalized", ledger: 300, auctionId: 1, winningBid: 2000000000 },
];

describe("EventFeed", () => {
  it("shows a hint when there are no events", () => {
    render(<EventFeed events={[]} invoiceEvents={[]} />);
    expect(screen.getByText(/henüz bir olay yok/i)).toBeInTheDocument();
  });

  it("shows only the single most recent event by default", () => {
    render(<EventFeed events={events} invoiceEvents={[]} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText(/sonuçlandı/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /2 olay daha göster/i })).toBeInTheDocument();
  });

  it("reveals the rest of the events when the toggle is clicked", async () => {
    const user = userEvent.setup();
    render(<EventFeed events={events} invoiceEvents={[]} />);

    await user.click(screen.getByRole("button", { name: /olay daha göster/i }));

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("button", { name: /daralt/i })).toBeInTheDocument();
  });

  it("collapses back to one event when 'daralt' is clicked", async () => {
    const user = userEvent.setup();
    render(<EventFeed events={events} invoiceEvents={[]} />);

    await user.click(screen.getByRole("button", { name: /olay daha göster/i }));
    await user.click(screen.getByRole("button", { name: /daralt/i }));

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("does not show any toggle when there is only one event total", () => {
    render(<EventFeed events={[events[0]]} invoiceEvents={[]} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
