export function textToEditorContent(text: string) {
  return `<pre><code>${text.split("\n").join("<br/>")}</code><pre>`;
}

export const DEFAULT_CONTENT = `




  *=========================================*
  │                                         │
  │          ~ Welcome to Mocli ~           │
  │                                         │
  │       You can edit this text and        │
  |           adjust the theme!             │
  │                                         │
  *=========================================*





  `;
