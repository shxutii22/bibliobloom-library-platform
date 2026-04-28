function HeroSection() {
  return (
    <div style={styles.container}>
      <div style={styles.textSection}>
        <h2 style={styles.title}>
          Build your reading sanctuary,<br />
          where the books feel at home!
        </h2>

        <p style={styles.subtitle}>
          For readers who <strong>romanticize</strong> everything.
        </p>
      </div>

      <div style={styles.imageSection}>
        <img
          src="/reading.png"
          alt="Reading illustration"
          style={styles.image}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f1f3f5",
    borderRadius: "22px",
    padding: "36px 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "36px",
    gap: "28px",
    flexWrap: "wrap", // 🔹 enables mobile stacking
  },

  textSection: {
    flex: "1 1 320px",
  },

  title: {
    fontSize: "26px",
    marginBottom: "12px",
    fontWeight: "700",
    letterSpacing: "0.3px",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    color: "#222",
    lineHeight: "1.35",
  },

  subtitle: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#555",
    maxWidth: "420px",
    fontWeight: "400",
    letterSpacing: "0.2px",
  },

  imageSection: {
    flex: "1 1 260px",
    display: "flex",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    maxWidth: "300px", // 🔹 bigger but controlled
    height: "auto",
    objectFit: "contain",
  },
};

export default HeroSection;
