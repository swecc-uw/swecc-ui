import { type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { Heading } from "../../src";
import { colors, fonts, radii } from "../../src/tokens.stylex";

type ExampleProps = {
  /** The section heading, and the fragment the page navigation links to. */
  name: string;
  /** Printed under the preview; omit for a section with nothing to copy. */
  source?: string;
  children: ReactNode;
};

export function Example({ name, source, children }: ExampleProps) {
  return (
    <section id={name} aria-labelledby={`${name}-title`}>
      <Heading level={2} id={`${name}-title`}>
        {name}
      </Heading>
      <div {...stylex.props(styles.preview)}>{children}</div>
      {source && (
        <details>
          <summary {...stylex.props(styles.summary)}>Code</summary>
          <pre {...stylex.props(styles.code)}>{source}</pre>
        </details>
      )}
    </section>
  );
}

const styles = stylex.create({
  preview: {
    padding: "1.5rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: colors.hairline,
    borderRadius: radii.lg,
  },
  summary: {
    marginTop: "0.75rem",
    fontFamily: fonts.mono,
    fontSize: "0.875rem",
    color: colors.textSubtle,
    cursor: "pointer",
  },
  code: {
    margin: "0.75rem 0 0",
    padding: "1rem 1.25rem",
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    fontFamily: fonts.mono,
    fontSize: "0.8125rem",
    lineHeight: 1.6,
    color: colors.textSoft,
    overflowX: "auto",
  },
});
