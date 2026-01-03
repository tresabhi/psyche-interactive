import { Card, Flex, Text } from "@radix-ui/themes";
import { Html } from "@react-three/drei";
import type { HtmlProps } from "@react-three/drei/web/Html";
import { useEffect, useState } from "react";
import "./index.css";

interface Props extends HtmlProps {
  show: boolean;
  hint?: boolean;
}

export function Info({ children, show, hint = false, ...props }: Props) {
  const [visible, setVisible] = useState(false);
  const [showHint, setShowHint] = useState(hint);

  useEffect(() => {
    function handlePointerDown() {
      if (!visible) return;
      setVisible(false);
    }

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [visible]);

  return (
    <Html
      zIndexRange={[32, 0]}
      portal={{ current: document.getElementById("app")! }}
      {...props}
    >
      <Flex gap="4" className="info" data-show={show}>
        <Flex
          data-animate={!visible}
          flexShrink="0"
          onPointerDown={() => {
            setVisible(true);
            setShowHint(false);
          }}
          align="center"
          justify="center"
          className="info-clicker"
        />
        {visible && (
          <Card
            style={{ zIndex: 64 }}
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
          >
            <Flex width="min(25vw, 28rem)" gap="2" direction="column">
              {children}
            </Flex>
          </Card>
        )}

        {showHint && (
          <Text
            wrap="nowrap"
            style={{ userSelect: "none", pointerEvents: "none" }}
          >
            ← Click me to learn more!
          </Text>
        )}
      </Flex>
    </Html>
  );
}
