import { useState } from "react";
import ChatPanel from "./chat/ChatPanel";
import CodeEditor from "./editor/CodeEditor";
import PreviewRenderer from "./preview/PreviewRenderer";
import HistoryPanel from "./HistoryPanel";

export default function App() {
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);
  const [theme, setTheme] = useState("light");

  const lightTheme = {
    bg: "#f4f6fb",
    panel: "#ffffff",
    border: "#e5e7eb",
    text: "#111827",
    muted: "#6b7280",
    primary: "#2563eb",
    accent: "#10b981",
  };

  const darkTheme = {
    bg: "#0f172a",
    panel: "#020617",
    border: "#1e293b",
    text: "#f8fafc",
    muted: "#94a3b8",
    primary: "#60a5fa",
    accent: "#34d399",
  };

  const t = theme === "light" ? lightTheme : darkTheme;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: t.bg,
        color: t.text,
      }}
    >
      {/* 🔹 Header */}
      <header
        style={{
          height: 56,
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          borderBottom: `1px solid ${t.border}`,
          background: t.panel,
          fontWeight: 600,
        }}
      >
        <span style={{ color: t.primary }}>AI UI Generator</span>

        <span
          style={{
            marginLeft: 12,
            fontSize: 12,
            color: t.accent,
          }}
        >
          ● Live
        </span>

        {/* 🌗 Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          style={{
            marginLeft: "auto",
            padding: "6px 12px",
            borderRadius: 6,
            border: `1px solid ${t.border}`,
            background: t.panel,
            color: t.text,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>

      {/* 🔹 Main */}
      <div style={{ flex: 1, display: "flex" }}>
        {/* LEFT */}
        <div
          style={{
            width: "25%",
            borderRight: `1px solid ${t.border}`,
            background: t.panel,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: 12,
              borderBottom: `1px solid ${t.border}`,
              fontWeight: 600,
              color: t.primary,
            }}
          >
            Prompt
          </div>

          <ChatPanel
            setCode={setCode}
            setExplanation={setExplanation}
            theme={theme}
          />

          <div style={{ borderTop: `1px solid ${t.border}` }}>
            <HistoryPanel
              refreshKey={historyRefreshKey}
              onSelect={(v) => {
                setCode(v.code);
                setExplanation(v.explanation);
              }}
            />
          </div>
        </div>

        {/* MIDDLE */}
        <div
          style={{
            width: "35%",
            borderRight: `1px solid ${t.border}`,
            background: t.panel,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: 12,
              borderBottom: `1px solid ${t.border}`,
              fontWeight: 600,
              color: t.primary,
            }}
          >
            Generated Code
          </div>

          <div style={{ flex: 1 }}>
            <CodeEditor code={code} onChange={setCode} theme={theme} />
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            background: t.bg,
          }}
        >
          <div
            style={{
              padding: 12,
              borderBottom: `1px solid ${t.border}`,
              background: t.panel,
              fontWeight: 600,
              color: t.primary,
            }}
          >
            Live Preview
          </div>

          <div style={{ flex: 1, background: t.panel }}>
            <PreviewRenderer code={code} />
          </div>

          <div
            style={{
              padding: 12,
              borderTop: `1px solid ${t.border}`,
              background: t.panel,
            }}
          >
            <strong style={{ color: t.primary }}>Explanation</strong>
            <p
              style={{
                marginTop: 6,
                fontSize: 14,
                color: t.muted,
              }}
            >
              {explanation || "No explanation generated yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
