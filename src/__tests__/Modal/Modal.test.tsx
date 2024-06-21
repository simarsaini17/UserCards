import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { Modal } from "@/components/Modal/Modal";

describe("Modal Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("close Modal using x button", () => {
    let isOpen = true;
    const onClose = jest.fn(() => (isOpen = false));

    const { rerender } = render(<Modal isOpen={isOpen} onClose={onClose} />);

    const modal = screen.getByTestId("modal");
    const closeButton = screen.getByTestId("close-modal");

    expect(modal).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();

    rerender(<Modal isOpen={isOpen} onClose={onClose} />);

    expect(closeButton).not.toBeInTheDocument();
  });

  it("close Modal using escape button", () => {
    let isOpen = true;
    const onClose = jest.fn(() => (isOpen = false));

    render(<Modal isOpen={isOpen} onClose={onClose} />);

    const modal = screen.getByTestId("modal");
    const closeButton = screen.getByTestId("close-modal");

    expect(modal).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    const event = new KeyboardEvent("keydown", { key: "Escape" });
    document.dispatchEvent(event);

    expect(onClose).toHaveBeenCalled();
  });
});
