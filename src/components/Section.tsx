import { Flex, type FlexProps } from "@radix-ui/themes";

export function Section({ style, ...props }: FlexProps) {
  return (
    <Flex
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
      direction="column"
      {...props}
    ></Flex>
  );
}
