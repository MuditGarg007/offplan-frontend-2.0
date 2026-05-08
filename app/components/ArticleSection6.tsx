import { Lightbulb, MessageCircle, ChevronRight } from "lucide-react";

export default function ArticleSection6() {
  return (
    <section style={{ padding: "0 20px 28px" }}>
      <h2
        style={{
          fontSize: "17px",
          fontWeight: 700,
          color: "#1a1a1a",
          margin: "0 0 10px",
          lineHeight: 1.3,
        }}
      >
        6. Risks to Consider
      </h2>

      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#444444",
          margin: "0 0 16px",
        }}
      >
        While the fundamentals are strong, investors should account for longer
        handover timelines (2027–2030 for most launches), limited retail and
        F&B infrastructure in the short term, and the area's dependence on
        Al Maktoum Airport's phased expansion for demand absorption.
      </p>

      <div
        className="investor-insight-card"
        style={{
          backgroundColor: "#F7F7F7",
          border: "1px solid #EBEBEB",
          borderRadius: "12px",
          padding: "14px 14px 0",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "8px",
          }}
        >
          <Lightbulb size={14} strokeWidth={2} color="#C8921A" />
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "0.01em",
            }}
          >
            Investor Insight
          </span>
        </div>

        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.65,
            color: "#555555",
            margin: "0 0 12px",
          }}
        >
          A 3–5 year investment horizon significantly de-risks exposure to
          handover delays and allows the area's community infrastructure to
          mature before exit.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "11px 12px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            margin: "0 0 14px",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <MessageCircle size={15} strokeWidth={1.8} color="#1a1a1a" style={{ flexShrink: 0 }} />
          <span style={{ flex: 1, fontSize: "12px", color: "#333333", lineHeight: 1.4 }}>
            <span style={{ fontWeight: 700 }}>Ask AI:</span> What exit strategies work best if Dubai South handovers are delayed?
          </span>
          <ChevronRight size={14} strokeWidth={2} color="#CCCCCC" style={{ flexShrink: 0 }} />
        </div>
      </div>

      <div className="section-image-container" style={{ borderRadius: "10px", overflow: "hidden", marginBottom: "8px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
          alt="Construction site representing handover risk in off-plan investment"
          style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
          loading="lazy"
        />
      </div>
      <p style={{ fontSize: "12px", color: "#888888", margin: 0, lineHeight: 1.4 }}>
        Active construction across Dubai South signals growth, but also highlights phased delivery risk.
      </p>
    </section>
  );
}
