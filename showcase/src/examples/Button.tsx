import { type SVGAttributes } from "react";
import * as stylex from "@stylexjs/stylex";
import { Button, ButtonIcon } from "../../../src";

const variants = ["primary", "outline", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

export default function ButtonExample() {
  return (
    <div {...stylex.props(styles.stack)}>
      {sizes.map((size) => (
        <div key={size} {...stylex.props(styles.row)}>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} size={size}>
              {variant} {size}
            </Button>
          ))}
        </div>
      ))}
      <div {...stylex.props(styles.row)}>
        <Button size="lg">
          <ButtonIcon icon={ArrowDown} />
          With an icon
        </Button>
        <Button variant="ghost" size="lg">
          Hover to nudge
          <ButtonIcon icon={ArrowDown} nudge />
        </Button>
        <Button variant="outline" size="lg" to="/events">
          Router link
        </Button>
        <Button
          variant="outline"
          size="lg"
          href="https://swecc.org"
          target="_blank"
        >
          External link
        </Button>
      </div>
    </div>
  );
}

function ArrowDown(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

const styles = stylex.create({
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "1rem",
  },
});
