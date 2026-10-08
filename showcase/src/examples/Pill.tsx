import * as stylex from "@stylexjs/stylex";
import { Pill } from "../../../src";

export default function PillExample() {
  return (
    <ul {...stylex.props(styles.list)}>
      <Pill as="li">react</Pill>
      <Pill as="li">typescript</Pill>
      <Pill as="li">stylex</Pill>
    </ul>
  );
}

const styles = stylex.create({
  list: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
});
