import { forwardRef } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import * as stylex from "@stylexjs/stylex";
import { styled, type StyledProps } from "./styled";
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

const styles = stylex.create({
  backdrop: {
    position: "fixed",
    inset: 0,
    zIndex: layers.popup,
    backgroundColor: "rgb(0 0 0 / 0.6)",
    opacity: {
      default: 1,
      "[data-starting-style]": 0,
      "[data-ending-style]": 0,
    },
    transition: {
      default: "opacity 200ms ease-out",
      [media.reducedMotion]: "none",
    },
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: layers.popup,
    boxSizing: "border-box",
    width: "min(32rem, calc(100vw - 2rem))",
    maxHeight: "calc(100dvh - 2rem)",
    overflowY: "auto",
    padding: "1.5rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.hairline,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    boxShadow: shadows.popup,
    color: colors.text,
    opacity: {
      default: 1,
      "[data-starting-style]": 0,
      "[data-ending-style]": 0,
    },
    transform: {
      default: "translate(-50%, -50%)",
      "[data-starting-style]": "translate(-50%, -48%) scale(0.97)",
      "[data-ending-style]": "translate(-50%, -48%) scale(0.97)",
    },
    transition: {
      default: `opacity 200ms ${easings.out}, transform 200ms ${easings.out}`,
      [media.reducedMotion]: "none",
    },
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

/** Holds the dialog's open state. Takes `open` and `onOpenChange`. */
export const Root = BaseDialog.Root;

/** Opens the dialog. Pass `render={<Button />}` to style it as a button. */
export const Trigger = styled(BaseDialog.Trigger, null);

/** Closes the dialog. Pass `render={<Button />}` to style it as a button. */
export const Close = styled(BaseDialog.Close, null);

/** The dialog's heading, announced when the dialog opens. */
export const Title = styled(BaseDialog.Title, styles.title);

/** Supporting text under the title, announced with it. */
export const Description = styled(BaseDialog.Description, styles.description);

const Backdrop = styled(BaseDialog.Backdrop, styles.backdrop);
const StyledPopup = styled(BaseDialog.Popup, styles.popup);

/** The modal panel, centered over a backdrop and portaled to the body. */
export const Popup = forwardRef<
  HTMLDivElement,
  StyledProps<typeof BaseDialog.Popup>
>(function Popup(props, ref) {
  return (
    <BaseDialog.Portal>
      <Backdrop />
      <StyledPopup ref={ref} {...props} />
    </BaseDialog.Portal>
  );
});
