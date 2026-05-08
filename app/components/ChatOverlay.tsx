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
  isForcedOpen?: boolean;
  isDesktop?: boolean;
}

const MOCK_AI_RESPONSE = `The expansion of Al Maktoum International Airport is expected to significantly increase property values in Dubai South over the long term. Based on similar infrastructure-led growth patterns in Dubai:

• Areas near major transport hubs typically see 15–25% price appreciation within 3–5 years.

• Rental demand increases due to logistics, aviation, and commercial activity.

• Early-entry areas benefit the most before large-scale completion.

Sources: See section 1 and 2 of this article.`;

export default function ChatOverlay({ isOpen, onClose, initialMessage, onOpenRecs, isForcedOpen, isDesktop }: ChatOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [followUp, setFollowUp] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag-to-dismiss state
  const [dragY, setDragY] = useState(0);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);

  // Effectively open if state is open OR if we force it open on desktop
  const effectiveOpen = isOpen || isForcedOpen;

  useEffect(() => {
    if (effectiveOpen && messages.length === 0) {
      setMessages([
        { role: "ai", text: "Hello! I'm your Dubai South assistant. Ask me anything about this article or the local property market." },
      ]);
    }
  }, [effectiveOpen, messages.length]);

  useEffect(() => {
    if (isOpen && initialMessage) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: initialMessage },
        { role: "ai", text: MOCK_AI_RESPONSE },
      ]);
    }
  }, [isOpen, initialMessage]);

  useEffect(() => {
    if (effectiveOpen && containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, effectiveOpen]);

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
        className="chat-overlay-backdrop"
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
        className="chat-overlay-panel"
        style={{
          position: "fixed",
          bottom: 0,
          left: isDesktop ? "calc(50% - 440px)" : 0,
          right: isDesktop ? "auto" : 0,
          width: isDesktop ? "880px" : "auto",
          zIndex: 201,
          height: isDesktop ? "88vh" : "82vh",
          backgroundColor: "#ffffff",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          display: "flex",
          flexDirection: "column",
          transform: effectiveOpen
            ? `translateY(${dragY}px)`
            : "translateY(100%)",
          transition: isAnimating ? "transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)" : "none",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        {/* Drag handle — touch target, hidden on desktop */}
        <div
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          className="chat-drag-handle"
          style={{
            display: isDesktop ? "none" : "flex",
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
            padding: isDesktop ? "24px 32px 8px" : "4px 16px 8px",
          }}
        >
          <Star size={16} strokeWidth={1.8} color="#C9A84C" fill="#C9A84C" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", flex: 1 }}>Ask Offplan AI</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="chat-close-btn"
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
        <div style={{ padding: isDesktop ? "0 32px 10px" : "0 16px 10px" }}>
          <span style={{ fontSize: "12px", color: "#888888" }}>About: Why Invest in Dubai South in 2026</span>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "#EBEBEB", margin: isDesktop ? "0 32px" : "0 16px" }} />

        {/* Messages */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            overscrollBehavior: "contain",
            padding: isDesktop ? "16px 32px 8px" : "16px 16px 8px",
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
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#ffffff",
                    backgroundColor: "#C9A84C",
                    border: "none",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "6px",
                    alignSelf: "flex-start",
                    letterSpacing: "0.01em",
                  }}
                >
                  Get Personalized Recommendations →
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
        </div>

        {/* Follow-up input */}
        <div style={{ padding: isDesktop ? "12px 32px" : "12px 14px", backgroundColor: "#ffffff" }}>
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
