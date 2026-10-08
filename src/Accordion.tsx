import { type ReactNode } from "react";
import {
  Button as AriaButton,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
  type DisclosurePanelProps,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { accordionItemMarker } from "./markers.stylex";
import { styled, type PartStyles } from "./styled";
import {
  colors,
  easings,
  fonts,
  fontSizes,
  lineHeights,
  media,
} from "./tokens.stylex";

const styles = stylex.create({
  item: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: colors.border,
  },
  heading: {
    margin: 0,
  },
  trigger: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    padding: "1rem 0",
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: "transparent",
    fontFamily: fonts.sans,
    fontSize: fontSizes.bodyLarge,
    fontWeight: 500,
    lineHeight: lineHeights.heading,
    textAlign: "start",
    color: {
      default: colors.text,
      "[data-hovered]": colors.primary,
      "[data-disabled]": colors.textSubtle,
    },
    cursor: { default: "pointer", "[data-disabled]": "not-allowed" },
    transition: "color 150ms",
  },
  chevron: {
    flex: "none",
    width: "0.5rem",
    height: "0.5rem",
    marginRight: "0.25rem",
    borderRightWidth: "1.5px",
    borderRightStyle: "solid",
    borderRightColor: "currentcolor",
    borderBottomWidth: "1.5px",
    borderBottomStyle: "solid",
    borderBottomColor: "currentcolor",
    transform: {
      default: "translateY(-25%) rotate(45deg)",
      [stylex.when.ancestor("[data-expanded]", accordionItemMarker)]:
        "translateY(25%) rotate(-135deg)",
    },
    transition: {
      default: `transform 200ms ${easings.out}`,
      [media.reducedMotion]: "none",
    },
  },
  panel: {
    height: "var(--disclosure-panel-height)",
    overflow: "clip",
    color: colors.textMuted,
    transition: {
      default: `height 200ms ${easings.out}`,
      [media.reducedMotion]: "none",
    },
  },
  panelContent: {
    paddingBottom: "1rem",
    lineHeight: lineHeights.body,
  },
});

/**
 * A stack of collapsible sections. Pass `allowsMultipleExpanded` to open
 * several at once.
 */
export const Root = styled(DisclosureGroup, null);

/** One section: a `Trigger` and its `Panel`. Its `id` is its key in `Root`. */
export const Item = styled(Disclosure, [styles.item, accordionItemMarker]);

type TriggerProps = {
  children: ReactNode;
  /** The heading level of the section title. */
  level?: number;
  style?: PartStyles;
};

/** The heading button that opens its panel, with a chevron that turns. */
export function Trigger({ children, level = 3, style }: TriggerProps) {
  return (
    <Heading level={level} {...stylex.props(styles.heading)}>
      <AriaButton slot="trigger" {...stylex.props(styles.trigger, style)}>
        {children}
        <span aria-hidden {...stylex.props(styles.chevron)} />
      </AriaButton>
    </Heading>
  );
}

const StyledPanel = styled(DisclosurePanel, styles.panel);

/** The section's content. It animates to its measured height. */
export function Panel({
  children,
  ...props
}: Omit<DisclosurePanelProps, "className" | "style"> & {
  style?: PartStyles;
}) {
  return (
    <StyledPanel {...props}>
      <div {...stylex.props(styles.panelContent)}>{children}</div>
    </StyledPanel>
  );
}
