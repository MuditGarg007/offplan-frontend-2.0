"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Search, X, ChevronRight, BookOpen, MapPin, Building2, User2, LayoutGrid, Clock, Calendar } from "lucide-react";
import Link from "next/link";

const SUGGESTIONS = [
  "Dubai South Guide",
  "Dubai South Projects",
  "Dubai South vs Expo City",
  "Best Communities in Dubai South"
];

const TABS = [
  { id: "all", label: "All", count: 128, icon: LayoutGrid },
  { id: "guides", label: "Guides", count: 24, icon: BookOpen },
  { id: "areas", label: "Areas", count: 12, icon: MapPin },
  { id: "projects", label: "Projects", count: 56, icon: Building2 },
  { id: "developers", label: "Developers", count: 6, icon: User2 },
];

const GUIDES_RESULTS = [
  {
    id: 1,
    title: "Why Invest in Dubai South in 2026",
    tag: "AREA GUIDE",
    date: "12 May 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Best Communities for Families in Dubai South",
    tag: "AREA GUIDE",
    date: "5 Apr 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    title: "Dubai South Infrastructure: The Complete Guide",
    tag: "AREA GUIDE",
    date: "28 Mar 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1582653280643-e3929497e742?auto=format&fit=crop&q=80&w=400",
  }
];

const AREAS_RESULTS = [
  {
    id: 1,
    title: "Dubai South",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    title: "Expo City Dubai",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=400",
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("Dubai South");
  const [activeTab, setActiveTab] = useState("all");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleClear = () => setSearchQuery("");

  return (
    <div className="search-page" style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Navbar onOpenAi={() => {}} />
      
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: isDesktop ? "40px 24px" : "24px 16px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#1a1a1a", marginBottom: "32px" }}>Search</h1>

        {/* Search Bar */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            border: "1.5px solid #e5e7eb",
            borderRadius: "10px",
            padding: "0 20px",
            height: "60px",
            gap: "14px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
          }}>
            <Search size={22} color="#1a1a1a" strokeWidth={2.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties, areas, guides..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "18px",
                fontWeight: 500,
                color: "#1a1a1a",
                background: "transparent"
              }}
            />
            {searchQuery && (
              <button 
                onClick={handleClear} 
                style={{ 
                  background: "#d1d5db", 
                  border: "none", 
                  cursor: "pointer", 
                  width: "22px", 
                  height: "22px", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  padding: 0
                }}
              >
                <X size={14} color="#ffffff" strokeWidth={3} />
              </button>
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px", overflowX: "auto", whiteSpace: "nowrap", paddingBottom: "4px" }}>
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#1a1a1a" }}>Suggestions:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSearchQuery(s)}
              style={{
                padding: "6px 14px",
                borderRadius: "100px",
                border: "1.2px solid #f0f0f0",
                backgroundColor: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                color: "#1a1a1a",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ 
          display: "flex", 
          gap: "4px", 
          border: "1px solid #f0f0f0", 
          borderRadius: "10px", 
          padding: "4px", 
          marginBottom: "28px",
          backgroundColor: "#ffffff"
        }}>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: isActive ? "#FAF7ED" : "transparent",
                  color: isActive ? "#C9A84C" : "#1a1a1a",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flex: 1,
                  justifyContent: "center",
                  transition: "all 0.2s"
                }}
              >
                <Icon size={18} color={isActive ? "#C9A84C" : "#1a1a1a"} strokeWidth={1.8} />
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* Results Info */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Showing results for <span style={{ color: "#C9A84C", fontWeight: 700 }}>"{searchQuery}"</span>
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {/* Guides Section */}
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1a1a1a" }}>Guides</h2>
              <Link href="/guides" style={{ fontSize: "13px", fontWeight: 600, color: "#666", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                See all (24) <ChevronRight size={14} />
              </Link>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {GUIDES_RESULTS.map((guide) => (
                <div key={guide.id} style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#ffffff",
                  gap: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}>
                  <img src={guide.image} alt={guide.title} style={{ width: "160px", height: "100px", borderRadius: "8px", objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "#C9A84C", backgroundColor: "#FAF7ED", padding: "3px 8px", borderRadius: "4px", textTransform: "uppercase", marginBottom: "8px", display: "inline-block", letterSpacing: "0.02em" }}>
                      {guide.tag}
                    </span>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", marginBottom: "10px", lineHeight: 1.25 }}>{guide.title}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Calendar size={14} />
                        {guide.date}
                      </div>
                      <span style={{ opacity: 0.5 }}>•</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={14} />
                        {guide.readTime}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={22} color="#1a1a1a" strokeWidth={1.5} />
                </div>
              ))}
            </div>
          </section>

          {/* Areas Section */}
          <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1a1a1a" }}>Areas</h2>
              <Link href="/areas" style={{ fontSize: "13px", fontWeight: 600, color: "#666", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                See all (12) <ChevronRight size={14} />
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {AREAS_RESULTS.map((area) => (
                <div key={area.id} style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#ffffff",
                  gap: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}>
                  <img src={area.image} alt={area.title} style={{ width: "160px", height: "100px", borderRadius: "8px", objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", marginBottom: "6px" }}>{area.title}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#666", fontWeight: 500 }}>
                      <MapPin size={16} color="#9ca3af" />
                      {area.location}
                    </div>
                  </div>
                  <ChevronRight size={22} color="#1a1a1a" strokeWidth={1.5} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        button:hover {
          opacity: 0.8;
        }
        div[style*="cursor: pointer"]:hover {
          border-color: #C9A84C22 !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
