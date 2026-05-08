"use client";

import { ArrowLeft, Mic, Search, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navbarHeight: number;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

const INITIAL_RECENT = [
  "Dubai South rental yield",
  "Creek Harbour price growth",
  "Best 2BR under 2M",
];

export default function SearchOverlay({ 
  isOpen, 
  onClose, 
  navbarHeight, 
  searchQuery, 
  setSearchQuery 
}: SearchOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(INITIAL_RECENT);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5));
      }
    }
  };

  const removeRecent = (item: string) =>
    setRecentSearches((prev) => prev.filter((s) => s !== item));

  // Trap focus inside overlay when open
  useEffect(() => {
    if (isOpen) {
      const el = overlayRef.current?.querySelector<HTMLElement>("button, input, [tabindex]");
      el?.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);
  // Reset search state when closing
  useEffect(() => {
    if (!isOpen) {
      setHasSearched(false);
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="search-overlay-desktop"
      style={{
        position: "fixed",
        top: navbarHeight,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        zIndex: 200,
        transform: isOpen ? "translateY(0)" : "translateY(-100%)",
        opacity: isOpen ? 1 : 0,
        transition: "transform 0.32s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.28s ease",
        pointerEvents: isOpen ? "auto" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header bar (Mobile Only) */}
      <div
        className="search-header-mobile"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 16px",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Go back"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            color: "#1a1a1a",
            borderRadius: "8px",
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={22} strokeWidth={1.8} />
        </button>

        <form
          onSubmit={handleSearch}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "24px",
            padding: "0 16px",
            height: "48px",
            gap: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <button
            type="submit"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Search size={20} strokeWidth={1.5} color="#666666" style={{ flexShrink: 0 }} />
          </button>
          <input
            type="search"
            placeholder="Search properties, areas, guides…"
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontSize: "15px",
              color: "#1a1a1a",
              fontFamily: "inherit",
            }}
          />
          <Mic size={20} strokeWidth={1.5} color="#666666" style={{ flexShrink: 0, cursor: "pointer" }} />
        </form>
      </div>

      {/* Body */}
      <div 
        className="search-results-body"
        style={{ flex: 1, overflowY: "auto", padding: "8px 16px 24px" }}
      >
        {hasSearched ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* AI Summary Card */}
            <div
              style={{
                backgroundColor: "#FFFBEC",
                borderRadius: "16px",
                padding: "16px",
                border: "1px solid #FFF3C4",
                boxShadow: "0 2px 12px rgba(255, 243, 196, 0.2)",
              }}
            >
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  margin: "0 0 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                AI Summary
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.55,
                  color: "#1a1a1a",
                  margin: "0 0 12px",
                  fontWeight: 500
                }}
              >
                {searchQuery.toLowerCase().includes("dubai south") 
                  ? "Dubai South offers average rental yields of 6–7.5%, driven by airport expansion, logistics demand and master-planned communities."
                  : `Search results for "${searchQuery}" are being compiled. Based on current market data, this area is seeing significant interest due to its proximity to key transport links and upcoming infrastructure projects.`}
              </p>
              
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a" }}>
                  See 3 key insights
                </span>
                <ChevronDown size={20} color="#1a1a1a" strokeWidth={2.5} />
              </div>
            </div>

            {/* Top Articles Section */}
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  margin: "0 0 16px",
                }}
              >
                Top Articles (AI Ranked)
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  {
                    title: "Why Invest in Dubai South in 2026",
                    meta: "6.5% avg rental yield • 8 min read",
                    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=200",
                    gradient: "linear-gradient(90deg, #f0f7ff 0%, #ffffff 100%)"
                  },
                  {
                    title: "Dubai South vs Creek Harbour",
                    meta: "Detailed area comparison • 7 min read",
                    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=200",
                    gradient: "white"
                  },
                  {
                    title: "Best Communities for Families in Dubai South",
                    meta: "6 min read",
                    img: "https://images.unsplash.com/photo-1582653280643-e3929497e742?auto=format&fit=crop&q=80&w=200",
                    gradient: "white"
                  },
                  {
                    title: "Upcoming Metro Link to Dubai South",
                    meta: "Infrastructure Update • 5 min read",
                    img: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=200",
                    gradient: "white"
                  },
                  {
                    title: "Al Maktoum Airport Expansion Impact",
                    meta: "Market Insight • 10 min read",
                    img: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=200",
                    gradient: "white"
                  },
                  {
                    title: "Expo City Dubai: Post-Expo Legacy",
                    meta: "Area Analysis • 8 min read",
                    img: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=200",
                    gradient: "white"
                  },
                  {
                    title: "Top Schools in and around Dubai South",
                    meta: "Community Guide • 6 min read",
                    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=200",
                    gradient: "white"
                  },
                  {
                    title: "Rental Yield Comparison: South vs Arjan",
                    meta: "Investment Data • 7 min read",
                    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200",
                    gradient: "white"
                  },
                  {
                    title: "Off-plan Projects with Best Payment Plans",
                    meta: "Buying Guide • 9 min read",
                    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=200",
                    gradient: "white"
                  },
                  {
                    title: "The Rise of Residential Demand in 2026",
                    meta: "Market Trend • 5 min read",
                    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200",
                    gradient: "white"
                  }
                ].map((article, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      backgroundColor: article.gradient === "white" ? "#ffffff" : article.gradient.split(",")[1].trim().split(" ")[0],
                      background: article.gradient,
                      borderRadius: "14px",
                      border: "1px solid #f0f0f0",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                    }}
                  >
                    <img
                      src={article.img}
                      alt={article.title}
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", margin: "0 0 4px", lineHeight: 1.3 }}>
                        {article.title}
                      </h4>
                      <p style={{ fontSize: "12px", color: "#666666" }}>
                        {article.meta}
                      </p>
                    </div>
                    <ChevronRight size={18} color="#1a1a1a" style={{ opacity: 0.5 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Popular Searches */}
            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#1a1a1a",
                margin: "0 0 12px",
                letterSpacing: "0.01em",
              }}
            >
              Popular searches
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {[
                "Best areas for investment",
                "Projects under 2M",
                "High rental yield areas",
                "Dubai South vs Downtown",
                "Family communities",
                "Payment plan 60/20",
              ].map((label) => (
                <button
                  key={label}
                  onClick={() => {
                    setSearchQuery(label);
                    setHasSearched(true);
                  }}
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid #d1d5db",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    fontSize: "13px",
                    color: "#1a1a1a",
                    fontFamily: "inherit",
                    textAlign: "left",
                    cursor: "pointer",
                    lineHeight: 1.35,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {recentSearches.length > 0 && (
              <>
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #f0f0f0",
                    margin: "20px 0 16px",
                  }}
                />

                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    margin: "0 0 4px",
                    letterSpacing: "0.01em",
                  }}
                >
                  Recent searches
                </p>

                {recentSearches.map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      setSearchQuery(item);
                      setHasSearched(true);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "13px 0",
                      borderBottom: "1px solid #f5f5f5",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: "14px", color: "#1a1a1a" }}>{item}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecent(item);
                      }}
                      aria-label={`Remove ${item}`}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#9ca3af",
                        fontSize: "16px",
                        lineHeight: 1,
                        padding: "4px 0 4px 12px",
                        flexShrink: 0,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </>
            )}

            {/* Try Asking */}
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #f0f0f0",
                margin: "20px 0 16px",
              }}
            />

            <p
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#1a1a1a",
                margin: "0 0 12px",
              }}
            >
              Try asking
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Which areas are best for long-term rental yield?",
                "Compare Dubai South vs Creek Harbour",
                "What is the 5-year outlook for Dubai real estate?",
                "Show me family-friendly communities",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setSearchQuery(q);
                    setHasSearched(true);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#ffffff",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "8px 14px",
                    fontSize: "14px",
                    color: "#1a1a1a",
                    fontFamily: "inherit",
                    textAlign: "left",
                    cursor: "pointer",
                    gap: "12px",
                  }}
                >
                  <span style={{ flex: 1, lineHeight: 1.35 }}>{q}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
