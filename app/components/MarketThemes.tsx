"use client";

import React from "react";
import { Home, Zap, Building, Globe } from "lucide-react";

const themes = [
  {
    title: "High Rental Yield",
    count: "18 Articles",
    icon: <Home size={18} className="text-gray-900" />,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Future Infrastructure",
    count: "14 Articles",
    icon: <Zap size={18} className="text-gray-900" />,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Off-Plan Opportunities",
    count: "14 Articles",
    icon: <Building size={18} className="text-gray-900" />,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Economic Outlook",
    count: "16 Articles",
    icon: <Globe size={18} className="text-gray-900" />,
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
  },
];

export default function MarketThemes() {
  return (
    <div className="market-themes-container" style={{ padding: "0 0 40px 0" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a1a", marginBottom: "20px" }}>Market Themes</h2>
      <div className="themes-grid" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(4, 1fr)", 
        gap: "10px" 
      }}>
        {themes.map((theme, index) => (
          <div key={index} className="theme-card" style={{
            position: "relative",
            height: "200px",
            borderRadius: "12px",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.3s ease",
            border: "none",
            backgroundColor: "#f0f0f0"
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
                objectFit: "cover",
                zIndex: 1
              }}
            />
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.9) 10%, rgba(0,0,0,0.4) 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 8px",
              textAlign: "center",
              zIndex: 2
            }}>
              <div style={{
                width: "42px",
                height: "42px",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
              }}>
                {React.cloneElement(theme.icon as React.ReactElement, { size: 20 })}
              </div>
              <h3 style={{ color: "#ffffff", fontSize: "14px", fontWeight: 700, margin: "0 0 4px 0", lineHeight: "1.2", maxWidth: "95%", wordBreak: "break-word" }}>{theme.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "8.5px", fontWeight: 500, margin: 0 }}>{theme.count}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .theme-card {
            height: 160px !important;
          }
        }
      `}</style>
      <style jsx>{`
        .theme-card:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}
