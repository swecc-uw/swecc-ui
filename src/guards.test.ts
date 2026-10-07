import { describe, expect, it } from "vitest";
import globalCss from "./global.css?raw";
import tokens from "./tokens.stylex.ts?raw";

// Design-system rules that review alone won't hold. Each failure message says
// what to do instead; see README.md for the reasoning.

const sources = import.meta.glob<string>(
  ["./**/*.{ts,tsx}", "!./**/*.test.ts"],
  { query: "?raw", import: "default", eager: true },
);
const cssFiles = Object.keys(import.meta.glob("./**/*.css"));

const files = (filter: (path: string) => boolean = () => true) =>
  Object.entries(sources).filter(([path]) => filter(path));
const isTokens = (path: string) => path.endsWith("/tokens.stylex.ts");

const HEX = /(?<![\w&])#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b/gi;

describe("design system guards", () => {
  it("found source files to check", () => {
    expect(files().length).toBeGreaterThan(10);
  });

  it.each(files((path) => !path.endsWith(".stylex.ts")))(
    "%s avoids border/background shorthands, which StyleX silently drops",
    (_, source) => {
      expect(source).not.toMatch(
        /^\s*(border|border(Top|Right|Bottom|Left|Block|Inline)(Start|End)?|background)\s*:/m,
      );
    },
  );

  it("has no stylesheets besides global.css", () => {
    expect(cssFiles).toEqual(["./global.css"]);
  });

  it.each(files())("%s imports no CSS", (_, source) => {
    expect(source).not.toMatch(/(from|import)\s+["'][^"']+\.css["']/);
  });

  it.each(files((path) => !isTokens(path)))(
    "%s takes colors from tokens.stylex.ts, not hex literals",
    (_, source) => {
      expect(source.match(HEX) ?? []).toEqual([]);
    },
  );

  it.each(files())(
    "%s has no inline style objects; use a dynamic StyleX style",
    (_, source) => {
      expect(source).not.toMatch(/style=\{\{/);
    },
  );

  it("global.css only uses colors defined as tokens", () => {
    const start = tokens.indexOf("export const colors");
    const colorTokens = tokens.slice(start, tokens.indexOf("});", start));
    const tokenHexes = new Set(
      (colorTokens.match(HEX) ?? []).map((h) => h.toLowerCase()),
    );
    const used = (globalCss.match(HEX) ?? []).map((h) => h.toLowerCase());
    expect(used.length).toBeGreaterThan(0);
    expect(used.filter((hex) => !tokenHexes.has(hex))).toEqual([]);
  });
});
