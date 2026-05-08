export default function VideoEmbed() {
  const videoId = "NsO26BatxYA";

  return (
    <section className="video-section" style={{ padding: "0 20px 20px" }}>
      {/* 16:9 iframe container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title="Why Dubai South is the Next Growth Hub"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>

      {/* Caption */}
      <p
        style={{
          margin: "10px 0 0",
          fontSize: "13px",
          fontWeight: 500,
          color: "#444444",
          lineHeight: 1.4,
        }}
      >
        Why Dubai South is the Next Growth Hub
      </p>
    </section>
  );
}
