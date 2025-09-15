import { EditorContent, useCurrentEditor } from "@tiptap/react";
import React from "react";
import {
  BACKGROUND_COLOR_CSS_VAR,
  FOREGROUND_COLOR_CSS_VAR,
} from "../lib/color";

export const TerminalCanvas = React.forwardRef<HTMLDivElement>(
  function TerminalCanvas(_, canvasRef) {
    const { editor } = useCurrentEditor();

    return (
      <div className="overflow-y-auto w-full min-w-50 min-h-100 p-12">
        <div
          className="terminal rounded-md"
          style={{
            backgroundColor: `var(${BACKGROUND_COLOR_CSS_VAR})`,
            color: `var(${FOREGROUND_COLOR_CSS_VAR})`,
          }}
        >
          <div className="rounded-md" />
          <EditorContent
            ref={canvasRef}
            className="canvas w-full caret-accent"
            editor={editor}
          />
        </div>
      </div>
    );
  },
);
