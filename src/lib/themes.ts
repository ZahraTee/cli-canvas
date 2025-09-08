import type { AnsiColor } from "./color";

export type ColorTheme = {
  name: string;
  colors: Record<AnsiColor, string>;
};

export const THEME_MACOS_TERMINAL_APP: ColorTheme = {
  name: "Terminal.app",
  colors: {
    black: "#000000",
    red: "#ff0000",
    green: "#00A600",
    yellow: "#999900",
    blue: "#0000B2",
    purple: "#B200B2",
    cyan: "#00A6B2",
    white: "#FFFFFF",
  },
};
