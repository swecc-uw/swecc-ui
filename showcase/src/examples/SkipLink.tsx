import { SkipLink, Text } from "../../../src";

export default function SkipLinkExample() {
  return (
    <>
      <Text>
        Click this sentence, then press Tab. The link appears at the top left of
        the window.
      </Text>
      <SkipLink href="#main">Skip to content</SkipLink>
    </>
  );
}
