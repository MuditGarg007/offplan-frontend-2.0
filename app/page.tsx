"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ArticleHeader from "./components/ArticleHeader";
import KeyMetrics from "./components/KeyMetrics";
import VideoEmbed from "./components/VideoEmbed";
import ExecutiveSummary from "./components/ExecutiveSummary";
import AiSuggestions from "./components/AiSuggestions";
import ArticleIndex from "./components/ArticleIndex";
import ArticleSection1 from "./components/ArticleSection1";
import ArticleSection2 from "./components/ArticleSection2";
import ArticleSection3 from "./components/ArticleSection3";
import ArticleSection4 from "./components/ArticleSection4";
import ArticleSection5 from "./components/ArticleSection5";
import ArticleSection6 from "./components/ArticleSection6";
import ArticleSection7 from "./components/ArticleSection7";
import AiBar from "./components/AiBar";
import ContinueExploring from "./components/ContinueExploring";
import PersonalisedRecommendations from "./components/PersonalisedRecommendations";
import ArticleActions from "./components/ArticleActions";
import ChatOverlay from "./components/ChatOverlay";
import RecommendationsOverlay from "./components/RecommendationsOverlay";

export default function Home() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [isRecsOpen, setIsRecsOpen] = useState(false);
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
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", display: "flex", flexDirection: "column" }}>
      <Navbar onOpenAi={() => handleOpenAi()} />
      <main className="main-content" style={{ flex: 1, position: "relative" }}>
        <aside className="toc-rail">
          <div className="toc-content">
            <div className="toc-section">
              <h3 className="toc-heading">Menu</h3>
              <nav className="toc-nav">
                <button className="toc-link active">
                  <span>Market</span>
                </button>
                <button className="toc-link">
                  <span>Areas</span>
                </button>
                <button className="toc-link">
                  <span>Developers</span>
                </button>
                <button className="toc-link">
                  <span>Guides</span>
                </button>
                <button className="toc-link">
                  <span>Compare</span>
                </button>
                <button className="toc-link">
                  <span>About Offplan</span>
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <div className="article-column">
          <ArticleHeader />
          <KeyMetrics />
          <VideoEmbed />
          <ExecutiveSummary />
          <AiSuggestions onOpenAi={handleOpenAi} />
          <ArticleIndex />
          <ArticleSection1 />
          <ArticleSection2 />
          <ArticleSection3 />
          <ArticleSection4 />
          <ArticleSection5 />
          <ArticleSection6 />
          <ArticleSection7 />
          <ContinueExploring />
          <PersonalisedRecommendations onOpenRecs={() => setIsRecsOpen(true)} />
          <ArticleActions />
        </div>

        <aside className="content-rail" />
      </main>

      <AiBar onOpenAi={handleOpenAi} />

      {/* Overlays at root for mobile compatibility, docked via CSS on desktop */}
      <div className={`chat-container-wrapper ${isDesktop ? "is-desktop-docked" : ""} ${isAiOpen || isDesktop ? "is-visible" : ""}`}>
        <ChatOverlay 
          isOpen={isAiOpen} 
          onClose={() => setIsAiOpen(false)} 
          initialMessage={aiMessage} 
          onOpenRecs={() => setIsRecsOpen(true)}
          isForcedOpen={isDesktop}
        />
      </div>

      <div className={`recs-container-wrapper ${isDesktop ? "is-desktop-docked" : ""} ${isRecsOpen ? "is-visible" : ""}`}>
        <RecommendationsOverlay
          isOpen={isRecsOpen}
          onClose={() => setIsRecsOpen(false)}
        />
      </div>
    </div>
  );
}
