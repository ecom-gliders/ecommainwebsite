"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COLOR_THEME_STORAGE_KEY,
  applyThemeToDocument,
  colorThemesConfig,
  getColorThemeById,
  getColorThemes,
  type ColorTheme,
} from "@/lib/color-themes";
import { cn } from "@/lib/utils";
import {
  ATMOSPHERE_MODE_KEY,
  AtmosphereModeToggle,
  DesignSystemAtmosphere,
  type AtmosphereMode,
} from "./design-system-atmosphere";

interface ThemePreviewContextValue {
  themes: ColorTheme[];
  active: ColorTheme;
  activeId: string;
  mode: AtmosphereMode;
  selectTheme: (theme: ColorTheme) => void;
  setMode: (mode: AtmosphereMode) => void;
}

const ThemePreviewContext = createContext<ThemePreviewContextValue | null>(
  null,
);

function useThemePreview() {
  const ctx = useContext(ThemePreviewContext);
  if (!ctx) {
    throw new Error("Theme preview components require ColorThemePreviewProvider");
  }
  return ctx;
}

export function ColorThemePreviewProvider({
  children,
}: {
  children: ReactNode;
}) {
  const themes = getColorThemes();
  const [activeId, setActiveId] = useState(colorThemesConfig.defaultThemeId);
  const [mode, setModeState] = useState<AtmosphereMode>("soft");
  const active = getColorThemeById(activeId);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(COLOR_THEME_STORAGE_KEY);
    const initialTheme = storedTheme
      ? getColorThemeById(storedTheme)
      : getColorThemeById(colorThemesConfig.defaultThemeId);
    setActiveId(initialTheme.id);

    const storedMode = window.localStorage.getItem(ATMOSPHERE_MODE_KEY);
    if (
      storedMode === "white" ||
      storedMode === "soft" ||
      storedMode === "framer" ||
      storedMode === "framer-grid"
    ) {
      setModeState(storedMode);
    }

    const timer = window.setTimeout(() => {
      applyThemeToDocument(initialTheme);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const selectTheme = useCallback((theme: ColorTheme) => {
    setActiveId(theme.id);
    applyThemeToDocument(theme);
    window.localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme.id);
  }, []);

  const setMode = useCallback((next: AtmosphereMode) => {
    setModeState(next);
    window.localStorage.setItem(ATMOSPHERE_MODE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({
      themes,
      active,
      activeId,
      mode,
      selectTheme,
      setMode,
    }),
    [themes, active, activeId, mode, selectTheme, setMode],
  );

  return (
    <ThemePreviewContext.Provider value={value}>
      <DesignSystemAtmosphere mode={mode} />
      {children}
    </ThemePreviewContext.Provider>
  );
}

function SwitcherPanel({ compact = false }: { compact?: boolean }) {
  const { themes, active, activeId, mode, selectTheme, setMode } =
    useThemePreview();

  return (
    <div
      className={cn(
        "rounded-md border border-border bg-background/92 shadow-sm backdrop-blur-md",
        compact ? "p-3" : "p-4",
      )}
    >
      <p className="text-small font-semibold text-text-primary">Themes</p>
      <p className="text-small mt-1 text-text-secondary">
        Active:{" "}
        <span className="font-medium text-text-primary">{active.label}</span>
      </p>

      <div
        className={cn(
          "mt-3 gap-2",
          compact ? "flex flex-wrap" : "flex flex-col",
        )}
        role="tablist"
        aria-label="Color theme variants"
      >
        {themes.map((theme) => {
          const selected = theme.id === activeId;
          return (
            <button
              key={theme.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectTheme(theme)}
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-md border px-2.5 py-2 text-left text-xs font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                selected
                  ? "border-accent bg-accent/10 text-text-primary"
                  : "border-border bg-surface/80 text-text-secondary hover:border-accent/40 hover:text-text-primary",
                compact ? "w-auto" : "w-full",
              )}
            >
              <span
                className="flex shrink-0 items-center gap-1"
                aria-hidden="true"
              >
                <span
                  className="h-3 w-3 rounded-full border border-border"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <span
                  className="h-3 w-3 rounded-full border border-border"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </span>
              <span className="min-w-0 leading-snug">{theme.label}</span>
            </button>
          );
        })}
      </div>

      <p className="text-small mt-3 text-text-secondary">{active.description}</p>
      <AtmosphereModeToggle mode={mode} onChange={setMode} />
    </div>
  );
}

export function ColorThemeSwitcher() {
  return (
    <aside
      className="sticky top-24 hidden h-[calc(100vh-7rem)] w-[280px] shrink-0 overflow-y-auto xl:block"
      aria-label="Color theme switcher"
    >
      <SwitcherPanel />
    </aside>
  );
}

export function ColorThemeSwitcherMobile() {
  return (
    <div className="mb-6 xl:hidden">
      <SwitcherPanel compact />
    </div>
  );
}
