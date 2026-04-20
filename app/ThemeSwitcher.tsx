"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "fun", label: "Fun", emoji: "🎨" },
  { id: "dark", label: "Dark", emoji: "🌙" },
  { id: "metallic", label: "Metallic", emoji: "⚙️" }
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("fun");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as ThemeId) || "fun";
    setTheme(current);
    setMounted(true);
  }, []);

  function pick(next: ThemeId) {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <div className="theme-switcher" role="radiogroup" aria-label="Theme">
      {THEMES.map((t) => {
        const active = mounted && theme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active}
            className={`theme-opt${active ? " active" : ""}`}
            onClick={() => pick(t.id)}
            title={`${t.label} theme`}
          >
            <span aria-hidden>{t.emoji}</span>
            <span className="theme-opt-label">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
