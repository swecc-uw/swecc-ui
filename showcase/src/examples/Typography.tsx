import * as stylex from "@stylexjs/stylex";
import { Heading, Text, typeStyles } from "../../../src";

const sizes = [1, 2, 3, 4, 5, 6] as const;

export default function TypographyExample() {
  return (
    <>
      {sizes.map((size) => (
        <Heading key={size} level={3} size={size}>
          Heading size {size}
        </Heading>
      ))}
      <Text>Text is a paragraph with the body defaults.</Text>
      <p {...stylex.props(typeStyles.hero)}>
        typeStyles.hero{" "}
        <span {...stylex.props(typeStyles.heroAccent)}>with heroAccent</span>
      </p>
      <Heading level={3} style={typeStyles.display}>
        typeStyles.display
      </Heading>
      <Text style={typeStyles.mono}>typeStyles.mono</Text>
    </>
  );
}
