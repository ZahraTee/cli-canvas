import { create } from "zustand";
import {
  DEFAULT_THEME,
  PRESET_THEMES,
  type ActiveTheme,
  type AnsiColorVariant,
  type ThemeName,
} from "../lib/themes";
import {
  BACKGROUND_COLOR_CSS_VAR,
  FOREGROUND_COLOR_CSS_VAR,
  getColorCssVar,
  setColorVariables,
  type AnsiColor,
} from "../lib/color";

type ThemeState = {
  theme: ActiveTheme;
  selectedTheme: ThemeName;
  selectTheme: (name: ThemeName) => void;
  setBackgroundColor: (color: string) => void;
  setForegroundColor: (color: string) => void;
  setAnsiColor: (
    color: AnsiColor,
    variant: AnsiColorVariant,
    value: string,
  ) => void;
};

export const useTheme = create<ThemeState>((set) => ({
  selectedTheme: DEFAULT_THEME.name,
  selectTheme: (name: ThemeName) => {
    if (name === "Custom") {
      set({ selectedTheme: name });
      return;
    }
    const theme = PRESET_THEMES[name];
    set({ theme, selectedTheme: name });
    setColorVariables(theme);
  },
  theme: DEFAULT_THEME,
  setBackgroundColor: (newValue: string) => {
    set((state) => ({
      ...state,
      selectedTheme: "Custom",
      colors: { ...state.theme.colors, background: newValue },
    }));
    document.documentElement.style.setProperty(
      BACKGROUND_COLOR_CSS_VAR,
      newValue,
    );
  },
  setForegroundColor: (newValue: string) => {
    set((state) => ({
      ...state,
      selectedTheme: "Custom",
      colors: { ...state.theme.colors, foreground: newValue },
    }));
    document.documentElement.style.setProperty(
      FOREGROUND_COLOR_CSS_VAR,
      newValue,
    );
  },
  setAnsiColor: (
    color: AnsiColor,
    variant: AnsiColorVariant,
    newValue: string,
  ) => {
    set((state) => ({
      ...state,
      selectedTheme: "Custom",
      colors: {
        ...state.theme.colors,
        [variant]: { ...state.theme.colors[variant], [color]: newValue },
      },
    }));
    document.documentElement.style.setProperty(
      getColorCssVar(color as AnsiColor, variant),
      newValue,
    );
  },
}));
