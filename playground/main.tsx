import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router";
import * as stylex from "@stylexjs/stylex";
import "../src/global.css";
import {
  Accordion,
  Button,
  Container,
  Dialog,
  Eyebrow,
  Heading,
  Text,
} from "../src";
import { colors } from "../src/tokens.stylex";

function Section({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section id={name} {...stylex.props(styles.section)}>
      <Eyebrow path={name} />
      {children}
    </section>
  );
}

function Playground() {
  return (
    <Container gutter style={styles.page}>
      <Heading level={1}>@swecc/ui</Heading>

      <Section name="dialog">
        <Dialog.Root>
          <Dialog.Trigger render={<Button variant="outline" />}>
            Open dialog
          </Dialog.Trigger>
          <Dialog.Popup>
            <Dialog.Title>Join the mentorship program</Dialog.Title>
            <Dialog.Description>
              Applications close on Friday. We pair you with an officer for the
              quarter.
            </Dialog.Description>
            <div {...stylex.props(styles.actions)}>
              <Dialog.Close render={<Button variant="ghost" size="sm" />}>
                Cancel
              </Dialog.Close>
              <Dialog.Close render={<Button size="sm" />}>Apply</Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Root>
      </Section>

      <Section name="accordion">
        <Accordion.Root defaultValue={["dues"]} style={styles.narrow}>
          <Accordion.Item value="dues">
            <Accordion.Trigger>Does SWECC charge dues?</Accordion.Trigger>
            <Accordion.Panel>
              <Text>No. Every event is free for UW students.</Text>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="majors">
            <Accordion.Trigger>Do I have to be a CS major?</Accordion.Trigger>
            <Accordion.Panel>
              <Text>No. Any student who wants to build software can join.</Text>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="closed" disabled>
            <Accordion.Trigger>Officer applications</Accordion.Trigger>
            <Accordion.Panel>
              <Text>Closed for this quarter.</Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion.Root>
      </Section>
    </Container>
  );
}

const styles = stylex.create({
  page: {
    paddingBlock: "3rem",
    isolation: "isolate",
  },
  section: {
    paddingBlock: "2rem",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: colors.border,
    marginTop: "2rem",
  },
  narrow: {
    maxWidth: "36rem",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
    marginTop: "1.5rem",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoryRouter>
      <Playground />
    </MemoryRouter>
  </StrictMode>,
);
