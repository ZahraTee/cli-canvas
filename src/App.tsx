import { useCallback, useEffect, useRef } from "react";
import "./styles.css";
import { Toolbar } from "./components/Toolbar";
import { TerminalCanvas } from "./components/TerminalCanvas";
import { SidePanel } from "./components/SidePanel";

const DEFAULT_CONTENT = `
  *=========================================*
  │                                         │
  │        ~ Welcome to CliCanvas ~         │
  │                                         │
  │      Right now you can't do much,       │
  |      but you can edit this text!        │
  │                                         │
  *=========================================*
  `;

export default function App() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const setContent = useCallback(
    (content: string) => {
      if (!canvasRef.current) {
        return;
      }

      canvasRef.current.innerHTML = content
        .split("\n")
        .map((c) => `<pre><code>${c}</code></pre>`)
        .join("");
    },
    [canvasRef],
  );

  const resetContentToDefault = useCallback(() => {
    setContent(DEFAULT_CONTENT);
  }, [setContent]);

  useEffect(resetContentToDefault, [resetContentToDefault]);

  return (
    <main className="flex flex-col column w-full h-full items-center font-mono">
      <Toolbar />
      <section className="flex h-full w-full flex-1 items-center gap-10">
        <TerminalCanvas ref={canvasRef} />
        <SidePanel onClickResetContent={resetContentToDefault} />
      </section>
    </main>
  );
}
