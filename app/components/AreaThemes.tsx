"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Users, TrendingUp, Train, Ship } from "lucide-react";

const themes = [
  {
    id: 1,
    title: "Family Communities",
    count: "18 Articles",
    icon: <Users size={24} />,
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Emerging Corridors",
    count: "16 Articles",
    icon: <TrendingUp size={24} />,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Metro Connected",
    count: "20 Articles",
    icon: <Train size={24} />,
    image: "https://images.unsplash.com/photo-1563245159-f793f19d8c37?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Waterfront Living",
    count: "22 Articles",
    icon: <Ship size={24} />,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800"
  }
];

export default function AreaThemes() {
  return (
    <section className="area-themes" style={{ padding: "0 8% 20px", backgroundColor: "#ffffff" }}>
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Area Themes</h2>
        <Link href="/areas" style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="themes-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(4, 1fr)", 
        gap: "12px" 
      }}>
        {themes.map((theme) => (
          <div key={theme.id} className="theme-card" style={{ 
            position: "relative",
            height: "80px",
            borderRadius: "12px",
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform 0.2s ease",
            padding: 0
          }}>
            <img 
              src={theme.image} 
              alt={theme.title}
              style={{ 
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%", 
                height: "100%", 
                objectFit: "cover" 
              }}
            />
            <div style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              gap: "16px",
              zIndex: 2
            }}>
              <div style={{ 
                width: "44px", 
                height: "44px", 
                borderRadius: "50%", 
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1a1a1a",
                flexShrink: 0
              }}>
                {theme.icon}
              </div>
              <div style={{ color: "white" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 600, margin: 0 }}>{theme.title}</h3>
                <p style={{ fontSize: "13px", color: "white", margin: "2px 0 0 0" }}>{theme.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .theme-card:hover {
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .themes-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .themes-grid {
            grid-template-columns: 1fr !important;
          }
          .theme-card {
            height: 90px !important;
          }
        }
      `}</style>
    </section>
  );
}
