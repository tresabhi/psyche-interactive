import { Flex, Progress } from "@radix-ui/themes";
import { useProgress } from "@react-three/drei";
import { useRef } from "react";

export function AppLoader() {
  const { progress: _progress } = useProgress();
  const progress = useRef(_progress);

  if (_progress > progress.current) progress.current = _progress;

  return (
    <Flex width="100vw" height="100dvh" justify="center" align="center" px="5">
      <Progress value={progress.current} style={{ maxWidth: "8rem" }} />
    </Flex>
  );
}
