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
 * Styles for a Base UI part. Unlike `StyleXStyles`, this type accepts a style
 * that keys a value on a data attribute, such as `"[data-open]"`. StyleX
 * compiles those keys, but `StyleXStyles` rejects the styles that use them.
 */
export type PartStyles = StyleXArray<
  | CompiledStyles
  | Readonly<[CompiledStyles, InlineStyles]>
  | boolean
  | null
  | undefined
>;

/** The props of a Base UI part, with `style` taking StyleX styles. */
export type StyledProps<Part extends ElementType> = Omit<
  ComponentPropsWithoutRef<Part>,
  "className" | "style"
> & {
  /** Applied after the part's own styles, so it overrides them. */
  style?: PartStyles;
};

type StyledPart<Part extends ElementType> = ForwardRefExoticComponent<
  StyledProps<Part> & RefAttributes<ComponentRef<Part>>
>;

/**
 * Gives a Base UI part the library's styles. Base UI marks state with data
 * attributes, so `base` styles a state with a key like `"[data-open]"`.
 */
export function styled<Part extends ElementType>(
  Part: Part,
  base: PartStyles,
): StyledPart<Part> {
  // `forwardRef` keeps `ref` working on React 18, where Base UI's `render`
  // prop needs it to compose one part into another.
  const Styled = forwardRef<unknown, { style?: PartStyles }>(
    ({ style, ...props }, ref) => {
      const Base: ElementType = Part;
      return <Base ref={ref} {...props} {...stylex.props(base, style)} />;
    },
  );
  return Styled as StyledPart<Part>;
}
