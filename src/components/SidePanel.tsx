import { useCurrentEditor } from "@tiptap/react";
import React from "react";
import {
  BACKGROUND_COLOR_CSS_VAR,
  getColorCssVar,
  type AnsiColor,
  getAnsiColorLabel,
} from "../lib/color";
import { type AnsiColorVariant } from "../lib/themes";
import { useTheme } from "../stores/theme";

export function SidePanel({
  onClickResetContent,
}: {
  onClickResetContent: () => void;
}) {
  return (
    <menu className="flex flex-col items-center w-[400px] min-w-[280px] px-3 py-6 overflow-y-auto border-l border-l-gray-700">
      <div className="flex-1 flex flex-col gap-4">
        <FormattingSection />
        <ColorSection variant="standard" />
      </div>
      <div className="flex flex-0 mt-4 gap-2">
        <button className="btn btn-sm btn-error" onClick={onClickResetContent}>
          Reset to default
        </button>
      </div>
    </menu>
  );
}

function FormattingSection() {
  const { editor } = useCurrentEditor();
  return (
    <Section title="Text Formatting">
      <div className="flex gap-2">
        <button
          className="btn btn-sm btn-neutral"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          className="btn btn-sm btn-neutral"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          Underline
        </button>
      </div>
    </Section>
  );
}

function ColorSection({ variant }: { variant: AnsiColorVariant }) {
  const { editor } = useCurrentEditor();
  const {
    theme: { colors },
    setBackgroundColor,
    setAnsiColor,
  } = useTheme();
  const ansiColorMappings = colors[variant];
  return (
    <Section title="Colors">
      <div className="flex justify-between mb-3 items-center">
        <span className="text-sm">Background</span>
        <input
          type="color"
          value={colors.background}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
            document.documentElement.style.setProperty(
              BACKGROUND_COLOR_CSS_VAR,
              e.target.value,
            );
          }}
        />
      </div>
      <div className="grid grid-cols-[auto_auto_1fr] gap-y-2 gap-x-5 items-center">
        {Object.entries(ansiColorMappings).map(([color, value]) => (
          <React.Fragment key={color}>
            <span className="text-sm text-gray-200">
              {getAnsiColorLabel(color as AnsiColor)}
            </span>
            <input
              type="color"
              value={value}
              onChange={(e) => {
                setAnsiColor(
                  color as AnsiColor,
                  variant,
                  e.target.value as string,
                );
                document.documentElement.style.setProperty(
                  getColorCssVar(color as AnsiColor),
                  e.target.value,
                );
              }}
            />
            <div className="flex gap-1">
              <button
                className="btn btn-sm btn-neutral"
                onClick={() => {
                  editor
                    ?.chain()
                    .focus()
                    .toggleFgColor(color as AnsiColor)
                    .run();
                }}
              >
                FG
              </button>
              <button
                className="btn btn-sm btn-neutral"
                onClick={() => {
                  editor
                    ?.chain()
                    .focus()
                    .toggleBgColor(color as AnsiColor)
                    .run();
                }}
              >
                BG
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </Section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <h3 className="mb-3 text-xs uppercase tracking-widest text-teal-400">
          {title}
        </h3>
        <div>{children}</div>
      </div>
      <hr className="text-gray-700" />
    </>
  );
}
