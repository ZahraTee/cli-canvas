export function textToEditorContent(text: string) {
  return `<pre><code>${text.split("\n").join("<br/>")}</code><pre>`;
}

export const DEFAULT_CONTENT =
  //   {
  //   type: "doc",
  //   content: [
  //     {
  //       type: "codeBlock",
  //       attrs: { language: null },
  //       content: [
  //         {
  //           type: "text",
  //           text: "\n\n\n\n\n  *=========================================*\n  │                                         │\n  │          ~ ",
  //         },
  //         {
  //           type: "text",
  //           marks: [
  //             {
  //               type: "textStyle",
  //               attrs: { fgColor: "ansi-color-fg-red", bgColor: null },
  //             },
  //           ],
  //           text: "Welcome to mo_cli",
  //         },
  //         {
  //           type: "text",
  //           text: " ~          │\n  │                                         │\n  │      You can use mo_cli to quickly      │\n  │    mock up terminal UIs or ascii art,   │\n  │     preview them in various themes,     │\n  │       and export images to share!       │\n  │                                         │\n  *=========================================*\n\n\n\n\n\n  ",
  //         },
  //       ],
  //     },
  //   ],
  // };

  `

  *=========================================*
  │                                         │
  │          ~ Welcome to mo_cli ~          │
  │                                         │
  │      You can use mo_cli to quickly      │
  │    mock up terminal UIs or ascii art,   │
  │     preview them in various themes,     │
  │       and export images to share!       │
  │                                         │
  *=========================================*





  `;
