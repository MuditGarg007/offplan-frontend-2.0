"use client";

import { X, Star, ThumbsUp, ThumbsDown, Copy, Share2, SendHorizonal, Square } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useAskStream } from "@/hooks/useAskStream";
import { AskResponse, StructuredChunk } from "@/lib/api/askStream";

type ChatMessage =
  | { role: "user"; content: string }
  | { role: "assistant"; chunks: StructuredChunk[]; result: AskResponse | null };

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage: string;
  onOpenRecs: () => void;
  isForcedOpen?: boolean;
  isDesktop?: boolean;
}

// ─── Renderers ───────────────────────────────────────────────────────────────

function stripCitations(text: string): string {
  return text.replace(/\[Source\s+\d+\]/gi, "").trim();
}

function MarkdownText({ text }: { text: string }) {
  return (
    <div style={{ fontSize: "14px", color: "#1a1a1a", lineHeight: 1.65 }}>
      <ReactMarkdown>{stripCitations(text)}</ReactMarkdown>
    </div>
  );
}

// Groups consecutive bullet chunks into <ul> blocks; renders other chunks inline.
function StreamingContent({ chunks }: { chunks: StructuredChunk[] }) {
  const nodes: React.ReactNode[] = [];
  let bulletRun: string[] = [];
  let key = 0;

  const flushBullets = () => {
    if (bulletRun.length === 0) return;
    nodes.push(
      <ul key={key++} style={{ margin: "4px 0", paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "3px" }}>
        {bulletRun.map((b, i) => (
          <li key={i} style={{ fontSize: "14px", color: "#1a1a1a", lineHeight: 1.5 }}>{stripCitations(b)}</li>
        ))}
      </ul>
    );
    bulletRun = [];
  };

  for (const chunk of chunks) {
    if (chunk.type === "bullet") {
      bulletRun.push(chunk.content);
      continue;
    }
    flushBullets();

    if (chunk.type === "title") {
      nodes.push(
        <div key={key++} style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>
          {chunk.content}
        </div>
      );
    } else if (chunk.type === "heading") {
      nodes.push(
        <div key={key++} style={{ fontSize: chunk.metadata?.faq ? "13px" : "14px", fontWeight: 600, color: "#1a1a1a", marginTop: "8px" }}>
          {chunk.content}
        </div>
      );
    } else if (chunk.type === "text") {
      nodes.push(<MarkdownText key={key++} text={chunk.content} />);
    }
  }
  flushBullets();

  return <>{nodes}</>;
}

function AssistantBlock({
  chunks,
  result,
  showActions,
  onOpenRecs,
}: {
  chunks: StructuredChunk[];
  result: AskResponse | null;
  showActions: boolean;
  onOpenRecs: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = chunks.map((c) => ("content" in c ? c.content : "")).filter(Boolean).join("\n");
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const cta = result && result.lead_trigger && result.suggested_cta
    ? `${result.suggested_cta} →`
    : "Get Personalised Recommendations →";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <StreamingContent chunks={chunks} />

      {result && (
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
            alignSelf: "flex-start",
            letterSpacing: "0.01em",
          }}
        >
          {cta}
        </button>
      )}

      {showActions && (
        <div style={{ display: "flex", gap: "4px", paddingTop: "4px" }}>
          {[
            { icon: <ThumbsUp size={16} strokeWidth={1.8} />, label: "Like", onClick: () => {} },
            { icon: <ThumbsDown size={16} strokeWidth={1.8} />, label: "Dislike", onClick: () => {} },
            { icon: <Copy size={16} strokeWidth={1.8} />, label: copied ? "Copied!" : "Copy", onClick: handleCopy },
            { icon: <Share2 size={16} strokeWidth={1.8} />, label: "Share", onClick: () => {} },
          ].map(({ icon, label, onClick }) => (
            <button
              key={label}
              aria-label={label}
              onClick={onClick}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 10px", color: "#999999", display: "flex", alignItems: "center" }}
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TypingIndicator({ status }: { status: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#888" }}>
      <span style={{ display: "inline-flex", gap: "3px" }}>
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            style={{
              width: "6px", height: "6px", borderRadius: "50%",
              backgroundColor: "#888", display: "inline-block",
              animation: "bounce 1s infinite",
              animationDelay: `${delay}ms`,
            }}
          />
        ))}
      </span>
      <span>{status || "Thinking…"}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const GREETING_CHUNKS: StructuredChunk[] = [{
  type: "text",
  content: "Hello! I'm your Dubai South assistant. Ask me anything about this article or the local property market.",
}];

export default function ChatOverlay({ isOpen, onClose, initialMessage, onOpenRecs, isForcedOpen, isDesktop }: ChatOverlayProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const committedRef = useRef(false);
  const wasStreamingRef = useRef(false);
  const processedInitialMsgRef = useRef("");

  const [dragY, setDragY] = useState(0);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);

  const effectiveOpen = isOpen || isForcedOpen;

  const { status, streaming, result, error, chunks, ask, cancel, reset } = useAskStream();

  const buildHistory = useCallback((msgs: ChatMessage[]) =>
    msgs.map((m) =>
      m.role === "user"
        ? { role: "user" as const, content: m.content }
        : {
            role: "assistant" as const,
            content: m.chunks
              .map((c) => ("content" in c ? c.content : ""))
              .filter(Boolean)
              .join(" "),
          },
    ), []);

  const sendMessage = useCallback(async (query: string, currentMessages: ChatMessage[]) => {
    if (!query.trim() || streaming) return;
    committedRef.current = false;
    setMessages((prev) => [...prev, { role: "user", content: query }]);
    await ask(query, "en", buildHistory(currentMessages));
  }, [streaming, ask, buildHistory]);

  // Greeting on first open (no initial message)
  useEffect(() => {
    if (effectiveOpen && messages.length === 0 && !initialMessage) {
      setMessages([{ role: "assistant", chunks: GREETING_CHUNKS, result: null }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveOpen]);

  // Handle initialMessage — each unique value fires once
  useEffect(() => {
    if (!isOpen || !initialMessage || initialMessage === processedInitialMsgRef.current) return;
    processedInitialMsgRef.current = initialMessage;
    setMessages([]);
    reset();
    committedRef.current = false;
    sendMessage(initialMessage, []);
  }, [isOpen, initialMessage, sendMessage, reset]);

  // Commit final message when streaming transitions false → with content available.
  useEffect(() => {
    if (wasStreamingRef.current && !streaming && !committedRef.current) {
      if (chunks.length > 0 || result) {
        committedRef.current = true;
        setMessages((prev) => [...prev, { role: "assistant", chunks, result }]);
      }
    }
    wasStreamingRef.current = streaming;
  }, [streaming, chunks, result]);

  // Commit error to messages
  useEffect(() => {
    if (error && !streaming && !committedRef.current) {
      committedRef.current = true;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", chunks: [{ type: "text", content: error }], result: null },
      ]);
    }
  }, [error, streaming]);

  // Scroll to bottom on new content
  useEffect(() => {
    if (effectiveOpen && containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, chunks, effectiveOpen]);

  useEffect(() => () => cancel(), [cancel]);

  const handleSend = () => {
    const query = input.trim();
    if (!query) return;
    setInput("");
    sendMessage(query, messages);
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
    if (dragY > 100) { onClose(); setDragY(0); }
    else setDragY(0);
  };

  const isAnimating = !isDragging.current && dragY === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)",
          zIndex: 200, opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed", bottom: 0,
          left: isDesktop ? "calc(50% - 440px)" : 0,
          right: isDesktop ? "auto" : 0,
          width: isDesktop ? "880px" : "auto",
          zIndex: 201,
          height: isDesktop ? "88vh" : "82vh",
          backgroundColor: "#ffffff",
          borderTopLeftRadius: "20px", borderTopRightRadius: "20px",
          display: "flex", flexDirection: "column",
          transform: effectiveOpen ? `translateY(${dragY}px)` : "translateY(100%)",
          transition: isAnimating ? "transform 0.38s cubic-bezier(0.32, 0.72, 0, 1)" : "none",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        {/* Drag handle */}
        <div
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{
            display: isDesktop ? "none" : "flex",
            justifyContent: "center", alignItems: "center",
            paddingTop: "10px", paddingBottom: "8px",
            cursor: "grab", touchAction: "none",
          }}
        >
          <div style={{ width: "36px", height: "4px", borderRadius: "2px", backgroundColor: "#D0D0D0" }} />
        </div>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: isDesktop ? "24px 32px 8px" : "4px 16px 8px" }}>
          <Star size={16} strokeWidth={1.8} color="#C9A84C" fill="#C9A84C" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", flex: 1 }}>Ask Offplan AI</span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Subtitle */}
        <div style={{ padding: isDesktop ? "0 32px 10px" : "0 16px 10px" }}>
          <span style={{ fontSize: "12px", color: "#888888" }}>About: Why Invest in Dubai South in 2026</span>
        </div>

        <div style={{ height: "1px", backgroundColor: "#EBEBEB", margin: isDesktop ? "0 32px" : "0 16px" }} />

        {/* Messages */}
        <div
          ref={containerRef}
          style={{
            flex: 1, overflowY: "auto", overscrollBehavior: "contain",
            padding: isDesktop ? "16px 32px 8px" : "16px 16px 8px",
            display: "flex", flexDirection: "column", gap: "16px",
          }}
        >
          {messages.map((msg, i) =>
            msg.role === "user" ? (
              <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{
                  backgroundColor: "#1a1a1a", color: "#ffffff",
                  borderRadius: "18px 18px 4px 18px",
                  padding: "11px 15px", maxWidth: "80%",
                  fontSize: "14px", lineHeight: 1.5,
                }}>
                  {msg.content}
                </div>
              </div>
            ) : (
              <AssistantBlock
                key={i}
                chunks={msg.chunks}
                result={msg.result}
                showActions={msg.result !== null}
                onOpenRecs={onOpenRecs}
              />
            )
          )}

          {/* Live streaming view */}
          {streaming && chunks.length === 0 && <TypingIndicator status={status} />}
          {streaming && chunks.length > 0 && (
            <AssistantBlock
              chunks={chunks}
              result={null}
              showActions={false}
              onOpenRecs={onOpenRecs}
            />
          )}
        </div>

        {/* Input */}
        <div style={{ padding: isDesktop ? "12px 32px" : "12px 14px", backgroundColor: "#ffffff" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            border: "1px solid rgba(0,0,0,0.1)", borderRadius: "999px",
            padding: "8px 8px 8px 16px", backgroundColor: "#fafafa", overflow: "hidden",
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !streaming && handleSend()}
              placeholder={streaming ? "Waiting for response…" : "Ask a follow-up…"}
              disabled={streaming}
              style={{
                flex: 1, border: "none", background: "transparent", outline: "none",
                fontSize: "14px", color: "#1a1a1a", fontFamily: "inherit",
                appearance: "none", WebkitAppearance: "none",
                borderRadius: 0, padding: 0, margin: 0,
                opacity: streaming ? 0.5 : 1,
              }}
            />
            {streaming ? (
              <button
                aria-label="Stop"
                onClick={cancel}
                style={{
                  background: "#000", border: "none", cursor: "pointer",
                  padding: 0, width: "34px", height: "34px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", flexShrink: 0, borderRadius: "999px",
                }}
              >
                <Square size={14} strokeWidth={2} fill="#fff" />
              </button>
            ) : (
              <button
                aria-label="Send"
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? "#000" : "#ccc",
                  border: "none", cursor: input.trim() ? "pointer" : "default",
                  padding: 0, width: "34px", height: "34px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", flexShrink: 0, borderRadius: "999px",
                  transition: "background 0.15s",
                }}
              >
                <SendHorizonal size={17} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
