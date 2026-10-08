// Installs the packed tarball into a fresh Vite app and checks that the app
// type-checks, builds, and renders. A unit test inside this repo imports
// source files, so only this script exercises `exports`, `files`, and `dist`.
import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.join(import.meta.dirname, "..");
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "swecc-ui-consumer-"));
const run = (command, cwd = dir) => {
  try {
    return execSync(command, { cwd, stdio: "pipe" }).toString();
  } catch (error) {
    console.error(`${command}
${error.stdout}${error.stderr}`);
    process.exit(1);
  }
};

fs.cpSync(path.join(root, "test", "consumer"), dir, { recursive: true });
const [{ filename }] = JSON.parse(
  run(`npm pack --json --pack-destination "${dir}"`, root),
);
const extra = process.env.CONSUMER_EXTRA_DEPS ?? "";
run(`npm install --no-audit --no-fund ./${filename} ${extra}`);

run("npx tsc -p tsconfig.json");

run("npx vite build");
const assets = path.join(dir, "dist", "assets");
const css = fs
  .readdirSync(assets)
  .filter((file) => file.endsWith(".css"))
  .map((file) => fs.readFileSync(path.join(assets, file), "utf8"))
  .join("\n");
assert.match(css, /font-family:\s*Roboto/, "global.css is in the build");
assert.match(css, /--x[\w-]+:\s*#7ea266/, "colors.primary is defined");
assert.match(css, /999px/, "the Pill radius token is defined");

run("npx vite build --ssr src/entry-server.tsx --outDir dist-ssr");
const { render } = await import(
  pathToFileURL(path.join(dir, "dist-ssr", "entry-server.js")).href
);
const html = render();
const classOf = (tag) =>
  html.match(new RegExp(`<${tag}[^>]* class="([^"]+)"`))?.[1] ?? "";
for (const tag of ["section", "figure", "h2", "p", "a"]) {
  assert.notEqual(classOf(tag), "", `<${tag}> renders with StyleX classes`);
}
for (const name of classOf("section").split(" ")) {
  if (name.startsWith("x")) {
    assert.ok(css.includes(`.${name}`), `the build has a rule for .${name}`);
  }
}
assert.match(html, /href="\/next"/, "Button renders a router link for `to`");
assert.match(
  html,
  /<button[^>]*aria-expanded="true"[^>]*>Dues/,
  "Accordion renders its expanded item through React Aria",
);
assert.match(
  html,
  /<button[^>]*data-react-aria-pressable[^>]*>Open/,
  "Button renders a React Aria button",
);
assert.match(
  css,
  /\[data-entering\][^{]*\{\s*animation-name:/,
  "the build has the data-attribute rule for an entering Dialog.Modal",
);

run("node dev-check.mjs");

fs.rmSync(dir, { recursive: true, force: true });
console.log(
  "consumer fixture: type-checks, builds, renders, and serves in dev",
);
