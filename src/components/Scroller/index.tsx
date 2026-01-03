import { Box, Flex, Heading } from "@radix-ui/themes";
import { Scroll } from "@react-three/drei";
import { times } from "lodash-es";
import { LaunchSequenceVideo } from "../LaunchSequenceVideo";
import "./index.css";

export const SEQUENCE_SIZE = 4;

export function Scroller() {
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

      <Flex
        position="absolute"
        top="900vh"
        width="100vw"
        height="70vh"
        direction="column"
        align="center"
        justify="center"
        gap="9"
      >
        <Heading
          style={{
            letterSpacing: "-2px",
            fontSize: "4vw",
          }}
        >
          WHAT DOES PSYCHE LOOK LIKE?
        </Heading>

        <Heading
          color="gray"
          style={{
            letterSpacing: "-2px",
            fontSize: "3vw",
          }}
        >
          NO ONE REALLY KNOWS FOR CERTAIN.
        </Heading>
      </Flex>

      <Flex
        position="absolute"
        top="1000vh"
        width="100vw"
        height="70vh"
        direction="column"
        align="center"
        justify="center"
      >
        <Heading
          style={{
            letterSpacing: "-2px",
            fontSize: "4vw",
          }}
        >
          MAKE A GUESS!
        </Heading>
      </Flex>
    </Scroll>
  );
}
