import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type ElementType,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import * as stylex from "@stylexjs/stylex";
import type {
  CompiledStyles,
  InlineStyles,
  StyleXArray,
} from "@stylexjs/stylex";

/**
 * Styles for a React Aria component. Unlike `StyleXStyles`, this type accepts
 * a style that keys a value on a data attribute, such as `"[data-hovered]"`.
 * StyleX compiles those keys, but `StyleXStyles` rejects the styles that use
 * them.
 */
export type PartStyles = StyleXArray<
  | CompiledStyles
  | Readonly<[CompiledStyles, InlineStyles]>
  | boolean
  | null
  | undefined
>;

/** The props of a React Aria component, with `style` taking StyleX styles. */
export type StyledProps<Part extends ElementType> = Omit<
  ComponentPropsWithoutRef<Part>,
  "className" | "style"
> & {
  /** Applied after the component's own styles, so it overrides them. */
  style?: PartStyles;
};

type StyledPart<Part extends ElementType> = ForwardRefExoticComponent<
  StyledProps<Part> & RefAttributes<ComponentRef<Part>>
>;

/**
 * Gives a React Aria component the library's styles. React Aria marks state
 * with data attributes, so `base` styles a state with a key like
 * `"[data-hovered]"`.
 */
export function styled<Part extends ElementType>(
  Part: Part,
  base: PartStyles,
): StyledPart<Part> {
  const Styled = forwardRef<unknown, { style?: PartStyles }>(
    ({ style, ...props }, ref) => {
      const Base: ElementType = Part;
      return <Base ref={ref} {...props} {...stylex.props(base, style)} />;
    },
  );
  return Styled as StyledPart<Part>;
}
