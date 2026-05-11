"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AiBar from "../components/AiBar";
import ChatOverlay from "../components/ChatOverlay";
import FeaturedMarketInsights from "../components/FeaturedMarketInsights";
import MarketThemes from "../components/MarketThemes";
import InvestorVideoBriefing from "../components/InvestorVideoBriefing";

export default function MarketPage() {
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
    <div className="market-page" style={{ backgroundColor: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar onOpenAi={() => handleOpenAi()} />
      <main className="main-content" style={{ flex: 1, position: "relative" }}>
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>
                Markets
              </p>
              <h1 className="hero-title">
                Dubai Property<br />
                Market Insights
              </h1>
              <p className="market-hero-description" style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 400, marginTop: "12px", maxWidth: "90%", lineHeight: "1.4" }}>
                In-depth research and expert analysis across Dubai&apos;s key property markets.
              </p>
            </div>
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000" 
                alt="Dubai Skyline" 
                className="hero-image"
              />
              <div className="hero-image-overlay"></div>
            </div>
          </div>
        </section>
        
        <section className="market-intro-section" style={{ 
          padding: "0px 8% 12px", 
          backgroundColor: "#ffffff", 
          position: "relative", 
          zIndex: 50,
          marginTop: "-8px"
        }}>
          <p className="market-intro-text" style={{ 
            fontSize: "18px", 
            lineHeight: "1.6", 
            color: "#1a1a1a", 
            maxWidth: "1150px", 
            marginTop: "20px",
            fontWeight: 400
          }}>
            Dubai&apos;s real estate market continues to demonstrate strong resilience and long-term growth potential, driven by a business-friendly environment, world-class infrastructure, and sustained demand from global investors. With population growth, tourism expansion, and strategic government initiatives, Dubai remains one of the most attractive real estate markets in the world.
          </p>
        </section>

        <div style={{ backgroundColor: "#ffffff", position: "relative", zIndex: 50 }}>
          <FeaturedMarketInsights />
        </div>

        <section className="market-secondary-section" style={{ padding: "10px 5% 40px" }}>
          <div className="split-container" style={{ display: "flex", gap: "40px" }}>
            <div className="split-column" style={{ flex: "1" }}>
              <MarketThemes />
            </div>
            <div className="split-column" style={{ flex: "1" }}>
              <InvestorVideoBriefing />
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @media (max-width: 1024px) {
          .market-secondary-section {
            padding-top: 0 !important;
          }
          .split-container {
            flex-direction: column !important;
            gap: 20px !important;
          }
          .empty-column {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .market-intro-section {
            padding: 0 16px 4px !important;
            margin-top: -12px !important;
          }
          .market-intro-text {
            font-size: 12px !important;
            line-height: 1.4 !important;
            color: #4b5563 !important;
            margin: 0 !important;
          }
        }
      `}</style>

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
