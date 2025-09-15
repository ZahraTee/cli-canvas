import { EditorContext, useEditor } from "@tiptap/react";
import domToImage from "dom-to-image";
import { useEffect, useMemo, useRef } from "react";
import { SidePanel } from "./components/SidePanel";
import { TerminalCanvas } from "./components/TerminalCanvas";
import { ThemeProvider } from "./components/ThemeProvider";
import { Toolbar } from "./components/Toolbar";
import { initializeColorVariables } from "./lib/color";
import { DEFAULT_CONTENT, textToEditorContent } from "./lib/tiptap/content";
import { extensions } from "./lib/tiptap/extensions";
import "./styles.css";

export default function App() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(initializeColorVariables, []);

  const editor = useEditor({
    extensions,
    content: textToEditorContent(DEFAULT_CONTENT),
  });

  const editorContext = useMemo(() => ({ editor }), [editor]);

  const resetEditorContent = () => {
    editor.commands.setContent(textToEditorContent(DEFAULT_CONTENT));
  };

  const onClickDownload = async () => {
    const terminalNode = canvasRef.current?.parentNode;

    if (!terminalNode) {
      return;
    }

    const dataUrl = await domToImage.toPng(terminalNode);
    const downloadLink = document.createElement("a");
    downloadLink.download = "cli-canvas.png";
    downloadLink.href = dataUrl;
    downloadLink.click();
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="mocli:ui-theme">
      <EditorContext.Provider value={editorContext}>
        <main className="flex flex-col column w-full h-full items-center font-mono">
          <Toolbar onClickDownload={onClickDownload} />
          <section className="flex h-full w-full flex-1 overflow-hidden">
            <TerminalCanvas ref={canvasRef} />
            <SidePanel onClickResetContent={resetEditorContent} />
          </section>
        </main>
      </EditorContext.Provider>
    </ThemeProvider>
  );
}
