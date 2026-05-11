"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Clock, ChevronRight } from 'lucide-react';

const InvestorVideoBriefing = () => {
  const [playing, setPlaying] = useState(false);
  const videoId = "oSXXo4SyiYY";

  return (
    <div className="investor-video-briefing" style={{ padding: "0 0 40px 0" }}>
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Investor Video Briefing</h2>
        <Link href="/guides" style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div 
        className="video-insight-card" 
        onClick={() => !playing && setPlaying(true)}
        style={{ 
          cursor: playing ? 'default' : 'pointer',
          display: "flex",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #f2f2f2",
          overflow: "hidden",
          transition: "all 0.3s ease",
          height: "180px"
        }}
      >
        <div className="video-thumbnail-wrapper" style={{ 
          width: "45%", 
          position: "relative", 
          backgroundColor: "#000",
          overflow: "hidden"
        }}>
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&iv_load_policy=3&color=white`}
              title="Dubai Off-Plan Investment Guide 2026"
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
              <img 
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Dubai Skyline" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="play-button-overlay" style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.2)"
              }}>
                <div className="play-button-circle" style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}>
                  <Play fill="#1a1a1a" size={16} style={{ marginLeft: "2px" }} />
                </div>
              </div>
              <div className="video-duration" style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                backgroundColor: "rgba(0,0,0,0.8)",
                color: "#fff",
                fontSize: "10px",
                fontWeight: 600,
                padding: "2px 6px",
                borderRadius: "4px"
              }}>7:45</div>
            </>
          )}
        </div>
        <div className="video-info" style={{ 
          width: "55%", 
          padding: "16px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center" 
        }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", margin: "0 0 8px 0", lineHeight: "1.3" }}>
            Dubai Off-Plan Investment Guide 2026
          </h3>
          <p style={{ 
            fontSize: "12px", 
            color: "#666", 
            margin: "0 0 12px 0", 
            lineHeight: "1.4",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}>
            Complete guide to off-plan investments in Dubai – trends, opportunities and strategies.
          </p>
          <div className="video-footer" style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
            color: "#999", 
            fontSize: "11px" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Clock size={13} />
              <span>7 min</span>
            </div>
            <span style={{ fontSize: "10px" }}>•</span>
            <span>Market Briefing</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .video-insight-card:hover {
          border-color: #C9A84C33 !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }
        @media (max-width: 640px) {
          .video-insight-card {
            flex-direction: column !important;
            height: auto !important;
          }
          .video-thumbnail-wrapper, .video-info {
            width: 100% !important;
          }
          .video-thumbnail-wrapper {
            height: 180px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InvestorVideoBriefing;
