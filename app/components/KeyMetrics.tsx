import { TrendingUp, Wallet, CalendarCheck, Target } from "lucide-react";

const metrics = [
  { icon: TrendingUp, value: "6.5%", label: "Rental Yield" },
  { icon: Wallet, value: "AED 1.2M", label: "Entry Price" },
  { icon: CalendarCheck, value: "2026–2030", label: "Handover" },
  { icon: Target, value: "Long-term", label: "Investor Fit" },
];

const GOLD = "#C8921A";
const CARD_BG = "#F7F7F7";

export default function KeyMetrics() {
  return (
    <section style={{ padding: "0 20px 20px" }}>
      <div
        className="key-metrics-card"
        style={{
          backgroundColor: CARD_BG,
          borderRadius: "12px",
          padding: "14px 16px 16px",
          border: "1px solid #EBEBEB",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#1a1a1a",
            }}
          >
            Key Metrics
          </span>
          <span style={{ fontSize: "10px", color: "#999999", fontWeight: 400 }}>
            Last verified: 10 May 2026
          </span>
        </div>

        {/* Tiles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {metrics.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                textAlign: "center",
                borderRight: i < metrics.length - 1 ? "1px solid #EDD98A" : "none",
                padding: "0 4px",
              }}
            >
              <Icon size={18} strokeWidth={1.8} color={GOLD} />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  lineHeight: 1.2,
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#888888",
                  lineHeight: 1.3,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
