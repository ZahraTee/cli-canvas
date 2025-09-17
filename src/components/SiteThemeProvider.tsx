import { createContext, useContext, useEffect, useState } from "react";

export type SiteTheme = "dark" | "light" | "system";

type SiteThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: SiteTheme;
  storageKey?: string;
};

type SiteThemeProviderState = {
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
};

const initialState: SiteThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const SiteThemeProviderContext =
  createContext<SiteThemeProviderState>(initialState);

export function SiteThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: SiteThemeProviderProps) {
  const [theme, setTheme] = useState<SiteTheme>(
    () => (localStorage.getItem(storageKey) as SiteTheme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: SiteTheme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <SiteThemeProviderContext.Provider {...props} value={value}>
      {children}
    </SiteThemeProviderContext.Provider>
  );
}

export const useSiteTheme = () => {
  const context = useContext(SiteThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
