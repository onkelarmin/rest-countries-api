import styles from "./ThemeSwitch.module.scss";
import ThemeDarkIcon from "@/assets/svg/icon-theme-dark.svg?react";
import ThemeLightIcon from "@/assets/svg/icon-theme-light.svg?react";
import { useEffect, useLayoutEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme-preference";

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function getSystemTheme(): Theme {
  return mediaQuery.matches ? "dark" : "light";
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return getSystemTheme();
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useLayoutEffect(() => {
    if (document.startViewTransition == null) {
      document.documentElement.dataset.theme = theme;
      return;
    }

    document.startViewTransition({
      update: () => {
        document.documentElement.dataset.theme = theme;
      },
      types: ["theme"],
    });
    // document.startViewTransition(() => {
    //   document.documentElement.dataset.theme = theme;
    // });
  }, [theme]);

  useEffect(() => {
    const handlePreferenceChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored === "light" || stored === "dark") return;

      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handlePreferenceChange);

    return () =>
      mediaQuery.removeEventListener("change", handlePreferenceChange);
  }, []);

  const handleSwitchClick = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  return (
    <button
      type="button"
      className={styles.themeSwitch}
      onClick={handleSwitchClick}
    >
      {theme === "dark" ? (
        <ThemeDarkIcon className={styles.icon} aria-hidden="true" />
      ) : (
        <ThemeLightIcon className={styles.icon} aria-hidden="true" />
      )}
      <span className="visually-hidden">Switch to </span>
      <span>{theme === "dark" ? "Light" : "Dark"} mode</span>
    </button>
  );
}
