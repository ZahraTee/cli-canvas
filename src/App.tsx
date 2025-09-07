import { useEffect, useMemo, useRef } from "react";
import "./styles.css";
import { Toolbar } from "./components/Toolbar";
import { TerminalCanvas } from "./components/TerminalCanvas";
import { SidePanel } from "./components/SidePanel";
import { EditorContext, useEditor } from "@tiptap/react";
import { extensions } from "./lib/tiptap/extensions";
import { DEFAULT_CONTENT, textToEditorContent } from "./lib/tiptap/content";
import { initializeColorVariables } from "./lib/color";

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

  return (
    <EditorContext.Provider value={editorContext}>
      <main className="flex flex-col column w-full h-full items-center font-mono">
        <Toolbar />
        <section className="flex h-full w-full flex-1 overflow-hidden">
          <TerminalCanvas ref={canvasRef} />
          <SidePanel onClickResetContent={resetEditorContent} />
        </section>
      </main>
    </EditorContext.Provider>
  );
}
