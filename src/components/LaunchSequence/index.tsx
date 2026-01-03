import { Box, Heading } from "@radix-ui/themes";
import { Scroll } from "@react-three/drei";
import { times } from "lodash-es";
import { LaunchSequenceVideo } from "../LaunchSequenceVideo";
import "./index.css";

export const SEQUENCE_SIZE = 4;

export function LaunchSequence() {
  return (
    <Scroll html>
      <Box position="absolute" top="0">
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
      </Box>

      <Box
        position="absolute"
        top="150vh"
        width="100vw"
        height="100vh"
        style={{ background: "#00000080", width: "100vw", height: "100vh" }}
      >
        {times(SEQUENCE_SIZE).map((i) => (
          <LaunchSequenceVideo key={i} index={i} />
        ))}
      </Box>
    </Scroll>
  );
}
