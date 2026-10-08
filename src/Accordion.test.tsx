// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import * as Accordion from "./Accordion";

afterEach(cleanup);

describe("Accordion", () => {
  it("expands a panel when its trigger is clicked", () => {
    render(
      <Accordion.Root>
        <Accordion.Item id="dues">
          <Accordion.Trigger>Dues</Accordion.Trigger>
          <Accordion.Panel>Every event is free.</Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>,
    );
    const trigger = screen.getByRole("button", { name: "Dues" });
    const panel = screen.getByText("Every event is free.").parentElement!;
    expect(trigger.parentElement?.tagName).toBe("H3");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(panel.getAttribute("hidden")).toBe("until-found");

    fireEvent.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(panel.id);
    expect(panel.hasAttribute("hidden")).toBe(false);
  });
});
