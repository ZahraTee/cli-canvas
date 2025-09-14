import { useCurrentEditor } from "@tiptap/react";
import React from "react";
import {
  type AnsiColor,
  getAnsiColorLabel,
  type AnsiColorVariant,
} from "../lib/color";
import { useTheme } from "../stores/theme";
import { PRESET_THEMES, type PresetThemeName } from "../lib/themes";

export function SidePanel({
  onClickResetContent,
}: {
  onClickResetContent: () => void;
}) {
  return (
    <menu className="flex flex-col items-center w-[400px] min-w-[280px] px-3 py-6 overflow-y-auto border-l border-l-gray-700">
      <div className="flex-1 flex flex-col gap-4">
        <FormattingSection />
        <ThemeSection />
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
    <Section title="Text Formatting" border>
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

function ThemeSection() {
  const {
    theme: { colors },
    selectedTheme,
    selectTheme,
    setBackgroundColor,
    setForegroundColor,
  } = useTheme();
  return (
    <Section>
      <select
        value={selectedTheme}
        onChange={(e) =>
          selectTheme(e.target.value as PresetThemeName | "Custom")
        }
        className="select"
      >
        {Object.keys(PRESET_THEMES)
          .concat("Custom")
          .map((name) => (
            <option key={name}>{name}</option>
          ))}
      </select>
      <div className="flex justify-between items-center">
        <span className="text-sm">Background</span>
        <input
          type="color"
          value={colors.background}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">Foreground</span>
        <input
          type="color"
          value={colors.foreground}
          onChange={(e) => {
            setForegroundColor(e.target.value);
          }}
        />
      </div>
      <Section border>
        <ColorVariantControls variant="standard" />
        <ColorVariantControls variant="intense" />
      </Section>
    </Section>
  );
}

function ColorVariantControls({ variant }: { variant: AnsiColorVariant }) {
  const { editor } = useCurrentEditor();
  const {
    theme: { colors },
    setAnsiColor,
  } = useTheme();
  const ansiColorMappings = colors[variant];
  return (
    <Section title={`${variant} Colors`}>
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
              }}
            />
            <div className="flex gap-1">
              <button
                className="btn btn-sm btn-neutral"
                onClick={() => {
                  editor
                    ?.chain()
                    .focus()
                    .toggleFgColor(color as AnsiColor, variant)
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
                    .toggleBgColor(color as AnsiColor, variant)
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
  border,
}: {
  title?: string;
  children: React.ReactNode;
  border?: boolean;
}) {
  return (
    <div className={border ? "border-b border-b-gray-600 pb-6" : ""}>
      {title && (
        <h3 className="mb-3 text-xs uppercase tracking-widest text-teal-400">
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}
