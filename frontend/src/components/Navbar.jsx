export default function Navbar({ title }) {
  return (
    <div
      style={{
        padding: "14px 20px",
        borderBottom: "1px solid #e5e7eb",
        fontWeight: 600,
        fontSize: 16,
        background: "#ffffff",
      }}
    >
      {title}
    </div>
  );
}
