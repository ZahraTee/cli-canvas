export const FONT_SIZE_CSS_VAR = "--terminal-font-size";

export function initializeFontVariables() {
  const root = document.documentElement;
  const sheet = document.styleSheets[0];

  root.style.setProperty(FONT_SIZE_CSS_VAR, "14px");
  sheet.insertRule(`.terminal { font-size: var(${FONT_SIZE_CSS_VAR})}`);
}
