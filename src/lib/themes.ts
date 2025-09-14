import type { AnsiColor } from "./color";

export type Theme = {
  colors: ColorPalette;
};

type PresetTheme = { name: PresetThemeName } & Theme;

type ColorPalette = { background: string; foreground: string } & Record<
  AnsiColorVariant,
  AnsiColorMappings
>;

export type AnsiColorVariant = "standard" | "intense";
type AnsiColorMappings = Record<AnsiColor, string>;

export type ActiveTheme = Exclude<PresetTheme, "name">;

export const THEME_MACOS_TERMINAL_APP: PresetTheme = {
  name: "Terminal.app",
  colors: {
    background: "#171717",
    foreground: "#ffffff",
    standard: {
      black: "#000000",
      red: "#990000",
      green: "#00A600",
      yellow: "#999900",
      blue: "#0000B2",
      purple: "#B200B2",
      cyan: "#00A6B2",
      white: "#BFBFBF",
    },
    intense: {
      black: "#666666",
      red: "#E50000",
      green: "#00D900",
      yellow: "#E5E500",
      blue: "#0000FF",
      purple: "#E500E5",
      cyan: "#00E5E5",
      white: "#E5E5E5",
    },
  },
};

export const THEME_GHOSTTY_DEFAULT_THEME_STYLEDARK: PresetTheme = {
  name: "Ghostty Default",
  colors: {
    background: "#292c33",
    foreground: "#ffffff",
    standard: {
      black: "#1d1f21",
      red: "#990000",
      green: "#b7bd73",
      yellow: "#e9c880",
      blue: "#88a1bb",
      purple: "#ad95b8",
      cyan: "#95bdb7",
      white: "#c5c8c6",
    },
    intense: {
      black: "#666666",
      red: "#c55757",
      green: "#bcc95f",
      yellow: "#e1c65e",
      blue: "#83a5d6",
      purple: "#bc99d4",
      cyan: "#83beb1",
      white: "#eaeaea",
    },
  },
};

export const PRESET_THEME_NAMES = ["Terminal.app", "Ghostty Default"] as const;

export type PresetThemeName = (typeof PRESET_THEME_NAMES)[number];

export type ThemeName = PresetThemeName | "Custom";

export const PRESET_THEMES = [
  THEME_MACOS_TERMINAL_APP,
  THEME_GHOSTTY_DEFAULT_THEME_STYLEDARK,
].reduce<Record<PresetThemeName, PresetTheme>>(
  (acc, theme) => ({
    ...acc,
    [theme.name]: theme,
  }),
  {} as Record<PresetThemeName, PresetTheme>,
);

export const DEFAULT_THEME = THEME_GHOSTTY_DEFAULT_THEME_STYLEDARK;
