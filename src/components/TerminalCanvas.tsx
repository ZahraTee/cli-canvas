import { EditorContent, useCurrentEditor } from "@tiptap/react";
import { Resizable } from "re-resizable";
import React from "react";

export const TerminalCanvas = React.forwardRef<HTMLDivElement>(
  function TerminalCanvas(_, canvasRef) {
    const { editor } = useCurrentEditor();

    return (
      <div className="w-full p-12 flex justify-center items-center overflow-auto">
        <Resizable
          className="rounded-lg shadow-lg"
          defaultSize={{
            width: 700,
          }}
        >
          <div
            id="terminal"
            className="bg-terminal-bg text-terminal-fg flex flex-col max-h-full rounded-lg outline outline-stone-300 dark:outline-stone-700"
          >
            <TerminalChrome />
            <EditorContent
              ref={canvasRef}
              className="overflow-auto w-full flex-1 p-1"
              editor={editor}
            />
          </div>
        </Resizable>
      </div>
    );
  },
);

const TerminalChrome = () => {
  return (
    <div className="relative w-full flex items-center justify-center h-[28px] rounded-t-lg bg-stone-100 dark:bg-stone-800 border-b border-stone-300 dark:border-stone-950">
      <div className="absolute left-2 flex gap-2">
        <div className="size-[14px] border border-stone-300 dark:border-stone-800 rounded-4xl bg-red-400" />
        <div className="size-[14px] border border-stone-300 dark:border-stone-800 rounded-4xl bg-amber-300" />
        <div className="size-[14px] border border-stone-300 dark:border-stone-800 rounded-4xl bg-green-500" />
      </div>
      <div className="w-full flex justify-center">
        <input
          defaultValue="mo_cli"
          className="font-sans text-stone-600 dark:text-stone-300 text-sm font-semibold text-center w-[calc(100%-148px)]"
        />
      </div>
    </div>
  );
};
