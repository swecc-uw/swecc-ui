// @vitest-environment jsdom
import { createRef } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "./Button";
import * as Dialog from "./Dialog";

afterEach(cleanup);

function Example({ popupRef }: { popupRef?: React.Ref<HTMLDivElement> }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" />}>
        Open
      </Dialog.Trigger>
      <Dialog.Popup ref={popupRef}>
        <Dialog.Title>Apply</Dialog.Title>
        <Dialog.Description>Applications close on Friday.</Dialog.Description>
        <Dialog.Close>Cancel</Dialog.Close>
      </Dialog.Popup>
    </Dialog.Root>
  );
}

describe("Dialog", () => {
  it("opens from a Button trigger as a dialog named by its title", () => {
    const popupRef = createRef<HTMLDivElement>();
    render(<Example popupRef={popupRef} />);
    expect(screen.queryByRole("dialog")).toBeNull();

    const trigger = screen.getByRole("button", { name: "Open" });
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.querySelector("button")).toBeNull();
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Apply" });
    expect(dialog.textContent).toContain("Applications close on Friday.");
    expect(popupRef.current).toBe(dialog);
  });

  it("closes from Dialog.Close", () => {
    render(<Example />);
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
