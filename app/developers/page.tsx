"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AiBar from "../components/AiBar";
import ChatOverlay from "../components/ChatOverlay";
import FeaturedDeveloperInsights from "../components/FeaturedDeveloperInsights";
import DeveloperThemes from "../components/DeveloperThemes";

export default function DevelopersPage() {
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
    <div className="developers-page" style={{ backgroundColor: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar onOpenAi={() => handleOpenAi()} />
      <main className="main-content" style={{ flex: 1, position: "relative" }}>
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>
                Developers
              </p>
              <h1 className="hero-title" style={{ marginBottom: "12px", whiteSpace: "nowrap" }}>
                Dubai&apos;s Leading Property Developers
              </h1>
              <p className="area-hero-subdescription" style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: 400, marginTop: "0", maxWidth: "90%", lineHeight: "1.4" }}>
                In-depth developer profiles, project track records, delivery performance and insights to help you invest with confidence.
              </p>
            </div>
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
                alt="Modern Architecture" 
                className="hero-image"
              />
              <div className="hero-image-overlay"></div>
            </div>
          </div>
        </section>

        <section className="developer-intro-section" style={{ 
          padding: "0px 8% 12px", 
          backgroundColor: "#ffffff", 
          position: "relative", 
          zIndex: 50,
          marginTop: "-8px"
        }}>
          <p className="developer-intro-text" style={{ 
            fontSize: "18px", 
            lineHeight: "1.6", 
            color: "#1a1a1a", 
            maxWidth: "1150px", 
            marginTop: "20px",
            fontWeight: 400
          }}>
            We analyze Dubai&apos;s top property developers based on track record, project quality, timely delivery, innovation and customer satisfaction. Compare developer performance and explore their upcoming projects to make informed investment decisions.
          </p>
        </section>

        <FeaturedDeveloperInsights />
        <DeveloperThemes />
      </main>

      <style jsx>{`
        @media (max-width: 768px) {
          .developer-intro-section {
            padding: 0 16px 4px !important;
            margin-top: -12px !important;
          }
          .developer-intro-text {
            font-size: 12px !important;
            line-height: 1.4 !important;
            color: #4b5563 !important;
            margin-top: 20px !important;
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
