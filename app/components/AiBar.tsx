"use client";

import { SendHorizonal, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function AiBar({ onOpenAi }: { onOpenAi: (msg: string) => void }) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    onOpenAi(text);
    setInputValue("");
  };

  return (
    <div
      className="ai-bar-container"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "16px",
        right: "16px",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.85)",
        border: "1px solid rgba(220,200,150,0.45)",
        borderRadius: "999px",
        padding: "10px 14px 10px 18px",
        gap: "10px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflow: "hidden",
      }}
    >
      <button
        aria-label="Expand chat"
        onClick={() => onOpenAi("")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          width: "28px",
          height: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
          flexShrink: 0,
        }}
      >
        <ChevronUp size={20} strokeWidth={2} />
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask anything about Dubai South..."
        style={{
          flex: 1,
          border: "none",
          background: "transparent",
          outline: "none",
          fontSize: "14px",
          color: "#1a1a1a",
          fontFamily: "inherit",
          appearance: "none",
          WebkitAppearance: "none",
          borderRadius: 0,
          padding: 0,
          margin: 0,
        }}
      />
      <button
        aria-label="Send"
        onClick={handleSend}
        style={{
          background: "#000",
          border: "none",
          cursor: "pointer",
          padding: 0,
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          flexShrink: 0,
          borderRadius: "999px",
        }}
      >
        <SendHorizonal size={18} strokeWidth={2} />
      </button>
    </div>
  );
}
