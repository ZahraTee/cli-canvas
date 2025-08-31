import { useCurrentEditor } from "@tiptap/react";
import React, { useState } from "react";
import {
  ANSI_COLOR_DEFAULTS,
  getBgColorClassName,
  getColorCssVar,
  getFgColorClassName,
  type AnsiColor,
} from "../lib/ansi-colors";

export function SidePanel({
  onClickResetContent,
}: {
  onClickResetContent: () => void;
}) {
  const { editor } = useCurrentEditor();

  const [ansiColorMappings, setAnsiColorMappings] =
    useState(ANSI_COLOR_DEFAULTS);

  return (
    <menu className="flex flex-col w-120 h-full p-10 border-l border-l-gray-700 items-center">
      <div className="flex-1">
        <h3 className="font-medium mb-2">Formatting</h3>
        <div className="flex gap-2 mb-10">
          <button
            className="btn btn-neutral"
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            Bold
          </button>
          <button
            className="btn btn-neutral"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            Underline
          </button>
        </div>

        <h3 className="font-medium mb-2">Colors</h3>
        <div className="grid grid-cols-4 gap-1 items-center">
          {Object.entries(ansiColorMappings).map(([color, value]) => (
            <React.Fragment key={color}>
              <span>{color}</span>
              <input
                type="color"
                value={value}
                onChange={(e) => {
                  setAnsiColorMappings((prev) => ({
                    ...prev,
                    [color]: e.target.value,
                  }));
                  document.documentElement.style.setProperty(
                    getColorCssVar(color as AnsiColor),
                    e.target.value,
                  );
                }}
              />
              <button
                className="btn btn-neutral"
                onClick={() => {
                  editor
                    ?.chain()
                    .focus()
                    .setSpanClass(getFgColorClassName(color as AnsiColor))
                    .run();
                }}
              >
                FG
              </button>
              <button
                className="btn btn-neutral"
                onClick={() => {
                  editor
                    ?.chain()
                    .focus()
                    .setSpanClass(getBgColorClassName(color as AnsiColor))
                    .run();
                }}
              >
                BG
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex-0 mt-4">
        <button className="btn btn-error" onClick={onClickResetContent}>
          Reset content to default
        </button>
      </div>
    </menu>
  );
}
