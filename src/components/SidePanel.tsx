import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import React, { useEffect, useRef } from "react";
import {
  getAnsiColorLabel,
  type AnsiColor,
  type AnsiColorVariant,
} from "../lib/color";
import { PRESET_THEMES, type PresetThemeName } from "../lib/themes";
import { useTheme } from "../stores/theme";
import { Bold, Plus, Redo, Underline, Undo } from "lucide-react";
import { Label } from "@/components/ui/label";

export function SidePanel({
  onClickResetContent,
}: {
  onClickResetContent: () => void;
}) {
  return (
    <menu className="flex flex-col items-center w-[400px] min-w-[280px] px-3 py-6 overflow-y-auto border-l border-l-gray-200 dark:border-l-gray-800">
      <div className="w-full flex-1 flex flex-col gap-4 px-3">
        <ActionsSection />
        <FormattingSection />
        <Separator />
        <ThemeSection />
      </div>
      <div className="flex-0 flex flex-col w-full mt-4 gap-2">
        <Separator />
        <Button variant="destructive" onClick={onClickResetContent}>
          Reset content
        </Button>
      </div>
    </menu>
  );
}

function FormattingSection() {
  const { editor } = useCurrentEditor();
  return (
    <Section title="Text Formatting">
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="btn btn-sm"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <Underline />
        </Button>
      </div>
    </Section>
  );
}

function ActionsSection() {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        canUndo: ctx.editor?.can().chain().focus().undo().run(),
        canRedo: ctx.editor?.can().chain().focus().redo().run(),
      };
    },
  });

  return (
    <Section title="Actions">
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          className="btn btn-sm"
          onClick={() => editor?.commands.undo()}
          disabled={!editorState?.canUndo}
          aria-label="Undo"
        >
          <Undo />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="btn btn-sm"
          onClick={() => editor?.commands.redo()}
          disabled={!editorState?.canRedo}
          aria-label="Redo"
        >
          <Redo />
        </Button>
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
      <div className="flex gap-2 justify-between items-center">
        <span className="text-sm">Theme</span>
        <Select
          value={selectedTheme}
          onValueChange={(value) =>
            selectTheme(value as PresetThemeName | "Custom")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(PRESET_THEMES)
              .concat("Custom")
              .map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between items-center">
        <Label className="text-sm" htmlFor="background">
          Background
        </Label>
        <input
          id="background"
          type="color"
          value={colors.background}
          onChange={(e) => {
            setBackgroundColor(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <Label className="text-sm" htmlFor="foreground">
          Foreground
        </Label>
        <input
          id="foreground"
          type="color"
          value={colors.foreground}
          onChange={(e) => {
            setForegroundColor(e.target.value);
          }}
        />
      </div>
      <Section>
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
      <div className="grid grid-cols-[auto_1fr_auto] gap-y-2 gap-x-5 items-center">
        {Object.entries(ansiColorMappings).map(([color, value]) => (
          <React.Fragment key={color}>
            <Label className="text-sm" htmlFor={`${color}-${variant}`}>
              {getAnsiColorLabel(color as AnsiColor)}
            </Label>
            <input
              id={`${color}-${variant}`}
              type="color"
              className="justify-self-center"
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
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  editor
                    ?.chain()
                    .focus()
                    .toggleFgColor(color as AnsiColor, variant)
                    .run();
                }}
              >
                FG
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  editor
                    ?.chain()
                    .focus()
                    .toggleBgColor(color as AnsiColor, variant)
                    .run();
                }}
              >
                BG
              </Button>
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
  title?: string;
  children: React.ReactNode;
}) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.open = true;
    }
  }, []);

  if (!title) {
    return <div className="w-full flex flex-col gap-3">{children}</div>;
  }

  return (
    <details ref={detailsRef} className="w-full">
      <summary className="flex justify-between text-xs uppercase tracking-widest  dark:text-indigo-300 text-indigo-700 py-1 marker:content-[''] group-open:after:content-['-'] after:content-['+']">
        {title}
      </summary>
      <div className="flex flex-col gap-3 mt-2">{children}</div>
    </details>
  );
}
