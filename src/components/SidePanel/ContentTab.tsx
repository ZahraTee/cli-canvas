import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import type { AnsiColor } from "@/lib/color";
import { FONT_SIZE_CSS_VAR } from "@/lib/font";
import { useTheme } from "@/stores/theme";
import { useCurrentEditor, useEditorState } from "@tiptap/react";
import { Bold, Minus, Plus, Redo, Underline, Undo } from "lucide-react";
import { Section } from "./Section";

export function ContentTab({
  onClickResetContent,
}: {
  onClickResetContent: () => void;
}) {
  return (
    <TabsContent value="content" className="w-full h-full flex flex-col ">
      <div className="flex-1 flex flex-col gap-4">
        <ActionsSection />
        <FormattingSection />
        <ForegroundColorControls />
        <BackgroundColorControls />
      </div>
      <div className="flex-0 flex flex-col w-full mt-4 gap-2">
        <Separator />
        <Button variant="destructive" onClick={onClickResetContent}>
          Reset Content
        </Button>
      </div>
    </TabsContent>
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

function ForegroundColorControls() {
  const { editor } = useCurrentEditor();
  const {
    theme: { colors },
  } = useTheme();
  const { standard, intense } = colors;
  return (
    <Section title="Foreground Colors">
      <div className="flex flex-wrap gap-2">
        {Object.entries(standard).map(([name, value]) => (
          <ColorFormattingButton
            key={name}
            colorValue={value}
            onClick={() => {
              editor
                ?.chain()
                .focus()
                .toggleFgColor(name as AnsiColor, "standard")
                .run();
            }}
          />
        ))}
        {Object.entries(intense).map(([name, value]) => (
          <ColorFormattingButton
            key={name}
            colorValue={value}
            onClick={() => {
              editor
                ?.chain()
                .focus()
                .toggleFgColor(name as AnsiColor, "intense")
                .run();
            }}
          />
        ))}
      </div>
    </Section>
  );
}

function ColorFormattingButton({
  onClick,
  colorValue,
}: {
  onClick: () => void;
  colorValue: string;
}) {
  return (
    <Button
      size="icon-sm"
      style={{ backgroundColor: colorValue }}
      variant="outline"
      onClick={onClick}
    />
  );
}

function BackgroundColorControls() {
  const { editor } = useCurrentEditor();
  const {
    theme: { colors },
  } = useTheme();
  const { standard, intense } = colors;
  return (
    <Section title="Background Colors">
      <div className="flex flex-wrap gap-2">
        {Object.entries(standard).map(([name, value]) => (
          <ColorFormattingButton
            key={name}
            colorValue={value}
            onClick={() => {
              editor
                ?.chain()
                .focus()
                .toggleBgColor(name as AnsiColor, "standard")
                .run();
            }}
          />
        ))}
        {Object.entries(intense).map(([name, value]) => (
          <ColorFormattingButton
            key={name}
            colorValue={value}
            onClick={() => {
              editor
                ?.chain()
                .focus()
                .toggleBgColor(name as AnsiColor, "intense")
                .run();
            }}
          />
        ))}
      </div>
    </Section>
  );
}
