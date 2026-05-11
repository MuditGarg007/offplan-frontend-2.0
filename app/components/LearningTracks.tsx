"use client";

import React, { useState, useEffect } from 'react';
import { Home, Shield, ClipboardList, DollarSign, Play, ChevronRight, BookOpen, Clock } from 'lucide-react';

const LearningTracks = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const tracks = [
    {
      title: "Buying in Dubai",
      description: "Everything you need to know before buying property in Dubai.",
      guides: 4,
      time: "32 min",
      level: "Beginner",
      levelColor: "#059669",
      levelBg: "#E6F6EC",
      icon: <Home size={18} />,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Golden Visa",
      description: "Step-by-step guides to understand the Dubai Golden Visa through property.",
      guides: 3,
      time: "28 min",
      level: "Beginner",
      levelColor: "#059669",
      levelBg: "#E6F6EC",
      icon: <Shield size={18} />,
      image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Off-Plan Handbook",
      description: "From booking to handover — everything about off-plan properties in Dubai.",
      guides: 5,
      time: "40 min",
      level: "Intermediate",
      levelColor: "#2563EB",
      levelBg: "#EBF5FF",
      icon: <ClipboardList size={18} />,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Investor Costs",
      description: "Understand the true cost of owning and exiting Dubai property.",
      guides: 4,
      time: "26 min",
      level: "Advanced",
      levelColor: "#7C3AED",
      levelBg: "#F5F3FF",
      icon: <DollarSign size={18} />,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section className="learning-tracks-section" style={{ 
      padding: isDesktop ? "0 8% 60px" : "0 16px 40px",
      backgroundColor: "#ffffff"
    }}>
      <div style={{ marginBottom: "12px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a1a", marginBottom: "0" }}>Learning Tracks</h2>
        <p style={{ fontSize: "13px", color: "#4a4a4a" }}>Explore structured guide collections on key topics.</p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "1fr", 
        gap: "16px" 
      }}>
        {tracks.map((track, i) => (
          <div key={i} style={{
            background: "#ffffff",
            border: "1px solid #f0f0f0",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            cursor: "pointer",
            transition: "all 0.2s ease",
            position: "relative",
            minHeight: "140px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#C9A84C";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#f0f0f0";
            e.currentTarget.style.boxShadow = "none";
          }}
          >
            {/* Left Image Part */}
            <div style={{ 
              width: isDesktop ? "100px" : "120px", 
              height: "100%", 
              position: "relative",
              flexShrink: 0
            }}>
              <img 
                src={track.image} 
                alt={track.title} 
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
                  width: "28px", 
                  height: "28px", 
                  background: "rgba(255,255,255,0.2)", 
                  backdropFilter: "blur(4px)",
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.3)"
                }}>
                  <Play fill="white" color="white" size={12} />
                </div>
              </div>
              <div style={{ 
                position: "absolute", 
                bottom: "6px", 
                left: "6px", 
                background: "rgba(0,0,0,0.7)", 
                color: "white", 
                padding: "2px 6px", 
                borderRadius: "4px", 
                fontSize: "8px", 
                fontWeight: 700,
                textTransform: "uppercase"
              }}>
                {track.guides} Guides
              </div>
            </div>

            {/* Right Content Part */}
            <div style={{ 
              flex: 1, 
              padding: "12px 12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minWidth: 0
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                  <div style={{ 
                    color: "#C9A84C", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                  }}>
                    {React.cloneElement(track.icon as React.ReactElement, { size: 14 })}
                  </div>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{track.title}</h3>
                </div>
                <p style={{ 
                  fontSize: "11px", 
                  color: "#4a4a4a", 
                  lineHeight: "1.4", 
                  marginBottom: "8px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {track.description}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "10px", color: "#6b7280" }}>
                    <BookOpen size={10} />
                    <span>{track.guides}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "10px", color: "#6b7280" }}>
                    <Clock size={10} />
                    <span>{track.time}</span>
                  </div>
                </div>
                <span style={{ 
                  background: track.levelBg, 
                  color: track.levelColor, 
                  fontSize: "9px", 
                  fontWeight: 700, 
                  padding: "1px 5px", 
                  borderRadius: "3px" 
                }}>
                  {track.level}
                </span>
              </div>
            </div>

            {/* Far Right Arrow - Hide on Desktop if too cramped, or keep very small */}
            {isDesktop ? null : (
              <div style={{ 
                padding: "0 8px", 
                display: "flex", 
                alignItems: "center", 
                color: "#d1d5db" 
              }}>
                <ChevronRight size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningTracks;
