import { useEffect, useState } from "react";
import { fetchHistory } from "./api";

export default function HistoryPanel({ onSelect }) {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory()
      .then((data) => {
        setVersions(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("History load failed:", err);
        setError("Failed to load history");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="history-panel">Loading history…</div>;
  }

  if (error) {
    return <div className="history-panel error">{error}</div>;
  }

  if (!versions.length) {
    return <div className="history-panel">No history yet</div>;
  }

  return (
    <div className="history-panel">
      <h4>History</h4>
      {versions.map((v) => (
        <div key={v.id} className="history-item">
          <button onClick={() => onSelect(v)}>Version {v.id}</button>
        </div>
      ))}
    </div>
  );
}
