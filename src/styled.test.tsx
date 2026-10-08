import { renderToString } from "react-dom/server";
import * as stylex from "@stylexjs/stylex";
import { Collapsible } from "@base-ui/react/collapsible";
import { describe, expect, it } from "vitest";
import { styled } from "./styled";
import { colors } from "./tokens.stylex";

const styles = stylex.create({
  color: { color: colors.text },
  padding: { padding: "1rem" },
  override: { color: colors.primary },
  width: (px: number) => ({ width: `${px}px` }),
});

const Trigger = styled(Collapsible.Trigger, [styles.color, styles.padding]);
const classOf = (style: stylex.CompiledStyles) =>
  stylex.props(style).className ?? "";

const html = (trigger: React.ReactNode) =>
  renderToString(<Collapsible.Root>{trigger}</Collapsible.Root>);

describe("styled", () => {
  it("lets a passed style override the base style", () => {
    const classes = html(<Trigger style={styles.override}>Toggle</Trigger>)
      .match(/<button[^>]* class="([^"]+)"/)?.[1]
      .split(" ");
    expect(classes).toContain(classOf(styles.override));
    expect(classes).not.toContain(classOf(styles.color));
    expect(classes).toContain(classOf(styles.padding));
  });

  it("keeps a dynamic style next to the inline styles Base UI sets", () => {
    const Panel = styled(Collapsible.Panel, styles.padding);
    const out = renderToString(
      <Collapsible.Root defaultOpen>
        <Panel style={styles.width(40)}>Body</Panel>
      </Collapsible.Root>,
    );
    const inline = out.match(/style="([^"]*)"/)?.[1] ?? "";
    expect(inline).toContain("40px");
    expect(inline).toContain("--collapsible-panel-height");
  });
});
