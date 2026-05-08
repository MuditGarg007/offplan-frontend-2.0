import { MessageCircle, ChevronRight } from "lucide-react";

const suggestions = [
  "What will the airport expansion mean for property values?",
  "How does Dubai South compare to other emerging areas?",
  "Which projects are best for long-term rental yield?",
  "What are the risks of investing in Dubai South?",
];

export default function AiSuggestions() {
  return (
    <section style={{ padding: "0 20px 24px" }}>
      <div
        className="ai-suggestions-card"
        style={{
          backgroundColor: "#F7F7F7",
          border: "1px solid #EBEBEB",
          borderRadius: "12px",
          padding: "14px 0 0",
        }}
      >
        {/* Title */}
        <p
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#1a1a1a",
            margin: "0 0 10px",
            padding: "0 16px",
            letterSpacing: "0.01em",
          }}
        >
          Ask AI about this article
        </p>

        {/* Suggestions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "0 0 14px" }}>
          {suggestions.map((text, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "11px 16px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                margin: "0 12px",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <MessageCircle
                size={16}
                strokeWidth={1.8}
                color="#C9A84C"
                style={{ flexShrink: 0 }}
              />
              <span
                style={{
                  flex: 1,
                  fontSize: "13px",
                  color: "#333333",
                  lineHeight: 1.45,
                }}
              >
                {text}
              </span>
              <ChevronRight
                size={15}
                strokeWidth={2}
                color="#BBBBBB"
                style={{ flexShrink: 0 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
