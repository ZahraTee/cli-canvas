import Underline from "@tiptap/extension-underline";

export const AnsiUnderline = Underline.extend({
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          underline: {
            default: null,
            renderHTML: (attributes) => {
              return {
                class: attributes.underline,
              };
            },
            parseHTML: (element) => {
              return {
                underline: [...element.classList].includes("ansi-underline"),
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      toggleUnderline:
        () =>
        ({ chain }) => {
          return chain()
            .toggleMark("textStyle", {
              underline: "ansi-underline",
            })
            .run();
        },
    };
  },
});
