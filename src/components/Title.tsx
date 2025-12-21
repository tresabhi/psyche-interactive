import { Heading } from "@radix-ui/themes";
import { Scroll } from "@react-three/drei";

export function Title() {
  return (
    <Scroll html>
      <Heading
        style={{
          letterSpacing: "-2px",
          width: "100vw",
          textAlign: "center",
          fontSize: "7vw",
        }}
        mt="10vw"
        wrap="nowrap"
      >
        PSYCHE INTERACTIVE
      </Heading>
    </Scroll>
  );
}
