// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "./Button";
import * as Dialog from "./Dialog";

afterEach(cleanup);

function Example() {
  return (
    <Dialog.Trigger>
      <Button variant="outline">Open</Button>
      <Dialog.Modal>
        <Dialog.Title>Apply</Dialog.Title>
        <Dialog.Description>Applications close on Friday.</Dialog.Description>
        <Button slot="close">Cancel</Button>
      </Dialog.Modal>
    </Dialog.Trigger>
  );
}

describe("Dialog", () => {
  it("opens from a Button as a dialog named by its title", () => {
    render(<Example />);
    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Open" }));

    const dialog = screen.getByRole("dialog", { name: "Apply" });
    expect(dialog.textContent).toContain("Applications close on Friday.");
  });

  it("closes from a Button in the close slot", () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes on Escape", () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
