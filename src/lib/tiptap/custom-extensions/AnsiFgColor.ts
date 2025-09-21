import {
  getFgColorClassName,
  type AnsiColor,
  type AnsiColorVariant,
} from "@/lib/color";
import { Mark } from "@tiptap/core";

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
  }
}

export const AnsiFgColor = Mark.create({
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
