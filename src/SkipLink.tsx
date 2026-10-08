import * as stylex from "@stylexjs/stylex";
import { colors, layers, radii } from "./tokens.stylex";

/** Hidden until focused; jumps keyboard users past the navigation. */
export function SkipLink({
  href,
  children,
}: {
  /** Must be a fragment identifier like `#main`. */
  href: `#${string}`;
  children: string;
}) {
  return (
    <a href={href} {...stylex.props(styles.link)}>
      {children}
    </a>
  );
}

const styles = stylex.create({
  link: {
    position: "fixed",
    top: "0.75rem",
    left: "0.75rem",
    zIndex: layers.skipLink,
    padding: "0.75rem 1rem",
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
    color: colors.textOnPrimary,
    fontWeight: 700,
    transform: { default: "translateY(-200%)", ":focus-visible": "none" },
  },
});
