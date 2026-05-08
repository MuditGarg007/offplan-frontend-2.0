"use client";

import { X, Star, ThumbsUp, ThumbsDown, Copy, Share2, SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage: string;
  onOpenRecs: () => void;
}

const MOCK_AI_RESPONSE = `The expansion of Al Maktoum International Airport is expected to significantly increase property values in Dubai South over the long term. Based on similar infrastructure-led growth patterns in Dubai:

• Areas near major transport hubs typically see 15–25% price appreciation within 3–5 years.

• Rental demand increases due to logistics, aviation, and commercial activity.

• Early-entry areas benefit the most before large-scale completion.

Sources: See section 1 and 2 of this article.`;

export default function ChatOverlay({ isOpen, onClose, initialMessage, onOpenRecs }: ChatOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [followUp, setFollowUp] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Drag-to-dismiss state
  const [dragY, setDragY] = useState(0);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);

  useEffect(() => {
    if (isOpen && initialMessage) {
      setMessages([
        { role: "user", text: initialMessage },
        { role: "ai", text: MOCK_AI_RESPONSE },
      ]);
    }
    if (!isOpen) {
      setMessages([]);
      setDragY(0);
    }
  }, [isOpen, initialMessage]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendFollowUp = () => {
    if (!followUp.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: followUp.trim() },
      { role: "ai", text: MOCK_AI_RESPONSE },
    ]);
    setFollowUp("");
  };

  const handleDragStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    dragStartY.current = e.touches[0].clientY;
  };

  const handleDragMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 0) setDragY(delta);
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (dragY > 100) {
      onClose();
      setDragY(0);
    } else {
      setDragY(0);
    }
  };

  const isAnimating = !isDragging.current && dragY === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 200,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Overlay Panel */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 201,
          height: "82vh",
          backgroundColor: "#ffffff",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          display: "flex",
          flexDirection: "column",
          transform: isOpen
            ? `translateY(${dragY}px)`
            : "translateY(100%)",
          transition: isAnimating ? "transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)" : "none",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        {/* Drag handle — touch target */}
        <div
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "10px",
            paddingBottom: "8px",
            cursor: "grab",
            touchAction: "none",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: "#D0D0D0",
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "4px 16px 8px",
          }}
        >
          <Star size={16} strokeWidth={1.8} color="#C9A84C" fill="#C9A84C" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", flex: 1 }}>Ask Offplan AI</span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
            }}
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Subtitle */}
        <div style={{ padding: "0 16px 10px" }}>
          <span style={{ fontSize: "12px", color: "#888888" }}>About: Why Invest in Dubai South in 2026</span>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "#EBEBEB", margin: "0 16px" }} />

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 16px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                  style={{
                    backgroundColor: "#1a1a1a",
                    color: "#ffffff",
                    borderRadius: "18px 18px 4px 18px",
                    padding: "11px 15px",
                    maxWidth: "80%",
                    fontSize: "14px",
                    lineHeight: 1.5,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ fontSize: "14px", color: "#1a1a1a", lineHeight: 1.65, whiteSpace: "pre-line" }}>
                  {msg.text}
                </div>
                <button
                  onClick={onOpenRecs}
                  style={{
                    display: "inline-block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#C9A84C",
                    backgroundColor: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textDecoration: "none",
                    marginTop: "6px",
                    textAlign: "left",
                  }}
                >
                  Get personalized recommendations →
                </button>
                <div style={{ display: "flex", gap: "4px", paddingTop: "4px" }}>
                  {[
                    { icon: <ThumbsUp size={16} strokeWidth={1.8} />, label: "Like" },
                    { icon: <ThumbsDown size={16} strokeWidth={1.8} />, label: "Dislike" },
                    { icon: <Copy size={16} strokeWidth={1.8} />, label: "Copy" },
                    { icon: <Share2 size={16} strokeWidth={1.8} />, label: "Share" },
                  ].map(({ icon, label }) => (
                    <button
                      key={label}
                      aria-label={label}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "6px 10px",
                        color: "#999999",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Follow-up input */}
        <div style={{ padding: "12px 14px", backgroundColor: "#ffffff" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: "999px",
              padding: "8px 8px 8px 16px",
              backgroundColor: "#fafafa",
              overflow: "hidden",
            }}
          >
            <input
              type="text"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendFollowUp()}
              placeholder="Ask a follow-up..."
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
              aria-label="Send follow-up"
              onClick={handleSendFollowUp}
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
              }}
            >
              <SendHorizonal size={17} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
