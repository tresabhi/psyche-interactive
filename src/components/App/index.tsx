import { Flex, Theme } from "@radix-ui/themes";
import { SectionIntro } from "../SectionIntro";
import "./index.css";

export function App() {
  return (
    <Theme appearance="dark" style={{ width: "100vw", height: "100vh" }}>
      <Flex direction="column">
        <SectionIntro />
      </Flex>
    </Theme>
  );
}
