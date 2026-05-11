"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, ChevronLeft, Play, LayoutGrid } from "lucide-react";

const areaInsights = [
  {
    id: 1,
    tag: "POPULAR",
    tagColor: "#10b981", // Green
    tagBg: "#ecfdf5",
    title: "Dubai Marina",
    description: "A vibrant waterfront community with strong rental demand and high capital appreciation.",
    date: "12 May 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    type: "article"
  },
  {
    id: 2,
    tag: "HIGH GROWTH",
    tagColor: "#8b5cf6", // Purple
    tagBg: "#f5f3ff",
    title: "Dubai South",
    description: "A rapidly growing hub, set to become the city's next major business and lifestyle district.",
    date: "9 May 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=800",
    type: "article"
  },
  {
    id: 3,
    tag: "VIDEO",
    tagColor: "#ffffff",
    tagBg: "#C9A84C", // Golden instead of Orange
    title: "Dubai Creek Harbour Guide",
    description: "A complete guide to Dubai Creek Harbour – lifestyle, connectivity, investment potential and more.",
    date: "7 min video",
    readTime: "Market Briefing",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    type: "video",
    duration: "7:32"
  },
  {
    id: 4,
    tag: "WATERFRONT",
    tagColor: "#3b82f6", // Blue
    tagBg: "#eff6ff",
    title: "Dubai Creek Harbour",
    description: "Modern waterfront living with iconic views and long-term investment potential.",
    date: "7 May 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    type: "article"
  },
];

export default function FeaturedAreaInsights() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="featured-area-insights" style={{ padding: "10px 8% 40px", backgroundColor: "#ffffff", marginTop: "-20px", position: "relative", zIndex: 10 }}>
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Featured Area Insights</h2>
        <Link href="/areas" style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="insights-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(4, 1fr)", 
        gap: "24px",
        margin: "0" 
      }}>
        {areaInsights.map((insight) => (
          <div key={insight.id} className="area-insight-card" style={{ 
            backgroundColor: "#ffffff", 
            borderRadius: "10px", 
            border: "1px solid #f0f0f0", 
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "all 0.2s ease",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
          }}>
            <div style={{ position: "relative", height: "120px", overflow: "hidden" }}>
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
                  backgroundColor: "rgba(0,0,0,0.15)"
                }}>
                  <div style={{ 
                    width: "32px", 
                    height: "32px", 
                    borderRadius: "50%", 
                    backgroundColor: "rgba(255,255,255,0.3)", 
                    backdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Play size={16} fill="white" color="white" style={{ marginLeft: "2px" }} />
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ padding: "10px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ 
                  backgroundColor: insight.tagBg, 
                  color: insight.tagColor, 
                  padding: "2px 6px", 
                  borderRadius: "3px", 
                  fontSize: "8px", 
                  fontWeight: 800,
                  textTransform: "uppercase"
                }}>
                  {insight.tag}
                </span>
                {insight.type === "video" && (
                  <span style={{ fontSize: "9px", color: "#9ca3af", fontWeight: 500 }}>
                    {insight.duration}
                  </span>
                )}
              </div>
              
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a1a", margin: "0 0 6px 0", lineHeight: "1.3" }}>
                {insight.title}
              </h3>
              
              <p style={{ 
                fontSize: "13px", 
                color: "#666", 
                margin: "0 0 12px 0", 
                lineHeight: "1.5", 
                display: "-webkit-box", 
                WebkitLineClamp: 2, 
                WebkitBoxOrient: "vertical", 
                overflow: "hidden" 
              }}>
                {insight.description}
              </p>
              
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "6px", 
                color: "#9ca3af", 
                fontSize: "10px",
                marginTop: "auto",
                paddingTop: "8px",
                borderTop: "1px solid #f9fafb"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  {insight.type === "video" ? <Play size={10} /> : <Calendar size={10} />}
                  {insight.date}
                </div>
                <span>•</span>
                <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  {insight.type === "video" ? <LayoutGrid size={10} /> : <Clock size={10} />}
                  {insight.readTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .area-insight-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          border-color: #C9A84C22 !important;
        }
        @media (max-width: 1024px) {
          .insights-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
            margin: 0 !important;
          }
        }
        @media (max-width: 640px) {
          .featured-area-insights {
            padding: 20px 16px !important;
          }
          .insights-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 12px !important;
            margin: 0 -16px !important;
            padding-left: 16px !important;
            gap: 16px !important;
          }
          .area-insight-card {
            min-width: 240px !important;
          }
        }
      `}</style>
    </section>
  );
}
