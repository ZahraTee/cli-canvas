export function textToEditorContent(text: string) {
  return `<pre><code>${text.split("\n").join("<br/>")}</code><pre>`;
}

export const DEFAULT_CONTENT = `
  *=========================================*
  │                                         │
  │        ~ Welcome to CliCanvas ~         │
  │                                         │
  │      Right now you can't do much,       │
  |      but you can edit this text!        │
  │                                         │
  *=========================================*
  `;
