import { Flex, Heading, Text } from "@radix-ui/themes";
import { Scroll } from "@react-three/drei";
import { times } from "lodash-es";
import { Drawer } from "../Drawer";
import { LaunchSequenceVideo } from "../LaunchSequenceVideo";
import "./index.css";

export const SEQUENCE_SIZE = 4;

export function Scroller() {
  return (
    <Scroll html>
      <Flex
        position="absolute"
        top="0"
        direction="column"
        align="center"
        width="100vw"
        gap="2vw"
      >
        <Heading
          style={{
            letterSpacing: "-2px",
            fontSize: "7vw",
          }}
          mt="10vw"
          wrap="nowrap"
        >
          PSYCHE INTERACTIVE
        </Heading>
        <Text color="gray">SCROLL TO BEGIN</Text>
      </Flex>

      <Flex
        justify="center"
        position="absolute"
        top="150dvh"
        width="100vw"
        height="100dvh"
        style={{ background: "#00000080", width: "100vw", height: "100dvh" }}
      >
        <Heading mt="9">Cape Canaveral Launch, Florida, 2023</Heading>

        {times(SEQUENCE_SIZE).map((i) => (
          <LaunchSequenceVideo key={i} index={i} />
        ))}
      </Flex>

      <Flex
        position="absolute"
        top="900dvh"
        width="100vw"
        height="70dvh"
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
        top="1000dvh"
        width="100vw"
        height="70dvh"
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
          MAYBE YOU DO!
        </Heading>
      </Flex>

      <Flex
        position="absolute"
        top="1100dvh"
        width="100vw"
        height="100dvh"
        align="center"
        justify="center"
      >
        <Drawer />
      </Flex>
    </Scroll>
  );
}
