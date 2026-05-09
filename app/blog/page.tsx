"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ArticleHeader from "../components/ArticleHeader";
import KeyMetrics from "../components/KeyMetrics";
import VideoEmbed from "../components/VideoEmbed";
import ExecutiveSummary from "../components/ExecutiveSummary";
import AiSuggestions from "../components/AiSuggestions";
import ArticleIndex from "../components/ArticleIndex";
import ArticleSection1 from "../components/ArticleSection1";
import ArticleSection2 from "../components/ArticleSection2";
import ArticleSection3 from "../components/ArticleSection3";
import ArticleSection4 from "../components/ArticleSection4";
import ArticleSection5 from "../components/ArticleSection5";
import ArticleSection6 from "../components/ArticleSection6";
import ArticleSection7 from "../components/ArticleSection7";
import AiBar from "../components/AiBar";
import ContinueExploring from "../components/ContinueExploring";
import PersonalisedRecommendations from "../components/PersonalisedRecommendations";
import ArticleActions from "../components/ArticleActions";
import ChatOverlay from "../components/ChatOverlay";

export default function BlogPage() {
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
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", display: "flex", flexDirection: "column" }}>
      <Navbar onOpenAi={() => handleOpenAi()} />
      <main className="main-content" style={{ flex: 1, position: "relative" }}>
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
          <PersonalisedRecommendations />
          <ArticleActions />
        </div>
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
