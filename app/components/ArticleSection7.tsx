import { Lightbulb, MessageCircle, ChevronRight } from "lucide-react";

export default function ArticleSection7() {
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
        7. Who Should Invest?
      </h2>

      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#444444",
          margin: "0 0 16px",
        }}
      >
        Dubai South is best suited for patient capital — first-time investors
        entering the Dubai market with a budget of AED 1M–2M, buy-to-let
        investors targeting the aviation workforce, and institutional buyers
        seeking bulk units in logistics or commercial zones near the airport.
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
          End-users seeking Golden Visa eligibility will find Dubai South's
          sub-AED 2M off-plan segment one of the most accessible qualifying
          pathways in the emirate right now.
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
            <span style={{ fontWeight: 700 }}>Ask AI:</span> Am I the right investor profile for Dubai South? Run my numbers.
          </span>
          <ChevronRight size={14} strokeWidth={2} color="#CCCCCC" style={{ flexShrink: 0 }} />
        </div>
      </div>

      <div className="section-image-container" style={{ borderRadius: "10px", overflow: "hidden", marginBottom: "8px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&q=80"
          alt="Investor reviewing property portfolio documents"
          style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
          loading="lazy"
        />
      </div>
      <p style={{ fontSize: "12px", color: "#888888", margin: 0, lineHeight: 1.4 }}>
        Matching your investor profile to the right sub-market is the first step to a sound exit.
      </p>
    </section>
  );
}
