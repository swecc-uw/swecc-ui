# @swecc/ui

The SWECC design library: design tokens and React components that every SWECC
frontend shares. All styling goes through [StyleX](https://stylexjs.com).
Styles compile to atomic CSS at build time, and every style is type-checked.
Interactive components such as `Dialog` and `Accordion` are built on
[React Aria Components](https://react-aria.adobe.com), which supplies the
behavior: focus management, keyboard support, and ARIA attributes. The
library adds the SWECC styles.

The library ships uncompiled StyleX. Your app's StyleX plugin compiles the
library together with your own styles into one stylesheet, so a `style` prop
that you pass to a component overrides the styles of that component.

## Install

```bash
npm install @swecc/ui @stylexjs/stylex
npm install --save-dev @stylexjs/unplugin
```

The package is [`@swecc/ui` on npm](https://www.npmjs.com/package/@swecc/ui).

The library needs `react` and `react-dom` 18 or newer and `react-router` 7 or
newer. `Button` and `NavLink` render router links. React Aria
Components installs with the library, so you do not add it yourself. To pass a `ref` to `Band` or `Container`,
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

| Import path                | What it holds                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `@swecc/ui`                | Every component, `useReveal`, `reveal`, `REVEAL_STEP_MS`, and `typeStyles`                                    |
| `@swecc/ui/tokens.stylex`  | `colors`, `fonts`, `fontSizes`, `lineHeights`, `layout`, `radii`, `shadows`, `layers`, `easings`, and `media` |
| `@swecc/ui/markers.stylex` | `revealMarker`, `buttonMarker`, `photoMarker`, and `accordionItemMarker`, for use with `stylex.when.ancestor` |
| `@swecc/ui/global.css`     | Document defaults and element resets, the only hand-written CSS in the library                                |

## Components

| Source file                                                   | Exports                                                                                |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `Button.tsx`                                                  | `Button` (variants `primary`/`outline`/`ghost`, sizes `sm`/`md`/`lg`) and `ButtonIcon` |
| `Dialog.tsx`                                                  | `Dialog.Trigger`, `Modal`, `Title`, `Description`                                      |
| `Accordion.tsx`                                               | `Accordion.Root`, `Item`, `Trigger`, `Panel`                                           |
| `Typography.tsx`                                              | `Heading`, `Text`, and `typeStyles` (hero, display, mono)                              |
| `SectionHeading.tsx`                                          | `Eyebrow`, `DisplayTitle`, `Accent`, `Lede`                                            |
| `Layout.tsx`                                                  | `Band` (full-bleed section) and `Container` (max-width wrapper)                        |
| `NavLink.tsx`                                                 | Router `NavLink` with StyleX `style` and `activeStyle` props                           |
| `Reveal.ts`                                                   | `useReveal` and the `reveal` styles for scroll-in animation                            |
| `Photo.tsx`, `Pill.tsx`, `TerminalWindow.tsx`, `SkipLink.tsx` | Smaller building blocks                                                                |

## React Aria components

Interactive components wrap
[React Aria Components](https://react-aria.adobe.com). React Aria supplies the
behavior, and its docs describe the props. The library differs in three ways:

- Each component has the SWECC styles.
- `style` takes StyleX styles in place of `className` and inline styles.
- Related components share a namespace, and the parts that only layer or
  position content are folded in. `Dialog.Modal` renders the overlay, the
  modal, and the dialog. `Accordion.Trigger` renders the heading, the button,
  and the chevron.

| Library             | React Aria                                   |
| ------------------- | -------------------------------------------- |
| `Dialog.Trigger`    | `DialogTrigger`                              |
| `Dialog.Modal`      | `ModalOverlay`, `Modal`, and `Dialog`        |
| `Dialog.Title`      | `Heading` with `slot="title"`                |
| `Accordion.Root`    | `DisclosureGroup`                            |
| `Accordion.Item`    | `Disclosure`                                 |
| `Accordion.Trigger` | `Heading` and `Button` with `slot="trigger"` |
| `Accordion.Panel`   | `DisclosurePanel`                            |

```tsx
import { Button, Dialog } from "@swecc/ui";

<Dialog.Trigger>
  <Button variant="outline">Apply</Button>
  <Dialog.Modal>
    <Dialog.Title>Join the mentorship program</Dialog.Title>
    <Dialog.Description>Applications close on Friday.</Dialog.Description>
    <Button size="sm" slot="close">
      Done
    </Button>
  </Dialog.Modal>
</Dialog.Trigger>;
```

A `Button` without `to` or `href` is a React Aria button. It opens the
`Dialog.Trigger` around it, and `slot="close"` makes it close the
`Dialog.Modal` around it. It also takes `onPress` and `isDisabled`. A `Button`
with `to` or `href` is a link and cannot open a dialog.

React Aria marks state with data attributes such as `data-hovered`,
`data-pressed`, and `data-disabled`. To style a state, key the value on the
attribute:

```tsx
const styles = stylex.create({
  trigger: {
    color: { default: colors.text, "[data-hovered]": colors.accent },
  },
});

<Accordion.Trigger style={styles.trigger}>Dues</Accordion.Trigger>;
```

StyleX compiles these keys, but its `StyleXStyles` type rejects a style that
uses one. The `style` prop of a React Aria component is typed as
`PartStyles`, which accepts them.

Modals use `layers.popup` as their `z-index`. Give a sticky navigation bar
`layers.nav` so that modals open above the bar.

jsdom does not implement `CSS.escape`, which React Aria calls when a modal
opens. To render a `Dialog` in a jsdom test, define it in a setup file as
`vitest.setup.ts` does here.

To add a component, wrap the React Aria component with `styled` from
`src/styled.tsx`, export the namespace from `src/index.ts`, and add the
component to `playground/main.tsx` and `test/consumer/src/App.tsx`.

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

`npm run playground` serves `playground/main.tsx`, a page that renders the
React Aria components. Use the page to check a component in a browser.

`npm run test:consumer` packs the library, installs the tarball into the Vite
app in `test/consumer`, and checks that the app type-checks, builds, and
renders. Run it after you change `package.json` or add an export.

`npm run build` compiles `src` to `dist` with `tsc`. The build leaves the
StyleX calls in place for the app's plugin to compile. npm runs the build
before it packs or publishes the library.

To try a change in an app before you release it, run `npm pack` here and
install the tarball in the app. `npm pack` prints the file name.

```bash
npm install ../swecc-ui/swecc-ui-0.1.0.tgz
```

## Release a version

1. On a branch, run `npm version patch --no-git-tag-version` (or `minor`). The
   command updates the version in `package.json` and `package-lock.json`.
2. Open a pull request with that change and merge it.

The `publish` job in `.github/workflows/ci.yml` runs on every merge to `main`.
If npm does not have the version in `package.json` yet, the job publishes the
version and pushes a matching `v*` tag. A merge that does not change the
version publishes nothing.

The job publishes through trusted publishing, so no npm token is involved. npm
trusts the workflow by its file name, so update the trusted publisher on
npmjs.com if you rename `ci.yml`.
