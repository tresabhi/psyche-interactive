interface Props {
  size: number;
}

export function Orbit({ size }: Props) {
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size / 2, 2 ** -3, 2, 2 ** 6]} />
        <meshBasicMaterial color="#808080" />
      </mesh>
    </group>
  );
}
