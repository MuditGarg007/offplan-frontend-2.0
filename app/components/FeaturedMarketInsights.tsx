"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Calendar, Clock, ChevronRight, ChevronLeft } from "lucide-react";

const insights = [
  {
    id: 1,
    tag: "MARKET OUTLOOK",
    title: "Dubai Property Market Outlook 2026–2030",
    description: "Key trends, supply pipeline, demand drivers and price outlook.",
    date: "12 May 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    tag: "RENTAL MARKET",
    title: "Dubai Rental Market Report Q1 2026",
    description: "Rents, yields and tenant demand across key communities.",
    date: "9 May 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    tag: "INVESTMENT STRATEGY",
    title: "Where Smart Investors Are Looking in 2026",
    description: "High potential segments and investment strategies backed by data.",
    date: "7 May 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
  },
];

export default function FeaturedMarketInsights() {
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
    <section className="featured-insights-section" style={{ padding: "10px 5% 20px", backgroundColor: "#ffffff", position: "relative" }}>
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 750, color: "#1a1a1a", margin: 0, letterSpacing: "-0.02em" }}>Featured Market Insights</h2>
        <Link href="/blog" style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}>
          View All Insights <ChevronRight size={16} />
        </Link>
      </div>

      <div className="scroll-controls">
        <button 
          onClick={() => scroll("left")}
          className="scroll-btn left"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll("right")}
          className="scroll-btn right"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="insights-grid" ref={scrollRef} style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", 
        gap: "24px",
      }}>
        {insights.map((insight) => (
          <div key={insight.id} className="insight-card" style={{ 
            backgroundColor: "#ffffff", 
            borderRadius: "16px", 
            border: "1px solid #f2f2f2", 
            overflow: "hidden",
            display: "flex",
            minHeight: "180px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer"
          }}>
            <div style={{ width: "35%", minWidth: "130px", position: "relative" }}>
              <img 
                src={insight.image} 
                alt={insight.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ width: "65%", padding: "20px", display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1 }}>
                <span style={{ 
                  color: "#C9A84C", 
                  fontSize: "10px", 
                  fontWeight: 800, 
                  letterSpacing: "0.05em",
                  marginBottom: "10px",
                  display: "block"
                }}>
                  {insight.tag}
                </span>
                <h3 style={{ 
                  fontSize: "15px", 
                  fontWeight: 700, 
                  color: "#1a1a1a", 
                  margin: "0 0 10px 0", 
                  lineHeight: "1.4",
                  letterSpacing: "-0.01em"
                }}>
                  {insight.title}
                </h3>
                <p style={{ 
                  fontSize: "12px", 
                  color: "#4a4a4a", 
                  margin: 0, 
                  lineHeight: "1.6",
                  display: "-webkit-box", 
                  WebkitLineClamp: 2, 
                  WebkitBoxOrient: "vertical", 
                  overflow: "hidden" 
                }}>
                  {insight.description}
                </p>
              </div>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "12px", 
                color: "#9ca3af", 
                fontSize: "11px",
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid #f9fafb"
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Calendar size={13} strokeWidth={2} /> {insight.date}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Clock size={13} strokeWidth={2} /> {insight.readTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scroll-controls {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: none;
          justify-content: space-between;
          padding: 0 20px;
          pointer-events: none;
          z-index: 10;
        }
        .scroll-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          color: #1a1a1a;
          padding: 0;
        }
        .scroll-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }
        .scroll-btn.left { padding-right: 2px; }
        .scroll-btn.right { padding-left: 2px; }
        .insights-grid::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 1024px) {
          .featured-insights-section {
            padding: 20px 5% 0 !important;
          }
          .scroll-controls {
            display: flex;
          }
          .section-header h2 {
            font-size: 20px !important;
          }
          .section-header :global(a) {
            font-size: 13px !important;
          }
          .scroll-btn {
            width: 32px;
            height: 32px;
          }
          .scroll-btn :global(svg) {
            width: 16px;
            height: 16px;
          }
          .scroll-controls {
            padding: 0 5px;
          }
          .insights-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            padding: 0 5% 15px 0 !important;
            margin: 0 -5%;
            padding-left: 5% !important;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .insight-card {
            min-width: 85% !important;
            flex-shrink: 0 !important;
            scroll-snap-align: center;
          }
        }
        @media (max-width: 640px) {
          .insight-card {
            flex-direction: column !important;
            height: auto !important;
          }
          .insight-card > div:first-child {
            width: 100% !important;
            height: 140px !important;
          }
          .insight-card > div:last-child {
            width: 100% !important;
            padding: 15px !important;
          }
          .insight-card h3 {
            font-size: 14px !important;
          }
          .insight-card p {
            font-size: 11px !important;
          }
        }
        .insight-card:hover {
          border-color: #C9A84C33;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}
