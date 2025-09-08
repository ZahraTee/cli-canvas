import { THEME_MACOS_TERMINAL_APP } from "./themes";

export const DEFAULT_BACKGROUND_COLOR = "#000000";
export const BACKGROUND_COLOR_CSS_VAR = "--terminal-bg-color";

export const ANSI_COLORS = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "purple",
  "cyan",
  "white",
] as const;

export type AnsiColor = (typeof ANSI_COLORS)[number];

export function getAnsiColorLabel(color: AnsiColor) {
  return color[0].toLocaleUpperCase() + color.slice(1);
}

export function getColorCssVar(color: AnsiColor) {
  return `--ansi-color-${color}`;
}

export function getFgColorClassName(color: AnsiColor) {
  return `ansi-color-fg-${color}`;
}

export function getBgColorClassName(color: AnsiColor) {
  return `ansi-color-bg-${color}`;
}

export function initializeColorVariables() {
  const root = document.documentElement;
  const sheet = document.styleSheets[0];

  root.style.setProperty(BACKGROUND_COLOR_CSS_VAR, DEFAULT_BACKGROUND_COLOR);
  sheet.insertRule(
    `.terminal { background-color: var(${BACKGROUND_COLOR_CSS_VAR}); }`,
  );

  for (const color of ANSI_COLORS) {
    const fgClassName = getFgColorClassName(color);
    const bgClassName = getBgColorClassName(color);

    const cssVar = getColorCssVar(color);
    root.style.setProperty(cssVar, THEME_MACOS_TERMINAL_APP.colors[color]);
    sheet.insertRule(`.${fgClassName} { color: var(${cssVar}); }`);
    sheet.insertRule(`.${bgClassName} { background-color: var(${cssVar}); }`);
  }
}
