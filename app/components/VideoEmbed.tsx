"use client";

import { useState } from "react";

export default function VideoEmbed() {
  const videoId = "NsO26BatxYA";
  const [playing, setPlaying] = useState(false);

  return (
    <section className="video-section" style={{ padding: "0 20px 20px" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#000",
          cursor: playing ? "default" : "pointer",
        }}
        onClick={() => !playing && setPlaying(true)}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&iv_load_policy=3&color=white`}
            title="Why Dubai South is the Next Growth Hub"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        ) : (
          <>
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Why Dubai South is the Next Growth Hub"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.25)",
              }}
            />
            {/* Play button */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.75)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)",
                  transition: "transform 0.15s ease, background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1.1)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0.9)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0.75)";
                }}
              >
                {/* Triangle play icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ marginLeft: 3 }}
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      <p
        style={{
          margin: "10px 0 0",
          fontSize: "13px",
          fontWeight: 500,
          color: "#444444",
          lineHeight: 1.4,
        }}
      >
        Why Dubai South is the Next Growth Hub
      </p>
    </section>
  );
}
