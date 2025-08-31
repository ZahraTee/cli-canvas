import { EditorContent, useCurrentEditor } from "@tiptap/react";
import React from "react";

export const TerminalCanvas = React.forwardRef<HTMLDivElement>(
  function TerminalCanvas(_, canvasRef) {
    const { editor } = useCurrentEditor();

    return (
      <>
        <div className="mockup-code w-full min-w-200 min-h-100 m-10 overflow-hidden">
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
