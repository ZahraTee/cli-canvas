import { EditorContent, useCurrentEditor } from "@tiptap/react";
import React from "react";
import { BACKGROUND_COLOR_CSS_VAR } from "../lib/color";

export const TerminalCanvas = React.forwardRef<HTMLDivElement>(
  function TerminalCanvas(_, canvasRef) {
    const { editor } = useCurrentEditor();

    return (
      <>
        <div
          className="terminal mockup-code w-full min-w-50 min-h-100 m-10 p-2 overflow-hidden"
          style={{ backgroundColor: `var(${BACKGROUND_COLOR_CSS_VAR})` }}
        >
          <EditorContent
            ref={canvasRef}
            className="canvas min-w-lg caret-accent"
            editor={editor}
          />
        </div>
      </>
    );
  },
);
