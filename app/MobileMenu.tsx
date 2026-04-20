"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#video", label: "Video" },
  { href: "/#about", label: "About" },
  { href: "/book", label: "Enquire" }
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          {open ? (
            <>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </>
          ) : (
            <>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </>
          )}
        </svg>
      </button>

      {open && mounted &&
        createPortal(
          <div
            className="menu-backdrop"
            onClick={() => setOpen(false)}
            role="presentation"
          >
            <nav
              className="menu-panel"
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile menu"
            >
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>,
          document.body
        )}
    </>
  );
}
