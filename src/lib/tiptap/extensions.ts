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
      unsetSpanClass: (className?: string) => ReturnType;
    };
  }
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    spanClass: {
      setSpanClass: (className: string) => ReturnType;
      unsetSpanClass: (className?: string) => ReturnType;
    };
  }
}

export const SpanClass = Mark.create({
  name: "spanClass",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          spanClass: {
            default: null,
            renderHTML: (attributes) => {
              if (!attributes.spanClass || attributes.spanClass.length === 0) {
                return {};
              }
              // Join array of classes back into a string
              const classString = Array.isArray(attributes.spanClass)
                ? attributes.spanClass.join(" ")
                : attributes.spanClass;
              return {
                class: classString,
              };
            },
            parseHTML: (element) => {
              const classList = Array.from(element.classList);
              return {
                spanClass: classList.length > 0 ? classList : null,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setSpanClass:
        (spanClass: string) =>
        ({ chain, state }) => {
          const { selection } = state;
          const { from, to } = selection;

          // Get existing attributes at the current selection
          const existingMark = state.doc.rangeHasMark(
            from,
            to,
            state.schema.marks.textStyle,
          );
          let existingClasses: string[] = [];

          if (existingMark) {
            // Find the textStyle mark in the current selection
            state.doc.nodesBetween(from, to, (node) => {
              const mark = node.marks.find((m) => m.type.name === "textStyle");
              if (mark && mark.attrs.spanClass) {
                existingClasses = Array.isArray(mark.attrs.spanClass)
                  ? [...mark.attrs.spanClass]
                  : mark.attrs.spanClass.split(" ").filter(Boolean);
                return false; // Stop iteration
              }
            });
          }

          // Add the new class if it's not already present
          if (!existingClasses.includes(spanClass)) {
            existingClasses.push(spanClass);
          }

          return chain()
            .setMark("textStyle", { spanClass: existingClasses })
            .run();
        },

      unsetSpanClass:
        (className?: string) =>
        ({ chain, state }) => {
          if (!className) {
            // Remove all span classes
            return chain()
              .setMark("textStyle", { spanClass: null })
              .removeEmptyTextStyle()
              .run();
          }

          const { selection } = state;
          const { from, to } = selection;

          // Get existing classes
          let existingClasses: string[] = [];
          state.doc.nodesBetween(from, to, (node) => {
            const mark = node.marks.find((m) => m.type.name === "textStyle");
            if (mark && mark.attrs.spanClass) {
              existingClasses = Array.isArray(mark.attrs.spanClass)
                ? [...mark.attrs.spanClass]
                : mark.attrs.spanClass.split(" ").filter(Boolean);
              return false; // Stop iteration
            }
          });

          // Remove the specific class
          const updatedClasses = existingClasses.filter(
            (cls) => cls !== className,
          );

          if (updatedClasses.length === 0) {
            return chain()
              .setMark("textStyle", { spanClass: null })
              .removeEmptyTextStyle()
              .run();
          }

          return chain()
            .setMark("textStyle", { spanClass: updatedClasses })
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
