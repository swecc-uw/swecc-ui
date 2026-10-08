import { type ComponentType } from "react";
import { MemoryRouter } from "react-router";
import * as stylex from "@stylexjs/stylex";
import {
  Accent,
  Band,
  Container,
  DisplayTitle,
  Eyebrow,
  Lede,
  Pill,
} from "../../src";
import { layout } from "../../src/tokens.stylex";
import { Example } from "./Example";
import { Tokens } from "./Tokens";

// Every file in ./examples is one section of the page. The page renders the
// file's default export and prints the same file as the snippet, so the code
// a reader copies is the code that ran.
const modules = import.meta.glob<ComponentType>("./examples/*.tsx", {
  import: "default",
  eager: true,
});
const sources = import.meta.glob<string>("./examples/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
});
const examples = Object.entries(modules).map(([path, Component]) => ({
  name: path.slice("./examples/".length, -".tsx".length),
  Component,
  // The examples import the library by relative path; an app imports it by
  // package name.
  source: sources[path].replace(/"(?:\.\.\/)+src/g, '"@swecc/ui'),
}));

export function App() {
  return (
    <MemoryRouter>
      <Band tone="black">
        <Container as="header" gutter style={styles.header}>
          <Eyebrow path="swecc-ui" />
          <DisplayTitle>
            The SWECC <Accent>design library</Accent>
          </DisplayTitle>
          <Lede>
            Every token and component in @swecc/ui, rendered from the source in
            this repository.
          </Lede>
          <nav aria-label="Sections">
            <ul {...stylex.props(styles.nav)}>
              {["Tokens", ...examples.map(({ name }) => name)].map((name) => (
                <Pill as="li" key={name}>
                  <a href={`#${name}`}>{name}</a>
                </Pill>
              ))}
            </ul>
          </nav>
        </Container>
      </Band>
      <main id="main">
        <Container gutter style={styles.sections}>
          <Tokens />
          {examples.map(({ name, Component, source }) => (
            <Example key={name} name={name} source={source}>
              <Component />
            </Example>
          ))}
        </Container>
      </main>
    </MemoryRouter>
  );
}

const styles = stylex.create({
  header: {
    paddingBlock: layout.bandPaddingY,
  },
  nav: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginTop: "2rem",
  },
  sections: {
    display: "flex",
    flexDirection: "column",
    gap: "4rem",
    paddingBottom: layout.bandPaddingY,
  },
});
