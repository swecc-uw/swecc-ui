// The dev server pre-bundles dependencies with a bundler that skips the
// StyleX plugin. The plugin has to find @swecc/ui and exclude it.
import assert from "node:assert/strict";
import { createServer } from "vite";

const server = await createServer({ server: { middlewareMode: true } });
const { code } = await server.transformRequest("/src/App.tsx");
assert.match(code, /@swecc\/ui\/dist\/tokens\.stylex\.js/);
assert.doesNotMatch(code, /\.vite\/deps\/@swecc/);
// The StyleX plugin keeps a timer alive when there is no HTTP server.
process.exit(0);
