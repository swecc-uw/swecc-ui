import { describe, expect, it, vi } from "vitest";
import { safeHref, safeRel } from "./safeHref";

describe("safeHref", () => {
  it("allows http URLs", () => {
    expect(safeHref("http://example.com")).toBe("http://example.com");
  });

  it("allows https URLs", () => {
    expect(safeHref("https://example.com/path")).toBe(
      "https://example.com/path",
    );
  });

  it("allows mailto URLs", () => {
    expect(safeHref("mailto:test@example.com")).toBe("mailto:test@example.com");
  });

  it("allows tel URLs", () => {
    expect(safeHref("tel:+1234567890")).toBe("tel:+1234567890");
  });

  it("allows fragment identifiers", () => {
    expect(safeHref("#main")).toBe("#main");
    expect(safeHref("#section-1")).toBe("#section-1");
  });

  it("allows root-relative paths", () => {
    expect(safeHref("/about")).toBe("/about");
    expect(safeHref("/page/sub")).toBe("/page/sub");
  });

  it("allows relative paths starting with ./", () => {
    expect(safeHref("./page")).toBe("./page");
  });

  it("allows relative paths starting with ../", () => {
    expect(safeHref("../page")).toBe("../page");
  });

  it("blocks javascript: URLs", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(safeHref("javascript:alert(1)")).toBeUndefined();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("blocks data: URLs", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(
      safeHref("data:text/html,<script>alert(1)</script>"),
    ).toBeUndefined();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("blocks vbscript: URLs", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(safeHref("vbscript:msgbox(1)")).toBeUndefined();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("blocks file: URLs", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(safeHref("file:///etc/passwd")).toBeUndefined();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("blocks ftp: URLs", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(safeHref("ftp://example.com")).toBeUndefined();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});

describe("safeRel", () => {
  it("adds noopener noreferrer when target is _blank and rel is undefined", () => {
    expect(safeRel("_blank", undefined)).toBe("noopener noreferrer");
  });

  it("preserves consumer-provided rel when target is _blank", () => {
    expect(safeRel("_blank", "author")).toBe("author");
    expect(safeRel("_blank", "noopener")).toBe("noopener");
  });

  it("returns undefined when target is not _blank", () => {
    expect(safeRel("_self", undefined)).toBeUndefined();
    expect(safeRel("_parent", undefined)).toBeUndefined();
    expect(safeRel(undefined, undefined)).toBeUndefined();
  });

  it("preserves rel when target is not _blank", () => {
    expect(safeRel("_self", "author")).toBe("author");
    expect(safeRel(undefined, "nofollow")).toBe("nofollow");
  });
});
