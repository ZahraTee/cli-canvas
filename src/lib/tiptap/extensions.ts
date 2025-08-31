import Bold from "@tiptap/extension-bold";
import { CodeBlock } from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { Underline } from "@tiptap/extension-underline";

export const TerminalDocument = Document.extend({
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
  Bold,
  Underline,
];
