export function textToEditorContent(text: string) {
  return `<pre><code>${text.split("\n").join("<br/>")}</code><pre>`;
}

export const DEFAULT_CONTENT = `




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
