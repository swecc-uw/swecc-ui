import * as stylex from "@stylexjs/stylex";
import { Heading, Text } from "../../src";
import { colors, fonts, fontSizes, radii } from "../../src/tokens.stylex";
import { Example } from "./Example";

// StyleX compiles a token group to an object of `var(--hash)` strings, plus
// bookkeeping keys that start with `__`.
const entries = (group: object) =>
  Object.entries(group).filter(
    (entry): entry is [string, string] =>
      !entry[0].startsWith("__") && typeof entry[1] === "string",
  );

export function Tokens() {
  return (
    <Example name="Tokens">
      <Heading level={3} style={styles.group}>
        colors
      </Heading>
      <ul {...stylex.props(styles.grid)}>
        {entries(colors).map(([name, value]) => (
          <li key={name}>
            <div {...stylex.props(styles.swatch, styles.fill(value))} />
            <span {...stylex.props(styles.label)}>{name}</span>
          </li>
        ))}
      </ul>
      <Heading level={3} style={styles.group}>
        radii
      </Heading>
      <ul {...stylex.props(styles.grid)}>
        {entries(radii).map(([name, value]) => (
          <li key={name}>
            <div {...stylex.props(styles.swatch, styles.rounded(value))} />
            <span {...stylex.props(styles.label)}>{name}</span>
          </li>
        ))}
      </ul>
      <Heading level={3} style={styles.group}>
        fonts
      </Heading>
      {entries(fonts).map(([name, value]) => (
        <Text key={name} style={[styles.sample, styles.family(value)]}>
          <span {...stylex.props(styles.label, styles.sampleLabel)}>
            {name}
          </span>
          Software Engineering Career Club
        </Text>
      ))}
      <Heading level={3} style={styles.group}>
        fontSizes
      </Heading>
      {entries(fontSizes).map(([name, value]) => (
        <Text key={name} style={[styles.sample, styles.size(value)]}>
          <span {...stylex.props(styles.label, styles.sampleLabel)}>
            {name}
          </span>
          Software Engineering Career Club
        </Text>
      ))}
    </Example>
  );
}

const styles = stylex.create({
  group: {
    marginTop: { default: "2rem", ":first-child": 0 },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))",
    gap: "1rem",
  },
  swatch: {
    height: "4rem",
    marginBottom: "0.4rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.hairline,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceRaised,
  },
  fill: (color: string) => ({ backgroundColor: color }),
  rounded: (radius: string) => ({ borderRadius: radius }),
  family: (family: string) => ({ fontFamily: family }),
  size: (size: string) => ({ fontSize: size }),
  sample: {
    display: "flex",
    alignItems: "baseline",
    gap: "1rem",
    margin: "0 0 0.5rem",
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: "0.8125rem",
    color: colors.textSubtle,
  },
  sampleLabel: {
    flex: "none",
    width: "6rem",
  },
});
