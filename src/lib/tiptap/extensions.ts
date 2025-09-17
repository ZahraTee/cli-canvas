import Bold from "@tiptap/extension-bold";
import { TextStyle } from "@tiptap/extension-text-style";
import { CodeBlock } from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Text } from "@tiptap/extension-text";
import { Underline } from "@tiptap/extension-underline";
import { UndoRedo } from "@tiptap/extensions/undo-redo";
import { Mark } from "@tiptap/core";
import {
  getBgColorClassName,
  getFgColorClassName,
  type AnsiColor,
  type AnsiColorVariant,
} from "../color";

const TerminalDocument = Document.extend({
  content: "codeBlock",
});

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fgColor: {
      toggleFgColor: (
        color: AnsiColor,
        variant: AnsiColorVariant,
      ) => ReturnType;
      setFgColor: (color: AnsiColor, variant: AnsiColorVariant) => ReturnType;
      unsetFgColor: () => ReturnType;
    };
    bgColor: {
      toggleBgColor: (
        color: AnsiColor,
        variant: AnsiColorVariant,
      ) => ReturnType;
      setBgColor: (color: AnsiColor, variant: AnsiColorVariant) => ReturnType;
      unsetBgColor: () => ReturnType;
    };
  }
}

export const FgColor = Mark.create({
  name: "fgColor",

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
          fgColor: {
            default: null,
            renderHTML: (attributes) => {
              return {
                class: attributes.fgColor,
              };
            },
            parseHTML: (element) => {
              return {
                fgColor: [...element.classList].find((c) =>
                  c.startsWith("ansi-fg-color-"),
                ),
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      toggleFgColor:
        (color: AnsiColor, variant: AnsiColorVariant) =>
        ({ chain }) => {
          return chain()
            .toggleMark("textStyle", {
              fgColor: getFgColorClassName(color, variant),
            })
            .run();
        },
      setFgColor:
        (color: AnsiColor, variant: AnsiColorVariant) =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", {
              fgColor: getFgColorClassName(color, variant),
            })
            .run();
        },
      unsetFgColor:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fgColor: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

export const BgColor = Mark.create({
  name: "bgColor",

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
          bgColor: {
            default: null,
            renderHTML: (attributes) => {
              return {
                class: attributes.bgColor,
              };
            },
            parseHTML: (element) => {
              return {
                bgColor: [...element.classList].find((c) =>
                  c.startsWith("ansi-bg-color-"),
                ),
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      toggleBgColor:
        (color: AnsiColor, variant: AnsiColorVariant) =>
        ({ chain }) => {
          return chain()
            .toggleMark("textStyle", {
              bgColor: getBgColorClassName(color, variant),
            })
            .run();
        },
      setBgColor:
        (color: AnsiColor, variant: AnsiColorVariant) =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", {
              bgColor: getBgColorClassName(color, variant),
            })
            .run();
        },
      unsetBgColor:
        () =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { bgColor: null })
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
  FgColor,
  BgColor,
  // --------Functionality--------
  UndoRedo,
];
