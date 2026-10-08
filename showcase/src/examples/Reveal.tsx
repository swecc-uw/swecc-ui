import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import {
  Accent,
  Band,
  Button,
  DisplayTitle,
  Eyebrow,
  Lede,
  reveal,
  useReveal,
} from "../../../src";

export default function RevealExample() {
  const [run, setRun] = useState(0);
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setRun(run + 1)}>
        Replay
      </Button>
      <Revealed key={run} />
    </>
  );
}

function Revealed() {
  const scope = useReveal<HTMLElement>();
  return (
    <Band tone="grey" reveal={scope} style={styles.band}>
      <Eyebrow path="reveal" style={[reveal.item, reveal.order(0)]} />
      <DisplayTitle style={[reveal.item, reveal.order(1)]}>
        Fades up <Accent>in order</Accent>
      </DisplayTitle>
      <Lede style={[reveal.item, reveal.order(2)]}>
        Each item waits for the one before it. With reduced motion turned on,
        nothing animates.
      </Lede>
    </Band>
  );
}

const styles = stylex.create({
  band: {
    marginTop: "1rem",
    padding: "2rem",
  },
});
