// export default function Sidebar({ items }) {
//   return (
//     <aside className="sidebar">
//       {items.map((item, i) => (
//         <div key={i}>{item}</div>
//       ))}
//     </aside>
//   );
// }

const Sidebar = ({ items }) => {
  const safeItems = Array.isArray(items)
    ? items
    : typeof items === "string"
      ? [items]
      : [];

  return (
    <div className="box">
      <div className="title">Sidebar</div>
      <ul>
        {safeItems.map((i, idx) => (
          <li key={idx}>{String(i)}</li>
        ))}
      </ul>
    </div>
  );
};
