# @swecc/ui

The SWECC design library: design tokens and React components that every SWECC
frontend shares. All styling goes through [StyleX](https://stylexjs.com).
Styles compile to atomic CSS at build time, and every style is type-checked.

The library ships uncompiled StyleX. Your app's StyleX plugin compiles the
library together with your own styles into one stylesheet, so a `style` prop
that you pass to a component overrides the styles of that component.

## Install

```bash
npm install git+https://github.com/swecc-uw/swecc-ui.git @stylexjs/stylex
npm install --save-dev @stylexjs/unplugin
```

The library needs `react` 18 or newer and `react-router` 7 or newer. `Button`
and `NavLink` render router links. To pass a `ref` to `Band` or `Container`,
use React 19. React 18 does not hand `ref` to a function component.

## Set up a Vite app

1. Add the StyleX plugin before the React plugin in `vite.config.ts`. The
   plugin finds `@swecc/ui` in your dependencies and compiles it.

   ```ts
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   import { unplugin as stylex } from "@stylexjs/unplugin";

   export default defineConfig({
     plugins: [stylex.vite(), react()],
   });
   ```

2. Import the global stylesheet once, in your entry file.

   ```ts
   import "@swecc/ui/global.css";
   ```

3. Load the fonts in `index.html`.

   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link
     href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Manrope:wght@600;700;800&family=Roboto:wght@400;500;700&display=swap"
     rel="stylesheet"
   />
   ```

4. Set `"moduleResolution": "bundler"` in `tsconfig.json`. The older `node`
   setting cannot resolve the `@swecc/ui/tokens.stylex` path.

If your app renders on the server, prerenders, or renders library components
in Vitest, also bundle the library into the server build. Node cannot run
uncompiled StyleX, and Vitest loads dependencies through Node unless this
setting is present.

```ts
export default defineConfig({
  plugins: [stylex.vite(), react()],
  ssr: { noExternal: ["@swecc/ui"] },
});
```

## Import components and tokens

```tsx
import * as stylex from "@stylexjs/stylex";
import { Button, Heading, Text } from "@swecc/ui";
import { colors, media } from "@swecc/ui/tokens.stylex";

const styles = stylex.create({
  title: {
    color: colors.primary,
    fontSize: { default: "2rem", [media.max768]: "1.5rem" },
  },
});

export function Welcome() {
  return (
    <>
      <Heading level={1} style={styles.title}>
        Welcome
      </Heading>
      <Text>Meet the club.</Text>
      <Button variant="primary" size="lg" to="/events">
        See events
      </Button>
    </>
  );
}
```

Tokens and markers have their own import paths because StyleX resolves them at
compile time and needs a path that ends in `.stylex`.

| Import path                | What it holds                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `@swecc/ui`                | Every component, `useReveal`, `reveal`, `REVEAL_STEP_MS`, and `typeStyles`               |
| `@swecc/ui/tokens.stylex`  | `colors`, `fonts`, `fontSizes`, `lineHeights`, `layout`, `radii`, `easings`, and `media` |
| `@swecc/ui/markers.stylex` | `revealMarker`, `buttonMarker`, and `photoMarker`, for use with `stylex.when.ancestor`   |
| `@swecc/ui/global.css`     | Document defaults and element resets, the only hand-written CSS in the library           |

## Components

| Source file                                                   | Exports                                                                                |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `Button.tsx`                                                  | `Button` (variants `primary`/`outline`/`ghost`, sizes `sm`/`md`/`lg`) and `ButtonIcon` |
| `Typography.tsx`                                              | `Heading`, `Text`, and `typeStyles` (hero, display, mono)                              |
| `SectionHeading.tsx`                                          | `Eyebrow`, `DisplayTitle`, `Accent`, `Lede`                                            |
| `Layout.tsx`                                                  | `Band` (full-bleed section) and `Container` (max-width wrapper)                        |
| `NavLink.tsx`                                                 | Router `NavLink` with StyleX `style` and `activeStyle` props                           |
| `Reveal.ts`                                                   | `useReveal` and the `reveal` styles for scroll-in animation                            |
| `Photo.tsx`, `Pill.tsx`, `TerminalWindow.tsx`, `SkipLink.tsx` | Smaller building blocks                                                                |

## Compose styles

Every component takes a `style` prop typed as `StyleXStyles`. Styles passed
in are applied last, so they override the component's own:

```tsx
const styles = stylex.create({
  cta: { width: "100%" },
});

<Button variant="primary" size="lg" style={styles.cta}>
  <ButtonIcon icon={FiCalendar} />
  Add to calendar
</Button>;
```

`style` also accepts arrays and falsy values: `style={[a, isOpen && b]}`.

Always spread `stylex.props(...)` onto an element whole. Don't add a
separate `style={{ … }}` next to it: that replaces StyleX's inline
variables. Don't pick `.className` off it either. For values only known at
runtime, use a dynamic style:

```tsx
const styles = stylex.create({
  offset: (x: number, y: number) => ({
    transform: `translate(${x}px, ${y}px)`,
  }),
});

<div {...stylex.props(styles.window, styles.offset(x, y))} />;
```

When a component only accepts `className` (or a function returning one),
wrap it once and give it StyleX props, as `NavLink` does.

Write colors, fonts, and breakpoints with tokens, not literals. To restyle a
subtree, theme its variables with `stylex.createTheme`.

## Scroll reveal

```tsx
const scope = useReveal<HTMLElement>();

<Band tone="grey" reveal={scope}>
  <Eyebrow path="about" style={[reveal.item, reveal.order(0)]} />
  <DisplayTitle style={[reveal.item, reveal.order(1)]}>…</DisplayTitle>
  <Photo src={img} alt="…" revealOrder={2} />
</Band>;
```

Items stay hidden until the band scrolls into view, then fade up in `order`.
With reduced motion turned on, nothing animates.

## StyleX gotchas

- **Use longhands for borders and backgrounds.** StyleX doesn't support
  `border`, `borderTop`, …, or `background`. The Vite plugin drops them
  silently instead of failing the build. Write `borderTopWidth` /
  `borderTopStyle` / `borderTopColor` or `backgroundColor`.
- **Write `stylex.when.*` inline** as a computed key inside `stylex.create`.
  Hoisting one into a `const` leaves a call that throws at runtime.
- **Pass numbers as strings** for properties StyleX types as string-only
  (e.g. `gridRow: "2"`). Otherwise the style won't type-check as a `style`
  prop.
- **Select elements by data attribute, not class.** StyleX class names are
  hashed.

## Work on the library

```bash
npm install
npm test
npm run test:consumer
```

`npm test` runs the unit tests and `src/guards.test.ts`. The guards fail on:

- a border or background shorthand
- any stylesheet besides `global.css`, or any CSS import in a source file
- a hex color anywhere except `tokens.stylex.ts`
- an inline `style={{ … }}` object
- a color in `global.css` that isn't a `colors` token value (StyleX hashes
  variable names, so `global.css` can't reference tokens directly)

Each failure names the file and the rule. Fix the code rather than the
guard. If a rule needs an exception, change it in the test with a comment
that explains why.

`npm run test:consumer` packs the library, installs the tarball into the Vite
app in `test/consumer`, and checks that the app type-checks, builds, and
renders. Run it after you change `package.json` or add an export.

`npm run build` compiles `src` to `dist` with `tsc`. The build leaves the
StyleX calls in place for the app's plugin to compile. npm runs the build when
an app installs the library from Git.

To try a change in an app before you push, run `npm pack` here and install the
tarball in the app with `npm install ../swecc-ui/swecc-ui-0.1.0.tgz`.
