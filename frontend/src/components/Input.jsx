export default function Input({ placeholder }) {
  return (
    <input
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 6,
        border: "1px solid #d1d5db",
        fontSize: 14,
        marginBottom: 8,
      }}
    />
  );
}
