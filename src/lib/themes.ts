import type { AnsiColor } from "./color";

export type PresetTheme = {
  name: string;
  colors: ColorPalette;
};

type ColorPalette = { background: string } & Record<
  AnsiColorVariant,
  AnsiColorMappings
>;

export type AnsiColorVariant = "standard";
type AnsiColorMappings = Record<AnsiColor, string>;

export type ActiveTheme = Exclude<PresetTheme, "name">;

export const THEME_MACOS_TERMINAL_APP: PresetTheme = {
  name: "Terminal.app",
  colors: {
    background: "#000000",
    standard: {
      black: "#000000",
      red: "#FF0000",
      green: "#00A600",
      yellow: "#999900",
      blue: "#0000B2",
      purple: "#B200B2",
      cyan: "#00A6B2",
      white: "#FFFFFF",
    },
  },
};
