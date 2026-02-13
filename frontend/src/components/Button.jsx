export default function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 16px",
        borderRadius: 8,
        border: "1px solid #2563eb",
        background: "#2563eb",
        color: "#ffffff",
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
