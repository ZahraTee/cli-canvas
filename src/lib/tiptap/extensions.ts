import Bold from "@tiptap/extension-bold";
import { TextStyle } from "@tiptap/extension-text-style";
import { CodeBlock } from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { Underline } from "@tiptap/extension-underline";
import { Mark } from "@tiptap/core";

const TerminalDocument = Document.extend({
  content: "codeBlock",
});

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    spanClass: {
      setSpanClass: (className: string) => ReturnType;
      unsetSpanClass: () => ReturnType;
    };
  }
}

export const SpanClass = Mark.create({
  name: "spanClass",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          spanClass: {
            default: "none",
            renderHTML: (attributes) => {
              if (!attributes.spanClass) {
                return {};
              }
              return {
                class: attributes.spanClass,
              };
            },
            parseHTML: (element) => ({
              spanClass: element.classList.value,
            }),
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setSpanClass:
        (spanClass: string) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { spanClass }).run();
        },
      unsetSpanClass:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { spanClass: "" })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
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
  TextStyle,
  SpanClass,
];
