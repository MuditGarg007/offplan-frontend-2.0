interface PersonalisedRecommendationsProps {
  onOpenRecs: () => void;
}

export default function PersonalisedRecommendations({ onOpenRecs }: PersonalisedRecommendationsProps) {
  return (
    <section style={{ padding: "0 20px 24px" }}>
      <div
        style={{
          backgroundColor: "#F7F7F7",
          border: "1px solid #EBEBEB",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#1a1a1a",
            margin: "0 0 6px",
            letterSpacing: "0.01em",
          }}
        >
          Personalised Recommendations
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#666666",
            margin: "0 0 14px",
            lineHeight: 1.5,
          }}
        >
          Tell us your goals and our AI will suggest the best projects for you.
        </p>
        <button
          onClick={onOpenRecs}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#C9A84C",
            border: "none",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#ffffff",
            cursor: "pointer",
            letterSpacing: "0.01em",
          }}
        >
          Get My Recommendations
        </button>
      </div>
    </section>
  );
}
