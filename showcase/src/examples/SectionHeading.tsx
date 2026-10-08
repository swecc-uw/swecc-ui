import { Accent, DisplayTitle, Eyebrow, Lede } from "../../../src";

export default function SectionHeadingExample() {
  return (
    <>
      <Eyebrow path="programs" />
      <DisplayTitle>
        Learn by <Accent>building</Accent>
      </DisplayTitle>
      <Lede>
        Mock interviews, project teams, and workshops, run by students for
        students.
      </Lede>
    </>
  );
}
