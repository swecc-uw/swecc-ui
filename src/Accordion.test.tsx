// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import * as Accordion from "./Accordion";

afterEach(cleanup);

describe("Accordion", () => {
  it("shows a panel when its trigger is clicked", () => {
    render(
      <Accordion.Root>
        <Accordion.Item value="dues">
          <Accordion.Trigger>Dues</Accordion.Trigger>
          <Accordion.Panel>Every event is free.</Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const trigger = screen.getByRole("button", { name: "Dues" });
    expect(trigger.parentElement?.tagName).toBe("H3");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Every event is free.")).toBeNull();

    fireEvent.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("region").textContent).toBe("Every event is free.");
  });
});
