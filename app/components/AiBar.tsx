"use client";

import { SendHorizonal, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function AiBar({ onOpenAi }: { onOpenAi: (msg: string) => void }) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    const text = inputValue.trim();
    onOpenAi(text);
    if (text) setInputValue("");
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
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "999px",
        padding: "8px 8px 8px 16px",
        gap: "6px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <button
        aria-label="Expand"
        onClick={() => onOpenAi("")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
          flexShrink: 0,
        }}
      >
        <ChevronUp size={20} strokeWidth={2.5} />
      </button>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask anything about Dubai real estate..."
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
          width: "34px",
          height: "34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          flexShrink: 0,
          borderRadius: "999px",
          transition: "background 0.15s",
        }}
      >
        <SendHorizonal size={17} strokeWidth={2} />
      </button>
    </div>
  );
}
