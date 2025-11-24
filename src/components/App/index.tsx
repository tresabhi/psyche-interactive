import { Theme } from "@radix-ui/themes";
import { useEffect } from "react";
import { clamp } from "three/src/math/MathUtils.js";
import { progressEvent } from "../Progress";
import { Sections } from "../Sections";
import "./index.css";

export function App() {
  useEffect(() => {
    window.addEventListener("wheel", (event) => {
      progressEvent.dispatch(
        clamp(progressEvent.last! + event.deltaY / window.innerHeight, 0, 1)
      );
    });
  }, []);

  return (
    <Theme
      appearance="dark"
      style={{ width: "100vw", height: "100vh", background: "black" }}
    >
      <Sections />
    </Theme>
  );
}
