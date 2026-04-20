"use client";

import { useEffect, useRef, useState } from "react";

const THEMES = [
  { id: "dark", label: "Dark" },
  { id: "metallic", label: "Metallic" },
  { id: "fun", label: "Fun" }
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("dark");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as ThemeId) ||
      "dark";
    setTheme(current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function pick(next: ThemeId) {
    setTheme(next);
    setOpen(false);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <div className="theme-menu" ref={ref}>
      <button
        type="button"
        className="theme-trigger"
        aria-label="Select theme"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 2.761 2.239 5 5 5h1a2 2 0 0 1 2 2 2 2 0 0 0 2 2z" />
          <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
          <circle cx="12" cy="7.5" r="1" fill="currentColor" />
          <circle cx="16.5" cy="10.5" r="1" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <div className="theme-panel" role="menu">
          {THEMES.map((t) => {
            const active = theme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                className={`theme-item${active ? " active" : ""}`}
                onClick={() => pick(t.id)}
              >
                <span className="theme-check" aria-hidden>
                  {active ? "✓" : ""}
                </span>
                {t.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
