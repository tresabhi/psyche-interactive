import { Heading } from "@radix-ui/themes";
import { Section } from "./Section";

export function SectionIntro() {
  return (
    <Section align="center" justify="center">
      <Heading
        style={{
          fontStretch: "ultra-expanded",
          fontWeight: 900,
          fontSize: "5vw",
          whiteSpace: "nowrap",
        }}
      >
        PSYCHE INTERACTIVE
      </Heading>
    </Section>
  );
}
