import { forwardRef } from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import * as stylex from "@stylexjs/stylex";
import { accordionTriggerMarker } from "./markers.stylex";
import { styled, type StyledProps } from "./styled";
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
  header: {
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
      ":hover": colors.primary,
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
      [stylex.when.ancestor("[data-panel-open]", accordionTriggerMarker)]:
        "translateY(25%) rotate(-135deg)",
    },
    transition: {
      default: `transform 200ms ${easings.out}`,
      [media.reducedMotion]: "none",
    },
  },
  panel: {
    height: {
      default: "var(--accordion-panel-height)",
      "[data-starting-style]": 0,
      "[data-ending-style]": 0,
    },
    overflow: "hidden",
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

/** A stack of collapsible sections. Pass `multiple` to open several at once. */
export const Root = styled(BaseAccordion.Root, null);

/** One section: a `Trigger` and its `Panel`. */
export const Item = styled(BaseAccordion.Item, styles.item);

const Header = styled(BaseAccordion.Header, styles.header);
const StyledTrigger = styled(BaseAccordion.Trigger, [
  styles.trigger,
  accordionTriggerMarker,
]);
const StyledPanel = styled(BaseAccordion.Panel, styles.panel);

/** The heading button that opens its panel, with a chevron that turns. */
export const Trigger = forwardRef<
  HTMLButtonElement,
  StyledProps<typeof BaseAccordion.Trigger>
>(function Trigger({ children, ...props }, ref) {
  return (
    <Header>
      <StyledTrigger ref={ref} {...props}>
        {children}
        <span aria-hidden {...stylex.props(styles.chevron)} />
      </StyledTrigger>
    </Header>
  );
});

/** The section's content. It animates to its measured height. */
export const Panel = forwardRef<
  HTMLDivElement,
  StyledProps<typeof BaseAccordion.Panel>
>(function Panel({ children, ...props }, ref) {
  return (
    <StyledPanel ref={ref} {...props}>
      <div {...stylex.props(styles.panelContent)}>{children}</div>
    </StyledPanel>
  );
});
