import Bold from "@tiptap/extension-bold";

export const AnsiBold = Bold.extend({
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
          bold: {
            default: null,
            renderHTML: (attributes) => {
              return {
                class: attributes.bold,
              };
            },
            parseHTML: (element) => {
              return {
                bold: [...element.classList].includes("ansi-bold"),
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      toggleBold:
        () =>
        ({ chain }) => {
          return chain()
            .toggleMark("textStyle", {
              bold: "ansi-bold",
            })
            .run();
        },
    };
  },
});
