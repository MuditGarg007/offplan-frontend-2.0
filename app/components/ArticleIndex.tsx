import { ChevronRight } from "lucide-react";

const sections = [
  "Strategic Location Advantage",
  "Infrastructure & Connectivity",
  "Master-Planned Communities",
  "Market Outlook & Price Trends",
  "Best Projects to Watch",
  "Risks to Consider",
  "Who Should Invest?",
];

export default function ArticleIndex() {
  return (
    <section className="article-index-section" style={{ padding: "0 20px 24px" }}>
      <p
        style={{
          margin: "0 0 10px",
          fontSize: "12px",
          fontWeight: 700,
          color: "#1a1a1a",
          letterSpacing: "0.01em",
        }}
      >
        In this article
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {sections.map((title, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 4px",
              cursor: "pointer",
              borderBottom: i < sections.length - 1 ? "1px solid #F0F0F0" : "none",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#C9A84C",
                minWidth: "18px",
                flexShrink: 0,
              }}
            >
              {i + 1}.
            </span>
            <span
              style={{
                flex: 1,
                fontSize: "13px",
                color: "#333333",
                lineHeight: 1.4,
              }}
            >
              {title}
            </span>
            <ChevronRight size={14} strokeWidth={2} color="#CCCCCC" style={{ flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </section>
  );
}
