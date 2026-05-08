"use client";

import { useState } from "react";
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

  const handleOpenAi = (message: string = "") => {
    setAiMessage(message);
    setIsAiOpen(true);
  };
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}>
      <Navbar onOpenAi={() => handleOpenAi()} />
      <main className="main-content" style={{ paddingBottom: "80px" }}>
        <aside className="toc-rail" aria-hidden="true" />
        <div className="article-column">
          <ArticleHeader />
          <KeyMetrics />
          <VideoEmbed />
          <ExecutiveSummary />
          <AiSuggestions />
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
        <aside className="content-rail" aria-hidden="true" />
      </main>
      <AiBar onOpenAi={handleOpenAi} />
      <ChatOverlay 
        isOpen={isAiOpen} 
        onClose={() => setIsAiOpen(false)} 
        initialMessage={aiMessage} 
        onOpenRecs={() => setIsRecsOpen(true)}
      />
      <RecommendationsOverlay
        isOpen={isRecsOpen}
        onClose={() => setIsRecsOpen(false)}
      />
    </div>
  );
}
