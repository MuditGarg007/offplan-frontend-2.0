"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Trophy, Shield, Lightbulb, Users } from "lucide-react";

const themes = [
  {
    id: 1,
    title: "Proven Track Record",
    count: "18 Articles",
    icon: <Trophy size={20} />,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Timely Delivery Performance",
    count: "16 Articles",
    icon: <Shield size={20} />,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Innovation & Design",
    count: "14 Articles",
    icon: <Lightbulb size={20} />,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Customer Satisfaction",
    count: "12 Articles",
    icon: <Users size={20} />,
    image: "https://images.unsplash.com/photo-1582647509711-c8aa8a8bda71?auto=format&fit=crop&q=80&w=800"
  }
];

export default function DeveloperThemes() {
  return (
    <section className="developer-themes" style={{ padding: "0 8% 40px", backgroundColor: "#ffffff" }}>
      <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Developer Themes</h2>
        <Link href="/developers" style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
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
            height: "110px",
            borderRadius: "12px",
            overflow: "hidden",
            cursor: "pointer",
            transition: "transform 0.2s ease"
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
              backgroundColor: "rgba(0,0,0,0.65)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
              zIndex: 2
            }}>
              <div style={{ 
                width: "40px", 
                height: "40px", 
                borderRadius: "50%", 
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1a1a1a",
                marginBottom: "8px",
                flexShrink: 0,
                aspectRatio: "1/1"
              }}>
                {theme.icon}
              </div>
              <h3 style={{ 
                fontSize: "14px", 
                fontWeight: 700, 
                color: "white", 
                margin: 0, 
                textAlign: "center",
                lineHeight: "1.2"
              }}>
                {theme.title}
              </h3>
              <p style={{ 
                fontSize: "11px", 
                color: "rgba(255,255,255,0.8)", 
                margin: "4px 0 0 0",
                fontWeight: 500
              }}>
                {theme.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .theme-card:hover {
          transform: translateY(-3px);
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
            height: 100px !important;
          }
        }
      `}</style>
    </section>
  );
}
