import * as stylex from "@stylexjs/stylex";
import { MemoryRouter } from "react-router";
import {
  Accent,
  Accordion,
  Band,
  Button,
  Container,
  Dialog,
  DisplayTitle,
  Eyebrow,
  Heading,
  Lede,
  NavLink,
  Photo,
  Pill,
  REVEAL_STEP_MS,
  SkipLink,
  TerminalWindow,
  Text,
  reveal,
  typeStyles,
  useReveal,
} from "@swecc/ui";
import { revealMarker } from "@swecc/ui/markers.stylex";
import { colors, media, radii } from "@swecc/ui/tokens.stylex";

export const STAGGER_MS = REVEAL_STEP_MS * 2;

export function App() {
  const scope = useReveal<HTMLElement>();
  return (
    <MemoryRouter>
      <SkipLink href="#main">Skip to content</SkipLink>
      <NavLink to="/" style={styles.link} activeStyle={styles.active}>
        Home
      </NavLink>
      <Band tone="grey" reveal={scope}>
        <Container gutter>
          <Eyebrow path="fixture" style={[reveal.item, reveal.order(0)]} />
          <DisplayTitle>
            A <Accent>consumer</Accent>
          </DisplayTitle>
          <Lede>Renders every export of the library.</Lede>
          <Heading level={2} style={typeStyles.display}>
            Heading
          </Heading>
          <Text>Text</Text>
          <Pill>pill</Pill>
          <Photo src="/photo.webp" alt="" revealOrder={1} />
          <TerminalWindow>~</TerminalWindow>
          <Button variant="outline" size="lg" to="/next" style={styles.cta}>
            Next
          </Button>
          <Accordion.Root defaultValue={["dues"]}>
            <Accordion.Item value="dues">
              <Accordion.Trigger>Dues</Accordion.Trigger>
              <Accordion.Panel style={styles.panel}>None.</Accordion.Panel>
            </Accordion.Item>
          </Accordion.Root>
          <Dialog.Root>
            <Dialog.Trigger render={<Button variant="ghost" />}>
              Open
            </Dialog.Trigger>
            <Dialog.Popup>
              <Dialog.Title>Title</Dialog.Title>
              <Dialog.Description>Description</Dialog.Description>
              <Dialog.Close>Close</Dialog.Close>
            </Dialog.Popup>
          </Dialog.Root>
          <div {...stylex.props(styles.marked, revealMarker)} />
        </Container>
      </Band>
    </MemoryRouter>
  );
}

const styles = stylex.create({
  link: { color: colors.textMuted },
  active: { color: colors.primary },
  cta: { width: { default: "20rem", [media.max768]: "100%" } },
  panel: { color: { default: colors.textMuted, "[data-open]": colors.text } },
  marked: { borderRadius: radii.lg, backgroundColor: colors.surfaceRaised },
});
