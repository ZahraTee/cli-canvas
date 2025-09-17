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
      <div className="overflow-y-auto w-full min-w-50 p-12">
        <div
          className="terminal rounded-lg"
          style={{
            backgroundColor: `var(${BACKGROUND_COLOR_CSS_VAR})`,
            color: `var(${FOREGROUND_COLOR_CSS_VAR})`,
          }}
        >
          <TerminalChrome />
          <div className="min-h-100 relative rounded-b-lg border-x border-b border-stone-400 dark:border-stone-800 shadow-lg">
            <EditorContent
              ref={canvasRef}
              className="w-full p-2"
              editor={editor}
            />
          </div>
        </div>
      </div>
    );
  },
);

const TerminalChrome = () => {
  return (
    <div className="relative top-[-0rem] w-full flex items-center justify-center h-[28px] rounded-t-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800">
      <div className="absolute left-2 flex gap-2">
        <div className="size-[14px] border border-stone-200 dark:border-stone-800 rounded-4xl bg-red-400" />
        <div className="size-[14px] border border-stone-200 dark:border-stone-800 rounded-4xl bg-amber-300" />
        <div className="size-[14px] border border-stone-200 dark:border-stone-800 rounded-4xl bg-green-500" />
      </div>
      <div className="w-full flex justify-center">
        <input
          defaultValue="mocli"
          className="font-sans text-stone-600 dark:text-stone-300 text-sm font-semibold text-center w-[calc(100%-148px)]"
        />
      </div>
    </div>
  );
};
