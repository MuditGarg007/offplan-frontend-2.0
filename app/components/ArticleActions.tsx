import { Heart, Share2, Bookmark } from "lucide-react";

const actions = [
  { icon: Heart, label: "Like" },
  { icon: Share2, label: "Share" },
  { icon: Bookmark, label: "Save" },
];

export default function ArticleActions() {
  return (
    <section style={{ padding: "0 20px 28px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        {actions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 12px",
            }}
          >
            <Icon size={20} strokeWidth={1.6} color="#AAAAAA" />
            <span
              style={{
                fontSize: "11px",
                color: "#AAAAAA",
                letterSpacing: "0.01em",
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
