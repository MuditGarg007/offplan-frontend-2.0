import { ChevronRight } from "lucide-react";

export default function ExecutiveSummary() {
  return (
    <section style={{ padding: "0 20px 24px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div className="section-heading-row" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <ChevronRight className="section-heading-icon" size={16} strokeWidth={2.5} color="#C8921A" />
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            Executive Summary
          </h2>
        </div>
        <span style={{ fontSize: "11px", color: "#aaaaaa", fontWeight: 400 }}>
          140 words
        </span>
      </div>

      {/* Body */}
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#444444",
          margin: 0,
        }}
      >
        Dubai South is positioned to benefit from the expansion of Al Maktoum
        International Airport, Expo legacy developments, and major infrastructure
        projects. Entry prices remain competitive compared to established areas
        while offering significant long-term upside. The area is ideal for
        investors seeking future growth, rental demand from aviation and logistics
        sectors, and modern master-planned communities.
      </p>
    </section>
  );
}
