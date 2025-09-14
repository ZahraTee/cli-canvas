import type { AnsiColor } from "./color";

export type PresetTheme = {
  name: string;
  colors: ColorPalette;
};

type ColorPalette = { background: string } & Record<
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

export const DEFAULT_THEME = THEME_MACOS_TERMINAL_APP;
