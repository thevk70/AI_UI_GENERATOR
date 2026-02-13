import { useEffect, useRef } from "react";

export default function PreviewRenderer({ code }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;

    // 🔴 Hard validation
    if (!code || typeof code !== "string" || !code.includes("App")) {
      doc.open();
      doc.write(`
        <body style="font-family:sans-serif;padding:16px;color:red;">
          <h3>Preview Error</h3>
          <pre>No valid App component found</pre>
        </body>
      `);
      doc.close();
      return;
    }

    // 🔒 ABSOLUTE SANITIZATION (NO export/import CAN SURVIVE)
    const safeCode = code
      // remove all imports
      .replace(/^\s*import\s+.*$/gm, "")
      // convert export default function App → function App
      .replace(/export\s+default\s+function\s+App/g, "function App")
      // remove any remaining export keywords
      .replace(/\bexport\b/g, "")
      // remove commonjs
      .replace(/module\.exports.*$/gm, "")
      .replace(/exports\..*$/gm, "");

    doc.open();
    doc.write(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />

  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    body {
      margin: 0;
      padding: 16px;
      font-family: system-ui, sans-serif;
      background: #f8fafc;
    }
  </style>
</head>

<body>
  <div id="root"></div>

  <script type="text/babel">
    // ✅ Error Boundary
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
      }
      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }
      render() {
        if (this.state.hasError) {
          return (
            <div style={{ color: "red" }}>
              <h3>Render Error</h3>
              <pre>{String(this.state.error)}</pre>
            </div>
          );
        }
        return this.props.children;
      }
    }

    // ✅ Preview Components (STATIC, SAFE)
    const Navbar = ({ title = "" }) => (
      <div style={{ padding: 12, background: "#0f172a", color: "#fff", fontWeight: 600 }}>
        {String(title)}
      </div>
    );

    const Card = ({ title = "" }) => (
      <div style={{ marginTop: 16, padding: 16, background: "#fff", borderRadius: 8 }}>
        <strong>{String(title)}</strong>
      </div>
    );

    const Button = ({ label = "" }) => (
      <button style={{ marginTop: 12, padding: "8px 14px" }}>
        {String(label)}
      </button>
    );

    const Sidebar = ({ items = [] }) => (
      <div style={{ marginTop: 16 }}>
        {Array.isArray(items) && items.map((i, idx) => (
          <div key={idx}>{String(i)}</div>
        ))}
      </div>
    );

    const Input = ({ placeholder = "" }) => (
      <input placeholder={String(placeholder)} style={{ marginTop: 8 }} />
    );

    const Table = ({ headers = [], rows = [] }) => (
      <table border="1" cellPadding="6" style={{ marginTop: 16 }}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    );

    const Modal = ({ title = "" }) => (
      <div style={{ marginTop: 16 }}>
        <strong>{String(title)}</strong>
      </div>
    );

    // 🔑 GENERATED CODE (TOP-LEVEL ONLY)
    ${safeCode}

    // ✅ ONLY render is wrapped
    try {
      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      );
    } catch (e) {
      document.body.innerHTML =
        "<h3 style='color:red'>Preview Crash</h3><pre>" +
        e.toString() +
        "</pre>";
    }
  </script>
</body>
</html>
    `);

    doc.close();
  }, [code]);

  return (
    <iframe
      ref={iframeRef}
      title="Preview"
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}
