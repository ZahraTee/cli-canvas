import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { FONT_SIZE_CSS_VAR } from "@/lib/font";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { Bold, Minus, Plus, Redo, Underline, Undo } from "lucide-react";
import React, { useState } from "react";
import {
  getAnsiColorLabel,
  type AnsiColor,
  type AnsiColorVariant,
} from "../lib/color";
import { PRESET_THEMES, type PresetThemeName } from "../lib/themes";
import { useTheme } from "../stores/theme";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

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
          Reset Content
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

  const adjustFontSize = (cb: (currentSize: number) => number) => {
    const root = document.documentElement;
    const currentSizeStr = window
      .getComputedStyle(root)
      .getPropertyValue(FONT_SIZE_CSS_VAR)
      .split("px")[0];
    const currentSize = parseInt(currentSizeStr, 10);
    root.style.setProperty(FONT_SIZE_CSS_VAR, `${cb(currentSize)}px`);
  };

  const increaseTerminalFontSize = () => {
    adjustFontSize((size) => size + 1);
  };

  const reduceTerminalFontSize = () => {
    adjustFontSize((size) => size - 1);
  };

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
        <Button
          size="icon"
          variant="outline"
          className="btn btn-sm"
          onClick={increaseTerminalFontSize}
          aria-label="Increase font size"
        >
          <Plus />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="btn btn-sm"
          onClick={reduceTerminalFontSize}
          aria-label="Reduce font size"
        >
          <Minus />
        </Button>{" "}
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
  const [isOpen, setIsOpen] = useState(true);

  if (!title) {
    return <div className="w-full flex flex-col gap-3">{children}</div>;
  }

  return (
    <Collapsible
      className="w-full"
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-widest  dark:text-indigo-300 text-indigo-700 py-1">
        {title}
        <CollapsibleTrigger>
          <Button size="icon-sm" variant="ghost">
            {isOpen ? <Minus /> : <Plus />}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-3 mt-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}
