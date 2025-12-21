import { smoothstep } from "three/src/math/MathUtils.js";

export function smooth(value: number) {
  return smoothstep(value, 0, 1);
}
