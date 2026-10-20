"use client";

import { useEffect } from "react";
import { buildCssVariables } from "@/lib/design-tokens";
import { PRODUCTION_COLOR_THEME_ID } from "@/lib/color-themes";

/** Restores production design tokens; clears leftover design-system preview state. */
export function ThemeReset() {
  useEffect(() => {
    window.localStorage.removeItem("ecom-gliders-theme-preview");
    document.documentElement.classList.remove("preview-dark");

    const lightVars = buildCssVariables();
    for (const [key, value] of Object.entries(lightVars)) {
      document.documentElement.style.setProperty(key, value);
    }
    document.documentElement.dataset.colorTheme = PRODUCTION_COLOR_THEME_ID;
  }, []);

  return null;
}
