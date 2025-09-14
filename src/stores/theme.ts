import { create } from "zustand";
import {
  THEME_MACOS_TERMINAL_APP,
  type ActiveTheme,
  type AnsiColorVariant,
} from "../lib/themes";
import type { AnsiColor } from "../lib/color";

type ThemeState = {
  theme: ActiveTheme;
  setBackgroundColor: (color: string) => void;
  setAnsiColor: (
    color: AnsiColor,
    variant: AnsiColorVariant,
    value: string,
  ) => void;
};

export const useTheme = create<ThemeState>((set) => ({
  theme: THEME_MACOS_TERMINAL_APP,
  setBackgroundColor: (newValue: string) =>
    set((state) => ({
      ...state,
      colors: { ...state.theme.colors, background: newValue },
    })),
  setAnsiColor: (
    color: AnsiColor,
    variant: AnsiColorVariant,
    newValue: string,
  ) =>
    set((state) => ({
      ...state,
      colors: {
        ...state.theme.colors,
        [variant]: { ...state.theme.colors[variant], [color]: newValue },
      },
    })),
}));
