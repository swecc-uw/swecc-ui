import * as stylex from "@stylexjs/stylex";
import { Photo } from "../../../src";
import photo from "../photo.svg";

export default function PhotoExample() {
  return (
    <Photo src={photo} alt="A hill under a pale sun" style={styles.frame} />
  );
}

const styles = stylex.create({
  frame: {
    maxWidth: "24rem",
    aspectRatio: "8 / 5",
  },
});
