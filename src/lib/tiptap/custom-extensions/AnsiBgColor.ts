import {
  getBgColorClassName,
  type AnsiColor,
  type AnsiColorVariant,
} from "@/lib/color";
import { Mark } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
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

export const AnsiBgColor = Mark.create({
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
