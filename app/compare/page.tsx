"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AiBar from "../components/AiBar";
import ChatOverlay from "../components/ChatOverlay";

import FeaturedComparisonInsights from "../components/FeaturedComparisonInsights";
import ComparisonCategories from "../components/ComparisonCategories";

export default function ComparePage() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleOpenAi = (message: string = "") => {
    setAiMessage(message);
    setIsAiOpen(true);
  };

  return (
    <div className="compare-page" style={{ backgroundColor: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar onOpenAi={() => handleOpenAi()} />
      <main className="main-content" style={{ flex: 1, position: "relative" }}>
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>
                COMPARE
              </p>
              <h1 className="hero-title">
                Smart Comparisons.<br />Smarter Decisions.
              </h1>
              <p style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 400, marginTop: "12px", maxWidth: "90%", lineHeight: "1.4" }}>
                Compare markets, areas, developers, projects, payment plans and more to find the right investment that aligns with your goals.
              </p>
            </div>
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" 
                alt="Data Comparison" 
                className="hero-image"
              />
              <div className="hero-image-overlay"></div>
            </div>
          </div>
        </section>

        <FeaturedComparisonInsights />
        <ComparisonCategories />
      </main>

      <AiBar onOpenAi={handleOpenAi} />

      <div className={`chat-container-wrapper ${isAiOpen ? "is-visible" : ""}`}>
        <ChatOverlay
          isOpen={isAiOpen}
          onClose={() => setIsAiOpen(false)}
          initialMessage={aiMessage}
          onOpenRecs={() => {
            window.location.href = "/recommendations";
          }}
          isDesktop={isDesktop}
        />
      </div>
    </div>
  );
}
