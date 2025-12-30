export default async function PastePage(props) {
  const params = await props.params;
  const id = params.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pastes/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <main style={styles.container}>
        <h1 style={styles.error}>404</h1>
        <p style={styles.subtext}>Paste not found or expired</p>
      </main>
    );
  }

  const data = await res.json();

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Paste Content</h2>
        <pre style={styles.content}>{data.content}</pre>
      </div>
    </main>
  );
}

/* ---------- Minimal Styles ---------- */

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f7f7f7",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "700px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: "12px",
    fontSize: "20px",
    fontWeight: "600",
  },
  content: {
    background: "#f1f1f1",
    padding: "15px",
    borderRadius: "6px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontSize: "14px",
    lineHeight: "1.6",
  },
  error: {
    fontSize: "64px",
    marginBottom: "10px",
  },
  subtext: {
    fontSize: "16px",
    color: "#555",
  },
};
