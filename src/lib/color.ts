import { DEFAULT_THEME, type Theme } from "./themes";

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

export const ANSI_COLOR_VARIANTS = ["standard", "intense"] as const;
export type AnsiColorVariant = (typeof ANSI_COLOR_VARIANTS)[number];

export function getAnsiColorLabel(color: AnsiColor) {
  return color[0].toLocaleUpperCase() + color.slice(1);
}

export function getColorCssVar(color: AnsiColor, variant: AnsiColorVariant) {
  return `--ansi-color-${color}${variant !== "standard" ? `-${variant}` : ""}`;
}

export function getFgColorClassName(
  color: AnsiColor,
  variant: AnsiColorVariant,
) {
  return `ansi-color-fg-${color}${variant !== "standard" ? `-${variant}` : ""}`;
}

export function getBgColorClassName(
  color: AnsiColor,
  variant: AnsiColorVariant,
) {
  return `ansi-color-bg-${color}${variant !== "standard" ? `-${variant}` : ""}`;
}

export function initializeColorVariables(theme: Theme = DEFAULT_THEME) {
  const root = document.documentElement;
  const sheet = document.styleSheets[0];

  root.style.setProperty(BACKGROUND_COLOR_CSS_VAR, theme.colors.background);
  sheet.insertRule(
    `.terminal { background-color: var(${BACKGROUND_COLOR_CSS_VAR}); }`,
  );

  for (const variant of ANSI_COLOR_VARIANTS) {
    for (const color of ANSI_COLORS) {
      const fgClassName = getFgColorClassName(color, variant);
      const bgClassName = getBgColorClassName(color, variant);

      const cssVar = getColorCssVar(color, variant);
      root.style.setProperty(cssVar, theme.colors[variant][color]);
      sheet.insertRule(`.${fgClassName} { color: var(${cssVar}); }`);
      sheet.insertRule(`.${bgClassName} { background-color: var(${cssVar}); }`);
    }
  }
}

export function setColorVariables(theme: Theme) {
  const root = document.documentElement;

  root.style.setProperty(BACKGROUND_COLOR_CSS_VAR, theme.colors.background);

  for (const variant of ANSI_COLOR_VARIANTS) {
    for (const color of ANSI_COLORS) {
      const cssVar = getColorCssVar(color, variant);
      root.style.setProperty(cssVar, theme.colors[variant][color]);
    }
  }
}
