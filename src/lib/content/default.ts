export function getDefaultContent() {
  const now = new Date();
  const datePart = now.toDateString();
  const timePart = now.toTimeString().split(" ")[0];
  const datetime = `${datePart.slice(0, -5)} ${timePart}`;
  return {
    type: "doc",
    content: [
      {
        type: "codeBlock",
        attrs: { language: null },
        content: [
          {
            type: "text",
            text: `Last login: ${datetime} on ttys001\n`,
          },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-green-intense",
                  bgColor: null,
                },
              },
            ],
            text: "➜",
          },
          { type: "text", text: "  " },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-cyan-intense",
                  bgColor: null,
                },
              },
            ],
            text: "~",
          },
          { type: "text", text: " ./mo_cli.sh\n" },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-white",
                  bgColor: null,
                },
              },
            ],
            text: "                    ___ \n  __ _  ___    ____/ (_)\n /  ' \\/ _ \\  / __/ / / \n/_/_/_/\\___/__\\__/_/_/  \n          /___/         ",
          },
          { type: "text", text: " " },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: null,
                  bgColor: "ansi-color-bg-purple-intense",
                },
              },
            ],
            text: "\n",
          },
          { type: "text", text: " \n" },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-purple-intense",
                  bgColor: null,
                },
              },
            ],
            text: "mo_cli",
          },
          {
            type: "text",
            text: " is a web-based editor for mocking up terminal UIs.\n\nWith ",
          },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-purple-intense",
                  bgColor: null,
                },
              },
            ],
            text: "mo_cli",
          },
          {
            type: "text",
            text: ", you can:\n* Quickly edit and format your content with a WSIYWG editor\n* Preview your design in multiple themes\n* Export images to share as PNG, JPG or SVG\n\n",
          },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-cyan-intense",
                  bgColor: null,
                },
              },
            ],
            text: "│",
          },
          {
            type: "text",
            text: " Tip: If you have some existing terminal output you'd like \n",
          },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-cyan-intense",
                  bgColor: null,
                },
              },
            ],
            text: "│",
          },
          {
            type: "text",
            text: " to edit, you can pipe it with its ANSI formatting to your\n",
          },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-cyan-intense",
                  bgColor: null,
                },
              },
            ],
            text: "│",
          },
          { type: "text", text: " clipboard and paste it in here, e.g.:\n" },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-cyan-intense",
                  bgColor: null,
                },
              },
            ],
            text: "│",
          },
          { type: "text", text: "\n" },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-cyan-intense",
                  bgColor: null,
                },
              },
            ],
            text: "│",
          },
          { type: "text", text: " " },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-green-intense",
                  bgColor: null,
                },
              },
            ],
            text: "➜",
          },
          { type: "text", text: "  " },
          {
            type: "text",
            marks: [
              {
                type: "textStyle",
                attrs: {
                  bold: null,
                  underline: null,
                  fgColor: "ansi-color-fg-cyan-intense",
                  bgColor: null,
                },
              },
            ],
            text: "~",
          },
          { type: "text", text: " npx colortest | pbcopy\n" },
        ],
      },
    ],
  };
}
