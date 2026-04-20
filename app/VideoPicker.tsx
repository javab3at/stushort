"use client";

import { useState } from "react";
import type { Video } from "./LatestVideo";

type Props = {
  videos: Video[];
  channelUrl: string;
};

export default function VideoPicker({ videos, channelUrl }: Props) {
  const [activeId, setActiveId] = useState(videos[0].id);
  const active = videos.find((v) => v.id === activeId) ?? videos[0];

  return (
    <>
      <div className="video-wrap">
        <iframe
          key={active.id}
          src={`https://www.youtube-nocookie.com/embed/${active.id}?rel=0`}
          title={active.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <p className="video-meta">
        <span className="video-title">{active.title}</span>
        <a href={channelUrl} target="_blank" rel="noopener noreferrer">
          Subscribe on YouTube →
        </a>
      </p>

      {videos.length > 1 && (
        <div className="video-thumbs" role="tablist" aria-label="Videos">
          {videos.map((v) => {
            const isActive = v.id === active.id;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`video-thumb${isActive ? " active" : ""}`}
                onClick={() => setActiveId(v.id)}
                title={v.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                />
                <span className="video-thumb-title">{v.title}</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
