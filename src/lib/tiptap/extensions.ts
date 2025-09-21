import { CodeBlock } from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { TextStyle } from "@tiptap/extension-text-style";
import { UndoRedo } from "@tiptap/extensions/undo-redo";
import { AnsiBgColor } from "./custom-extensions/AnsiBgColor";
import { AnsiBold } from "./custom-extensions/AnsiBold";
import { AnsiFgColor } from "./custom-extensions/AnsiFgColor";
import { AnsiUnderline } from "./custom-extensions/AnsiUnderline";
import { AnsiPasteHandler } from "./custom-extensions/AnsiPasteHandler";

const TerminalDocument = Document.extend({
  content: "codeBlock",
});

export const extensions = [
  // --------  Nodes --------
  TerminalDocument,
  Paragraph,
  Text,
  // By default CodeBlock disallows marks
  CodeBlock.extend({ marks: "_" }),
  // -------- Formatting --------
  AnsiBold,
  AnsiUnderline,
  TextStyle,
  AnsiFgColor,
  AnsiBgColor,
  AnsiPasteHandler,
  // --------Functionality--------
  UndoRedo,
];
