"use client";

import React, { useState, useEffect } from 'react';
import { User, Globe, Plane, Users, LineChart, Play, Clock, ChevronRight } from 'lucide-react';

const GuideSelection = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoId = "3P2eS3e5_40"; // Example video ID for Golden Visa

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const tracks = [
    { name: "First-time Investor", icon: <User size={28} strokeWidth={1.5} /> },
    { name: "Foreign Buyer", icon: <Globe size={28} strokeWidth={1.5} /> },
    { name: "NRI Investor", icon: <Plane size={28} strokeWidth={1.5} /> },
    { name: "Family Buyer", icon: <Users size={28} strokeWidth={1.5} /> },
    { name: "Yield-focused Investor", icon: <LineChart size={28} strokeWidth={1.5} /> },
  ];

  return (
    <section className="guide-selection-section" style={{ 
      padding: isDesktop ? "20px 8% 0" : "16px 16px 0",
      backgroundColor: "#ffffff",
      display: "grid",
      gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
      gap: "48px",
      alignItems: "start"
    }}>
      {/* Left Column: Start Here */}
      <div className="start-here-column">
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a1a", marginBottom: "8px" }}>Start Here</h2>
        <p style={{ fontSize: "14px", color: "#4a4a4a", marginBottom: "32px" }}>Choose your goal and we'll guide you to the right insights.</p>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isDesktop ? "repeat(5, 1fr)" : "repeat(2, 1fr)", 
          gap: "12px" 
        }}>
          {tracks.map((track, i) => (
            <div key={i} style={{
              background: "#ffffff",
              border: "1px solid #f2f2f2",
              borderRadius: "12px",
              padding: "20px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "16px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C9A84C";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#f2f2f2";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <div style={{ color: "#C9A84C" }}>{track.icon}</div>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#1a1a1a", lineHeight: "1.3" }}>{track.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Featured Guide */}
      <div className="featured-guide-column">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a1a" }}>Featured Guide (Video)</h2>
          <a href="/guides" style={{ color: "#C9A84C", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
            View all guides <ChevronRight size={16} />
          </a>
        </div>

        <div 
          className="featured-video-card" 
          onClick={() => !playing && setPlaying(true)}
          style={{ 
            background: "#ffffff",
            border: "1px solid #f0f0f0",
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
            cursor: playing ? "default" : "pointer",
            width: "100%"
          }}
        >
          {/* Thumbnail/Video */}
          <div style={{ 
            width: isDesktop ? "38%" : "100%", 
            height: isDesktop ? "auto" : "180px", 
            position: "relative",
            backgroundColor: "#000"
          }}>
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
                title="Dubai Golden Visa"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              <>
                <img 
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000" 
                  alt="Golden Visa Guide" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ 
                  position: "absolute", 
                  inset: 0, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.1)"
                }}>
                  <div style={{ 
                    width: "48px", 
                    height: "48px", 
                    background: "rgba(255,255,255,0.2)", 
                    backdropFilter: "blur(8px)",
                    borderRadius: "50%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    border: "1px solid rgba(255,255,255,0.3)"
                  }}>
                    <Play fill="white" color="white" size={20} />
                  </div>
                </div>
                <div style={{ 
                  position: "absolute", 
                  bottom: "10px", 
                  right: "10px", 
                  background: "rgba(0,0,0,0.7)", 
                  color: "white", 
                  padding: "3px 6px", 
                  borderRadius: "4px", 
                  fontSize: "10px", 
                  fontWeight: 600 
                }}>
                  12:48
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div style={{ 
            width: isDesktop ? "62%" : "100%", 
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <span style={{ 
              background: "#FFF9E6", 
              color: "#C9A84C", 
              fontSize: "10px", 
              fontWeight: 800, 
              padding: "3px 6px", 
              borderRadius: "4px",
              alignSelf: "flex-start",
              marginBottom: "8px",
              textTransform: "uppercase"
            }}>
              Visa Guide
            </span>
            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1a1a1a", marginBottom: "8px", lineHeight: "1.3" }}>
              Dubai Golden Visa Through Property 2026: Complete Guide
            </h3>
            <p style={{ fontSize: "13px", color: "#4a4a4a", lineHeight: "1.5", marginBottom: "16px" }}>
              Everything you need to know about eligibility, property criteria, benefits and the application process.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#6b7280" }}>
                <Clock size={14} />
                <span>12 min watch</span>
              </div>
              <span style={{ color: "#e5e7eb" }}>•</span>
              <span style={{ 
                background: "#E6F6EC", 
                color: "#059669", 
                fontSize: "10px", 
                fontWeight: 700, 
                padding: "2px 8px", 
                borderRadius: "4px" 
              }}>
                Beginner
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideSelection;
