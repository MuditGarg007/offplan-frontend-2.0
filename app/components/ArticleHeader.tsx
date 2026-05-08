import { Calendar, Clock, MapPin } from "lucide-react";

export default function ArticleHeader() {
  return (
    <section style={{ padding: "20px 20px 0" }}>
      {/* Tag chip */}
      <span
        style={{
          display: "inline-block",
          backgroundColor: "#FDF3DC",
          color: "#B8860B",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "4px 10px",
          borderRadius: "4px",
          marginBottom: "12px",
        }}
      >
        Area Guide
      </span>

      <h1
        className="article-title"
        style={{
          fontSize: "26px",
          fontWeight: 700,
          lineHeight: 1.25,
          color: "#1a1a1a",
          margin: "0 0 14px",
          letterSpacing: "-0.02em",
        }}
      >
        Why Invest in Dubai South in 2026
      </h1>

      {/* Metadata row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "6px",
          color: "#888888",
          fontSize: "12px",
          fontWeight: 400,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Calendar size={12} strokeWidth={1.8} />
          12 May 2026
        </span>

        <span style={{ color: "#cccccc" }}>·</span>

        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Clock size={12} strokeWidth={1.8} />
          8 min read
        </span>

        <span style={{ color: "#cccccc" }}>·</span>

        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <MapPin size={12} strokeWidth={1.8} />
          Dubai South
        </span>
      </div>

      {/* BLUF */}
      <div style={{ marginTop: "20px", paddingBottom: "20px" }}>
        <span
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#1a1a1a",
            marginBottom: "6px",
          }}
        >
          BLUF
        </span>
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.65,
            color: "#444444",
            margin: 0,
          }}
        >
          Dubai South is emerging as one of Dubai&apos;s most promising investment destinations,
          backed by Al Maktoum International Airport expansion, strong infrastructure, and
          long-term growth potential.
        </p>
      </div>
    </section>
  );
}
