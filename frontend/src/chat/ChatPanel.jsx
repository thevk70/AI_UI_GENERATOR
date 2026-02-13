import { useState } from "react";
import { generateUI } from "../api";

export default function ChatPanel({ setCode, setExplanation, theme }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isDark = theme === "dark";

  const handleSend = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setError("");

      const result = await generateUI(prompt);
      setCode(result.version.code);
      setExplanation(result.version.explanation);

      setPrompt("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your UI or request changes..."
        style={{
          width: "100%",
          minHeight: 90,
          maxHeight: 140,
          resize: "none",
          padding: 8,
          borderRadius: 6,
          border: "1px solid #374151",
          background: isDark ? "#020617" : "#ffffff",
          color: isDark ? "#f8fafc" : "#111827",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          border: "none",
          background: "#2563eb",
          color: "#ffffff",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Generating..." : "Send"}
      </button>

      {error && <p style={{ color: "#ef4444", fontSize: 13 }}>{error}</p>}
    </div>
  );
}
