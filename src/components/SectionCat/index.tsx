import { Card, Flex, Inset, Text } from "@radix-ui/themes";
import { Gltf, Html, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3, type Group, type Mesh } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { J_HAT } from "../../util/hats";
import { smooth } from "../../util/smooth";
import "./index.css";

export const earthInitialPosition = new Vector3(30, 0, -40);

export function SectionCat() {
  const scroll = useScroll();
  const laser = useRef<Mesh>(null);
  const wrapper = useRef<Group>(null);
  const earth = useRef<Group>(null);
  const cat = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!laser.current || !cat.current || !wrapper.current || !earth.current)
      return;

    wrapper.current.visible = scroll.visible(
      5.5 / scroll.pages,
      3.5 / scroll.pages
    );

    const t = smooth(scroll.range(5 / scroll.pages, 1 / scroll.pages));

    laser.current.position.set(0, 0, lerp(500, 0, t));
    laser.current.scale.set(1, 1, lerp(10, 1, t));

    cat.current.dataset.show = `${scroll.visible(
      6 / scroll.pages,
      1 / scroll.pages
    )}`;

    const t2 = 2 * smooth(scroll.range(7 / scroll.pages, 2 / scroll.pages));
    const theta = 2 * Math.PI * t2;

    earth.current.position
      .copy(earthInitialPosition)
      .applyAxisAngle(J_HAT, theta);
  });

  return (
    <group ref={wrapper}>
      <pointLight decay={0} intensity={4} />

      <group ref={earth} rotation={[degToRad(-60), 0, 0]}>
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
                  <video
                    muted
                    autoPlay
                    loop
                    src={`${import.meta.env.BASE_URL}cat.mp4`}
                  />
                  <Flex justify="center" p="4">
                    <Text style={{ pointerEvents: "none" }}>
                      Taters the cat streamed to Earth via DSOC at 33MB/s
                    </Text>
                  </Flex>
                </Flex>
              </Inset>
            </Card>
          </div>
        </Html>

        <Gltf
          scale={5 / 200}
          src={`${import.meta.env.BASE_URL}models/earth.glb`}
        />
      </group>
    </group>
  );
}
