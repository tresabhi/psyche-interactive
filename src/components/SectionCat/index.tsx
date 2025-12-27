import { Card, Flex, Inset, Text } from "@radix-ui/themes";
import { Gltf, Html, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { smooth } from "../../util/smooth";
import "./index.css";

export function SectionCat() {
  const scroll = useScroll();
  const laser = useRef<Mesh>(null);
  const cat = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!laser.current || !cat.current) return;

    const t = smooth(scroll.range(5 / scroll.pages, 1 / scroll.pages));

    laser.current.position.set(0, 0, lerp(500, 0, t));
    laser.current.scale.set(1, 1, lerp(10, 1, t));

    cat.current.dataset.show = `${t > 0.98}`;
  });

  return (
    <>
      <pointLight decay={0} intensity={4} />

      <group position={[30, -25, -40]} rotation={[degToRad(-60), 0, 0]}>
        <mesh ref={laser}>
          <boxGeometry args={[2 ** -3, 2 ** -3]} />
          <meshBasicMaterial />
        </mesh>

        <Html
          className="cat-html"
          pointerEvents="none"
          occlude={false}
          transform={false}
          portal={{ current: document.getElementById("app")! }}
          style={{ display: "block" }}
          zIndexRange={[10000, 0]}
        >
          <div className="cat-container" ref={cat}>
            <div className="pointer" />
            <Card>
              <Inset>
                <Flex direction="column">
                  <video muted autoPlay loop src="/cat.mp4" />
                  <Flex justify="center" p="4">
                    <Text style={{ pointerEvents: "none" }}>
                      Taters the cat streams to Earth via DSOC at 33MB/s
                    </Text>
                  </Flex>
                </Flex>
              </Inset>
            </Card>
          </div>
        </Html>

        <Gltf scale={5 / 200} src="/models/earth.glb" />
      </group>
    </>
  );
}
