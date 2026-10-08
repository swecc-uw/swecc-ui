import { type ComponentPropsWithoutRef } from "react";
import {
  Dialog as AriaDialog,
  DialogTrigger,
  Heading,
  Modal as AriaModal,
  ModalOverlay,
  type DialogProps,
  type HeadingProps,
  type ModalOverlayProps,
} from "react-aria-components";
import * as stylex from "@stylexjs/stylex";
import { styled, type PartStyles } from "./styled";
import {
  colors,
  easings,
  fonts,
  fontSizes,
  layers,
  lineHeights,
  media,
  radii,
  shadows,
} from "./tokens.stylex";

const fadeIn = stylex.keyframes({ from: { opacity: 0 } });
const fadeOut = stylex.keyframes({ to: { opacity: 0 } });
const riseIn = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(0.5rem) scale(0.97)" },
});
const sinkOut = stylex.keyframes({
  to: { opacity: 0, transform: "translateY(0.5rem) scale(0.97)" },
});

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: layers.popup,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    backgroundColor: "rgb(0 0 0 / 0.6)",
    animationName: {
      default: null,
      "[data-entering]": { default: fadeIn, [media.reducedMotion]: "none" },
      "[data-exiting]": { default: fadeOut, [media.reducedMotion]: "none" },
    },
    animationDuration: "200ms",
    animationTimingFunction: "ease-out",
  },
  modal: {
    boxSizing: "border-box",
    width: "min(32rem, 100%)",
    maxHeight: "100%",
    overflowY: "auto",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.hairline,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    boxShadow: shadows.popup,
    color: colors.text,
    animationName: {
      default: null,
      "[data-entering]": { default: riseIn, [media.reducedMotion]: "none" },
      "[data-exiting]": { default: sinkOut, [media.reducedMotion]: "none" },
    },
    animationDuration: "200ms",
    animationTimingFunction: easings.out,
  },
  dialog: {
    padding: "1.5rem",
    outlineStyle: "none",
  },
  title: {
    margin: 0,
    fontFamily: fonts.hero,
    fontSize: fontSizes.h3,
    fontWeight: 700,
    lineHeight: lineHeights.heading,
  },
  description: {
    margin: "0.5rem 0 0",
    fontSize: fontSizes.body,
    lineHeight: lineHeights.body,
    color: colors.textSubtle,
  },
});

/**
 * Holds the open state. Its children are a `Button`, which opens the dialog,
 * and a `Dialog.Modal`.
 */
export const Trigger = DialogTrigger;

const Overlay = styled(ModalOverlay, styles.overlay);
const Panel = styled(AriaModal, styles.modal);

type ModalProps = Pick<
  ModalOverlayProps,
  | "isOpen"
  | "defaultOpen"
  | "onOpenChange"
  | "isDismissable"
  | "isKeyboardDismissDisabled"
> &
  Pick<DialogProps, "children" | "role" | "aria-label"> & {
    /** Styles the panel. */
    style?: PartStyles;
  };

/**
 * The modal panel, centered over a backdrop. A press outside closes it unless
 * `isDismissable` is false. A `Button` with `slot="close"` inside closes it.
 */
export function Modal({
  children,
  role,
  "aria-label": ariaLabel,
  style,
  isDismissable = true,
  ...overlay
}: ModalProps) {
  return (
    <Overlay {...overlay} isDismissable={isDismissable}>
      <Panel style={style}>
        <AriaDialog
          role={role}
          aria-label={ariaLabel}
          {...stylex.props(styles.dialog)}
        >
          {children}
        </AriaDialog>
      </Panel>
    </Overlay>
  );
}

const StyledHeading = styled(Heading, styles.title);

/** The dialog's heading. It names the dialog for assistive technology. */
export function Title({
  level = 2,
  ...props
}: Omit<HeadingProps, "className" | "style" | "slot"> & {
  style?: PartStyles;
}) {
  return <StyledHeading slot="title" level={level} {...props} />;
}

/** Supporting text under the title. */
export function Description({
  style,
  ...props
}: Omit<ComponentPropsWithoutRef<"p">, "className" | "style"> & {
  style?: PartStyles;
}) {
  return <p {...props} {...stylex.props(styles.description, style)} />;
}
