"use client";

import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/portfolio";

type Props = {
  photos: Photo[];
  autoplayMs?: number;
};

export default function Carousel({ photos, autoplayMs = 6000 }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement | null>(null);

  const count = photos.length;
  const go = (n: number) => setIndex(((n % count) + count) % count);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [paused, count, autoplayMs]);

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count]);

  return (
    <div
      ref={regionRef}
      className="carousel"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured photography"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start == null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
      }}
    >
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {photos.map((p, i) => (
          <figure
            key={p.src}
            className="carousel-slide"
            aria-hidden={i !== index}
            aria-label={`${i + 1} of ${count}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt} loading={i === 0 ? "eager" : "lazy"} />
            <figcaption>
              <span className="carousel-cat">{p.category}</span>
              <span className="carousel-alt">{p.alt}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            className="carousel-btn prev"
            onClick={prev}
            aria-label="Previous slide"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="carousel-btn next"
            onClick={next}
            aria-label="Next slide"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="carousel-dots" role="tablist">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                className={`carousel-dot${i === index ? " active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
