import * as stylex from "@stylexjs/stylex";
import { Band, Container, Text } from "../../../src";

export default function LayoutExample() {
  return (
    <>
      <Band tone="grey" style={styles.band}>
        <Container gutter>
          <Text>A grey Band. Its Container adds the page gutter.</Text>
        </Container>
      </Band>
      <Band tone="black" style={styles.band}>
        <Container>
          <Text>A black Band. Its Container has no gutter.</Text>
        </Container>
      </Band>
    </>
  );
}

const styles = stylex.create({
  band: {
    paddingBlock: "2rem",
  },
});
