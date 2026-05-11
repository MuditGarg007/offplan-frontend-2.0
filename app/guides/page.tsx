"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AiBar from "../components/AiBar";
import ChatOverlay from "../components/ChatOverlay";
import { BookOpen, PlayCircle, ShieldCheck, Sparkles } from "lucide-react";
import GuideSelection from "../components/GuideSelection";
import LearningTracks from "../components/LearningTracks";

export default function GuidesPage() {
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
    <div className="guides-page" style={{ backgroundColor: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar onOpenAi={() => handleOpenAi()} />
      <main className="main-content" style={{ flex: 1, position: "relative" }}>
        <section className="hero-section">
          <div className="hero-container" style={{ paddingBottom: "20px" }}>
            <div className="hero-content" style={{ width: isDesktop ? "65%" : "100%", maxWidth: "850px" }}>
              <p style={{ color: "#C9A84C", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", marginBottom: "8px", letterSpacing: "0.05em" }}>
                Guides & Insights
              </p>
              <h1 className="hero-title">
                Learn how Dubai real estate actually works
              </h1>
              <p style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 400, marginTop: "12px", maxWidth: "90%", lineHeight: "1.4", marginBottom: "16px" }}>
                From visas and mortgages to off-plan risks and ownership strategy — expert guides to help you make smarter property decisions.
              </p>

              {/* Feature Bar */}
              <div className="feature-bar" style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: isDesktop ? "24px" : "4px",
                background: "#ffffff",
                border: "1px solid #f0f0f0",
                borderRadius: "12px",
                padding: isDesktop ? "24px" : "8px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
                marginTop: "12px",
                width: "100%",
              }}>
                <div className="feature-item" style={{ display: "flex", alignItems: "flex-start", gap: isDesktop ? "16px" : "4px" }}>
                  <div style={{ color: "#C9A84C", flexShrink: 0, marginTop: "2px" }}>
                    <BookOpen size={isDesktop ? 28 : 16} strokeWidth={1.5} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <span style={{ fontSize: isDesktop ? "14px" : "8px", fontWeight: 700, color: "#1a1a1a", lineHeight: "1.1", whiteSpace: "nowrap" }}>Expert-curated</span>
                    <span style={{ fontSize: isDesktop ? "14px" : "8px", fontWeight: 700, color: "#1a1a1a", lineHeight: "1.1", whiteSpace: "nowrap" }}>guides</span>
                  </div>
                </div>
                <div className="feature-item" style={{ display: "flex", alignItems: "flex-start", gap: isDesktop ? "16px" : "4px" }}>
                  <div style={{ color: "#C9A84C", flexShrink: 0, marginTop: "2px" }}>
                    <PlayCircle size={isDesktop ? 28 : 16} strokeWidth={1.5} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <span style={{ fontSize: isDesktop ? "14px" : "8px", fontWeight: 700, color: "#1a1a1a", lineHeight: "1.1", whiteSpace: "nowrap" }}>Video lessons</span>
                    <span style={{ fontSize: isDesktop ? "14px" : "8px", fontWeight: 700, color: "#1a1a1a", lineHeight: "1.1", whiteSpace: "nowrap" }}>every guide</span>
                  </div>
                </div>
                <div className="feature-item" style={{ display: "flex", alignItems: "flex-start", gap: isDesktop ? "16px" : "4px" }}>
                  <div style={{ color: "#C9A84C", flexShrink: 0, marginTop: "2px" }}>
                    <ShieldCheck size={isDesktop ? 28 : 16} strokeWidth={1.5} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <span style={{ fontSize: isDesktop ? "14px" : "8px", fontWeight: 700, color: "#1a1a1a", lineHeight: "1.1", whiteSpace: "nowrap" }}>Actionable</span>
                    <span style={{ fontSize: isDesktop ? "14px" : "8px", fontWeight: 700, color: "#1a1a1a", lineHeight: "1.1", whiteSpace: "nowrap" }}>insights</span>
                  </div>
                </div>
                <div className="feature-item" style={{ display: "flex", alignItems: "flex-start", gap: isDesktop ? "16px" : "4px" }}>
                  <div style={{ color: "#C9A84C", flexShrink: 0, marginTop: "2px" }}>
                    <Sparkles size={isDesktop ? 28 : 16} strokeWidth={1.5} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <span style={{ fontSize: isDesktop ? "14px" : "8px", fontWeight: 700, color: "#1a1a1a", lineHeight: "1.1", whiteSpace: "nowrap" }}>Updated for</span>
                    <span style={{ fontSize: isDesktop ? "14px" : "8px", fontWeight: 700, color: "#1a1a1a", lineHeight: "1.1", whiteSpace: "nowrap" }}>Dubai 2026</span>
                  </div>
                </div>
              </div>
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

        <GuideSelection />
        <LearningTracks />
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
