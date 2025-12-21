import { Heading } from "@radix-ui/themes";
import { Html, Scroll } from "@react-three/drei";

export function Title() {
  return (
    <Scroll>
      <Html center>
        <Heading
          style={{ letterSpacing: "-2px" }}
          size="9"
          wrap="nowrap"
          mb="50vh"
        >
          PSYCHE INTERACTIVE
        </Heading>
      </Html>
    </Scroll>
  );
}
