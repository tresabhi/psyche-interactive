import { ArrowRightIcon, MobileIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Text } from "@radix-ui/themes";
import "./index.css";

export function Landscape() {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100dvh"
      className="landscape"
      direction="column"
      align="center"
      justify="center"
    >
      <Heading>Please use landscape mode</Heading>
      <Text>Preferably on a PC</Text>

      <Flex mt="4" align="center" gap="2">
        <MobileIcon style={{ width: "2rem", height: "2rem" }} />

        <ArrowRightIcon style={{ width: "2rem", height: "2rem" }} />

        <MobileIcon
          style={{ width: "2rem", height: "2rem", transform: "rotate(-90deg)" }}
        />
      </Flex>
    </Flex>
  );
}
