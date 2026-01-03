import { Heading, Text } from "@radix-ui/themes";
import { Gltf, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group, Mesh } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { smooth } from "../util/smooth";
import { Info } from "./Info";

export function PsycheSat() {
  const wrapper = useRef<Group>(null);
  const laser = useRef<Mesh>(null);
  const scroll = useScroll();
  const [show, setShow] = useState(false);

  useFrame(({ camera }) => {
    if (!wrapper.current || !laser.current) return;

    const t = smooth(scroll.range(2 / scroll.pages, 2 / scroll.pages));

    wrapper.current.position.set(300 * (1 - t), -80 * (1 - t), 40);
    wrapper.current.rotation.set(
      lerp(degToRad(-30), degToRad(-10), t),
      lerp(degToRad(0), degToRad(190), t),
      degToRad(100)
    );

    const t2 = smooth(scroll.range(5 / scroll.pages, 1 / scroll.pages));

    setShow(t === 1 && t2 === 0);

    if (t2 > 0) {
      camera.rotation.set(0, lerp(-Math.PI, -2 * Math.PI, t2), 0);
      camera.position.set(lerp(0, 50, t2), 0, 5);
      camera.zoom = lerp(3, 2, t2);
      camera.updateProjectionMatrix();

      laser.current.position.set(0, 0, lerp(-1, 100, t2));
      laser.current.scale.set(1, 1, lerp(1, 10, t2));
    }
  });

  return (
    <group ref={wrapper}>
      <group position={[2.5, -0.125, -2]} rotation={[0, degToRad(30), 0]}>
        <mesh ref={laser} position={[0, 0, -1]}>
          <boxGeometry args={[2 ** -3, 2 ** -3]} />
          <meshBasicMaterial />
        </mesh>
      </group>

      <Info position={[-1, -1.25, 4.5]} show={show}>
        <Heading>Gamma-Ray and Neutron Spectrometers</Heading>

        <Text>
          Psyche's gamma-ray and neutron spectrometer will “listen” to the
          asteroid's surface. Cosmic rays and high-energy particles hit Psyche,
          and the elements there respond by releasing neutrons and gamma rays at
          different energy levels. By measuring these emissions, scientists can
          figure out which elements make up the asteroid.
        </Text>
      </Info>

      <Info position={[1, 0, 3]} show={show}>
        <Heading>X-Band High Gain Antenna</Heading>

        <Text>
          Psyche communicates with Earth using an X-band high-gain antenna, a
          dish that sends and receives data over long distances with precision.
          It allows the spacecraft to beam back science and engineering
          information at high speeds, even from deep space, where signals are
          faint and spread out. Without it, Psyche would struggle to maintain a
          strong connection, like trying to talk on a cell phone from the middle
          of the desert.
        </Text>
      </Info>

      <Info position={[3, -0.25, -1.5]} show={show}>
        <Heading>DSOC</Heading>

        <Text>
          Attached to Psyche is NASA's DSOC, a tech demo testing laser-based
          communications across deep space. Using a near-infrared laser, it's
          designed to send data much faster than current radio systems, 10 to
          100 times faster, without needing bigger, heavier, or more
          power-hungry hardware.
        </Text>

        <Text>
          While DSOC won't carry Psyche's science data during the mission it's a
          proof of concept, demonstrated using a cute cat video.
        </Text>
      </Info>

      <Info position={[1, 12.5, 0]} show={show}>
        <Heading>Solar Panels</Heading>

        <Text>
          Psyche, the spacecraft, is powered by 10 solar panels, producing 21
          kilowatts near Earth, but dropping down to a minimum of 2.3 kilowatts
          when further away from the sun, near the asteroid.
        </Text>

        <Text>
          That's a 9x reduction, going from being able to power about eight
          average American houses simultaneously down to just one home.
        </Text>
      </Info>

      <Info hint position={[-1.75, 2, 4.5]} show={show}>
        <Heading>Magnetometer</Heading>

        <Text>
          The orbiter's magnetometer will search for signs of an ancient
          magnetic field on Psyche. Unlike planets like Earth, whose liquid
          metal cores generate magnetic fields, asteroids are frozen and don't
          create one. Finding leftover magnetism on Psyche would strongly
          suggest it came from the core of a once-formed planetary body.
        </Text>
      </Info>

      <Gltf src={`${import.meta.env.BASE_URL}models/psyche-sat.glb`} />
    </group>
  );
}
