import { CodeBlock } from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";

export const TerminalDocument = Document.extend({
  content: "codeBlock",
});

export const extensions = [
  TerminalDocument,
  Paragraph,
  Text,
  CodeBlock,
];
