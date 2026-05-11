"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, Play, LayoutGrid } from "lucide-react";

const comparisonInsights = [
  {
    id: 1,
    tag: "MARKETS",
    tagColor: "#8b5cf6", // Purple
    tagBg: "#f5f3ff",
    title: "Dubai vs India",
    description: "Where should you invest in 2026 for better returns?",
    date: "10 May 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=800",
    type: "article"
  },
  {
    id: 2,
    tag: "AREAS",
    tagColor: "#10b981", // Green
    tagBg: "#ecfdf5",
    title: "Dubai Marina vs Dubai Creek Harbour",
    description: "Lifestyle, connectivity, price and future growth compared.",
    date: "8 May 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
    type: "article"
  },
  {
    id: 3,
    tag: "DEVELOPERS",
    tagColor: "#C9A84C", // Golden
    tagBg: "#fefce8",
    title: "Emaar vs Damac",
    description: "Track record, quality, delivery and investor trust.",
    date: "7 min video",
    readTime: "Market Briefing",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    type: "video",
    duration: "7:00"
  },
  {
    id: 4,
    tag: "PAYMENT PLANS",
    tagColor: "#3b82f6", // Blue
    tagBg: "#eff6ff",
    title: "60/40 vs 1% Payment Plans",
    description: "Which payment plan is better for your investment strategy?",
    date: "6 May 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    type: "article"
  },
];

export default function FeaturedComparisonInsights() {
  return (
    <section className="featured-comparison-insights" style={{ padding: "40px 8% 20px", backgroundColor: "#ffffff" }}>
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Featured Comparison Insights</h2>
        <Link href="/compare/insights" style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
          View All Insights <ChevronRight size={16} />
        </Link>
      </div>

      <div className="insights-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(4, 1fr)", 
        gap: "24px"
      }}>
        {comparisonInsights.map((insight) => (
          <div key={insight.id} className="comparison-insight-card" style={{ 
            backgroundColor: "#ffffff", 
            borderRadius: "12px", 
            border: "1px solid #f3f4f6", 
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s ease",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}>
            <div style={{ position: "relative", height: "160px", overflow: "hidden" }}>
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
                  backgroundColor: "rgba(0,0,0,0.3)"
                }}>
                  <div style={{ 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "50%", 
                    backgroundColor: "rgba(255,255,255,0.2)", 
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Play size={20} fill="white" color="white" style={{ marginLeft: "2px" }} />
                  </div>
                  <div style={{ position: "absolute", bottom: "12px", right: "12px", color: "white", fontSize: "10px", fontWeight: 600, background: "rgba(0,0,0,0.5)", padding: "2px 6px", borderRadius: "4px" }}>
                    {insight.duration}
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ 
                  backgroundColor: insight.tagBg, 
                  color: insight.tagColor, 
                  padding: "4px 8px", 
                  borderRadius: "6px", 
                  fontSize: "10px", 
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em"
                }}>
                  {insight.tag}
                </span>
              </div>
              
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", margin: "0 0 8px 0", lineHeight: "1.3" }}>
                {insight.title}
              </h3>
              
              <p style={{ 
                fontSize: "14px", 
                color: "#64748b", 
                margin: "0 0 16px 0", 
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
                gap: "8px", 
                color: "#94a3b8", 
                fontSize: "12px",
                marginTop: "auto",
                paddingTop: "12px",
                borderTop: "1px solid #f1f5f9"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {insight.type === "video" ? <Play size={14} /> : <Calendar size={14} />}
                  {insight.date}
                </div>
                <span>•</span>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {insight.type === "video" ? <LayoutGrid size={14} /> : <Clock size={14} />}
                  {insight.readTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .comparison-insight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
          border-color: #e5e7eb;
        }
        @media (max-width: 1024px) {
          .insights-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        @media (max-width: 640px) {
          .featured-comparison-insights {
            padding: 24px 16px !important;
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
          .comparison-insight-card {
            min-width: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
