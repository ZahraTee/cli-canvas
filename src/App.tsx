import { EditorContext, useEditor } from "@tiptap/react";
import { useEffect, useMemo, useRef } from "react";
import { SidePanel } from "./components/SidePanel/SidePanel";
import { SiteThemeProvider } from "./components/SiteThemeProvider";
import { TerminalCanvas } from "./components/TerminalCanvas";
import { Toolbar } from "./components/Toolbar";
import { initializeColorVariables } from "./lib/color";
import { getDefaultContent } from "./lib/content/default";
import { initializeFontVariables } from "./lib/font";
import { extensions } from "./lib/tiptap/extensions";
import "./styles.css";

export default function App() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initializeColorVariables();
    initializeFontVariables();
  }, []);

  const editor = useEditor({
    extensions,
    content: getDefaultContent(),
  });

  const editorContext = useMemo(() => ({ editor }), [editor]);

  const resetEditorContent = () => {
    editor.commands.setContent(getDefaultContent());
  };

  return (
    <SiteThemeProvider defaultTheme="dark" storageKey="mocli:ui-theme">
      <EditorContext.Provider value={editorContext}>
        <main className="flex flex-col column w-full h-full items-center font-mono">
          <Toolbar />
          <section className="flex h-full w-full flex-1 overflow-hidden">
            <TerminalCanvas ref={canvasRef} />
            <SidePanel onClickResetContent={resetEditorContent} />
          </section>
        </main>
      </EditorContext.Provider>
    </SiteThemeProvider>
  );
}
