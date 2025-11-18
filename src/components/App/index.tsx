import { Theme } from "@radix-ui/themes";
import { Sandbox } from "../Sandbox";
import "./index.css";

export function App() {
  return (
    <Theme appearance="dark" style={{ width: "100vw", height: "100vh" }}>
      <Sandbox />
    </Theme>
  );
}
