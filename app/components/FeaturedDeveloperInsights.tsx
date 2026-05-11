"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Play } from "lucide-react";

const developerInsights = [
  {
    id: 1,
    tag: "TOP RATED",
    tagColor: "#10b981", // Green
    tagBg: "#ecfdf5",
    title: "Emaar Properties",
    description: "Industry leader with iconic developments and a proven track record.",
    image: "https://images.unsplash.com/photo-1582647509711-c8aa8a8bda71?auto=format&fit=crop&q=80&w=800", // Burj Khalifa/Emaar style
    type: "developer"
  },
  {
    id: 2,
    tag: "HIGH PERFORMER",
    tagColor: "#8b5cf6", // Purple
    tagBg: "#f5f3ff",
    title: "DAMAC Properties",
    description: "Award-winning developer known for luxury living and on-time delivery.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800", // Modern luxury building
    type: "developer"
  },
  {
    id: 3,
    tag: "TRUSTED",
    tagColor: "#3b82f6", // Blue
    tagBg: "#eff6ff",
    title: "Nakheel",
    description: "Master developer behind Dubai's most iconic communities.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800", // Palm Jumeirah style
    type: "developer"
  },
  {
    id: 4,
    tag: "VIDEO BRIEFING",
    tagColor: "#ffffff",
    tagBg: "#C9A84C", // Golden
    title: "Dubai Developer Outlook 2026",
    description: "Key trends, new launches pipeline, and what to expect from leading developers in 2026.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800", // Skyline video thumbnail
    type: "video"
  },
];

export default function FeaturedDeveloperInsights() {
  return (
    <section className="featured-developer-insights" style={{ padding: "0 8% 10px", backgroundColor: "#ffffff", marginTop: "10px", position: "relative", zIndex: 10 }}>
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Featured Developer Insights</h2>
        <Link href="/developers" style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="insights-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(4, 1fr)", 
        gap: "24px",
        margin: "0" 
      }}>
        {developerInsights.map((insight) => (
          <div key={insight.id} className="developer-insight-card" style={{ 
            backgroundColor: "#ffffff", 
            borderRadius: "12px", 
            border: "1px solid #f0f0f0", 
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "all 0.2s ease",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
          }}>
            <div style={{ position: "relative", height: "130px", overflow: "hidden" }}>
              <img 
                src={insight.image} 
                alt={insight.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {insight.type === "video" && (
                <div style={{ 
                  position: "absolute", 
                  top: "0", 
                  left: "0", 
                  right: "0", 
                  bottom: "0", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.2)"
                }}>
                  <div style={{ 
                    width: "40px", 
                    height: "40px", 
                    borderRadius: "50%", 
                    backgroundColor: "rgba(255,255,255,0.4)", 
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Play size={20} fill="white" color="white" style={{ marginLeft: "2px" }} />
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ padding: "14px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ 
                  backgroundColor: insight.tagBg, 
                  color: insight.tagColor, 
                  padding: "3px 8px", 
                  borderRadius: "4px", 
                  fontSize: "9px", 
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em"
                }}>
                  {insight.tag}
                </span>
              </div>
              
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a1a", margin: "0 0 8px 0", lineHeight: "1.3" }}>
                {insight.title}
              </h3>
              
              <p style={{ 
                fontSize: "13px", 
                color: "#666", 
                margin: "0 0 16px 0", 
                lineHeight: "1.5", 
                display: "-webkit-box", 
                WebkitLineClamp: 2, 
                WebkitBoxOrient: "vertical", 
                overflow: "hidden" 
              }}>
                {insight.description}
              </p>
              
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .developer-insight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
          border-color: #C9A84C44 !important;
        }
        @media (max-width: 1024px) {
          .insights-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 640px) {
          .featured-developer-insights {
            padding: 10px 16px 10px !important;
            margin-top: 5px !important;
          }
          .insights-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 12px !important;
            margin: 0 -16px !important;
            padding-left: 16px !important;
            gap: 16px !important;
            scrollbar-width: none;
          }
          .insights-grid::-webkit-scrollbar {
            display: none;
          }
          .developer-insight-card {
            min-width: 260px !important;
          }
        }
      `}</style>
    </section>
  );
}
