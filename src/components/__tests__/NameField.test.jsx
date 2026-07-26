import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NameField } from "../NameField";

describe("NameField", () => {
  it("shows an editable input when no name is known yet", () => {
    render(<NameField name="" onChange={vi.fn()} disabled={false} />);
    expect(screen.getByLabelText(/adın/i)).toBeInTheDocument();
  });

  it("shows a compact display line instead of an input when a name is already known", () => {
    render(<NameField name="Ayşe Yılmaz" onChange={vi.fn()} disabled={false} />);
    expect(screen.queryByLabelText(/adın/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Ayşe Yılmaz/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /değiştir/i })).toBeInTheDocument();
  });

  it("switches back to an editable input when 'değiştir' is clicked", async () => {
    const user = userEvent.setup();
    render(<NameField name="Ayşe Yılmaz" onChange={vi.fn()} disabled={false} />);

    await user.click(screen.getByRole("button", { name: /değiştir/i }));

    expect(screen.getByLabelText(/adın/i)).toHaveValue("Ayşe Yılmaz");
  });
});
