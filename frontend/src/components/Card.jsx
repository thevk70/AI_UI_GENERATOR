export default function Card({ title }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 10,
        border: "1px solid #e5e7eb",
        marginBottom: 12,
        background: "#ffffff",
      }}
    >
      <div
        style={{
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {title}
      </div>
    </div>
  );
}
