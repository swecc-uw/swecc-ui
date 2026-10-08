import { useRef } from "react";
import * as stylex from "@stylexjs/stylex";
import { TerminalWindow } from "../../../src";

export default function TerminalWindowExample() {
  const bounds = useRef<HTMLDivElement>(null);
  return (
    <div ref={bounds} {...stylex.props(styles.bounds)}>
      <TerminalWindow draggable boundsRef={bounds} style={styles.window}>
        {"$ whoami\nswecc\n$ echo drag me by the title bar"}
      </TerminalWindow>
    </div>
  );
}

const styles = stylex.create({
  bounds: {
    height: "26rem",
  },
  window: {
    maxWidth: "24rem",
  },
});
