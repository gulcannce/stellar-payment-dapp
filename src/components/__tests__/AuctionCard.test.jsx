import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("../BidForm", () => ({
  BidForm: () => <div data-testid="bid-form" />,
}));

import { AuctionCard } from "../AuctionCard";

const baseAuction = {
  id: 1,
  seller: "GSELLER",
  itemName: "Vintage Kamera",
  description: "35mm film makinesi",
  minBid: 100,
  endTime: Math.floor(Date.now() / 1000) + 86400,
  highestBid: 0,
  highestBidder: null,
  finalized: false,
};

function renderCard(overrides, address) {
  return render(
    <AuctionCard
      auction={{ ...baseAuction, ...overrides }}
      address={address}
      balance={1000}
      submitting={false}
      onBid={vi.fn()}
      onFinalize={vi.fn()}
    />
  );
}

describe("AuctionCard", () => {
  it("shows the bid form for an active auction when a wallet is connected", () => {
    renderCard({}, "GBIDDER");
    expect(screen.getByTestId("bid-form")).toBeInTheDocument();
  });

  it("shows a connect-wallet hint when no wallet is connected", () => {
    renderCard({}, undefined);
    expect(screen.getByText(/teklif verebilmek için önce cüzdanını bağla/i)).toBeInTheDocument();
  });

  it("shows a Sonuçlandır button when the auction ended but is not finalized", () => {
    renderCard({ endTime: Math.floor(Date.now() / 1000) - 1000 }, "GADDR");
    expect(screen.getByRole("button", { name: /sonuçlandır/i })).toBeInTheDocument();
    expect(screen.queryByTestId("bid-form")).not.toBeInTheDocument();
  });

  it("shows a terminal message with no actions when finalized", () => {
    renderCard({ endTime: Math.floor(Date.now() / 1000) - 1000, finalized: true }, "GADDR");
    expect(screen.getByText(/kazanan bedeli satıcıya aktarıldı/i)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("bid-form")).not.toBeInTheDocument();
  });

  it("marks the seller's own listing", () => {
    renderCard({}, "GSELLER");
    expect(screen.getByText(/\(sen\)/)).toBeInTheDocument();
  });

  it("shows the seller's real name instead of their wallet address when known", () => {
    renderCard({ sellerName: "Ayşe Yılmaz" }, "GBIDDER");
    expect(screen.getByText(/Ayşe Yılmaz/)).toBeInTheDocument();
  });

  it("falls back to a shortened wallet address when no seller name is known", () => {
    renderCard({ sellerName: "" }, "GBIDDER");
    expect(screen.getByText(/GSELLE\.\.\.SELLER/)).toBeInTheDocument();
  });

  it("shows the highest bidder's real name instead of their wallet address", () => {
    renderCard(
      { highestBid: 150, highestBidder: "GOTHERBIDDER", highestBidderName: "Mehmet" },
      "GBIDDER"
    );
    expect(screen.getByText("Mehmet")).toBeInTheDocument();
  });
});
