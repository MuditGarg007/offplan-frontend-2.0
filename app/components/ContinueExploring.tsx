import { Scale, Users, Award, Building2, ChevronRight } from "lucide-react";

const items = [
  {
    icon: Scale,
    title: "Dubai South vs Creek Harbour",
    subtitle: "Detailed area comparison",
  },
  {
    icon: Users,
    title: "Best Communities for Families in Dubai South",
    subtitle: "Top picks for family living",
  },
  {
    icon: Award,
    title: "Top Projects Under AED 2M",
    subtitle: "High ROI opportunities",
  },
  {
    icon: Building2,
    title: "Dubai South Infrastructure",
    subtitle: "The Complete Guide",
  },
];

export default function ContinueExploring() {
  return (
    <section style={{ padding: "0 20px 24px" }}>
      <div
        style={{
          backgroundColor: "#F7F7F7",
          border: "1px solid #EBEBEB",
          borderRadius: "12px",
          padding: "14px 0 0",
        }}
      >
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
          Continue Exploring
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "0 0 14px" }}>
          {items.map(({ icon: Icon, title, subtitle }, i) => (
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
              <Icon
                size={16}
                strokeWidth={1.8}
                color="#C9A84C"
                style={{ flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1a1a1a",
                    lineHeight: 1.4,
                  }}
                >
                  {title}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "#888888",
                    lineHeight: 1.4,
                    marginTop: "1px",
                  }}
                >
                  {subtitle}
                </span>
              </div>
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
