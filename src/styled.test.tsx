import { renderToString } from "react-dom/server";
import * as stylex from "@stylexjs/stylex";
import { Button } from "react-aria-components";
import { describe, expect, it } from "vitest";
import { styled } from "./styled";
import { colors } from "./tokens.stylex";

const styles = stylex.create({
  color: { color: colors.text },
  padding: { padding: "1rem" },
  override: { color: colors.primary },
  width: (px: number) => ({ width: `${px}px` }),
});

const Styled = styled(Button, [styles.color, styles.padding]);
const classOf = (style: stylex.CompiledStyles) =>
  stylex.props(style).className ?? "";

describe("styled", () => {
  it("lets a passed style override the base style", () => {
    const classes = renderToString(
      <Styled style={styles.override}>Toggle</Styled>,
    )
      .match(/<button[^>]* class="([^"]+)"/)?.[1]
      .split(" ");
    expect(classes).toContain(classOf(styles.override));
    expect(classes).not.toContain(classOf(styles.color));
    expect(classes).toContain(classOf(styles.padding));
  });

  it("passes a dynamic style through as an inline style", () => {
    const html = renderToString(
      <Styled style={styles.width(40)}>Toggle</Styled>,
    );
    expect(html.match(/style="([^"]*)"/)?.[1]).toContain("40px");
  });
});
