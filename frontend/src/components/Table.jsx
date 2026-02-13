// export default function Table({ headers, rows }) {
//   return (
//     <table className="table">
//       <thead>
//         <tr>
//           {headers.map((h, i) => (
//             <th key={i}>{h}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((row, i) => (
//           <tr key={i}>
//             {row.map((cell, j) => (
//               <td key={j}>{cell}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

const Table = ({ headers, rows }) => {
  // Normalize headers
  let safeHeaders = [];
  if (Array.isArray(headers)) {
    safeHeaders = headers.map((h) => String(h));
  } else if (typeof headers === "string" && headers.trim() !== "") {
    safeHeaders = [headers];
  }

  // Normalize rows
  let safeRows = [];

  if (Array.isArray(rows)) {
    safeRows = rows.map((r) =>
      Array.isArray(r) ? r.map((c) => String(c)) : [String(r)],
    );
  } else if (typeof rows === "string" && rows.trim() !== "") {
    safeRows = [[rows]];
  }

  // Render empty state safely
  if (!safeHeaders.length && !safeRows.length) {
    return (
      <div className="box">
        <div className="title">Table</div>
        <em style={{ opacity: 0.6 }}>No data</em>
      </div>
    );
  }

  return (
    <div className="box">
      <div className="title">Table</div>

      <table border="1" cellPadding="6">
        {safeHeaders.length > 0 && (
          <thead>
            <tr>
              {safeHeaders.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {safeRows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
