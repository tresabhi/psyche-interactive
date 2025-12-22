import { Box } from "@radix-ui/themes";
import { Html, Scroll } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { times } from "lodash-es";
import { LaunchSequenceVideo } from "../LaunchSequenceVideo";
import "./index.css";

export const SEQUENCE_SIZE = 4;

export function LaunchSequence() {
  const viewport = useThree((state) => state.viewport);

  return (
    <Scroll>
      <Html position={[0, -2 * viewport.height, 0]} center>
        <Box
          position="relative"
          width="100vw"
          height="100vh"
          style={{ background: "#00000080", width: "100vw", height: "100vh" }}
        >
          {times(SEQUENCE_SIZE).map((i) => (
            <LaunchSequenceVideo key={i} index={i} />
          ))}
        </Box>
      </Html>
    </Scroll>
  );
}
