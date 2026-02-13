export function normalizePlan(plan) {
  const normalized = { components: [] };

  if (!plan || !Array.isArray(plan.components)) {
    return normalized;
  }

  for (const item of plan.components) {
    // -------------------------
    // NAVBAR
    // -------------------------
    if (item.type === "Navbar") {
      normalized.components.push({
        type: "Navbar",
        props: {
          title: item.props?.title || "Dashboard",
        },
      });
    }

    // -------------------------
    // TABLE (direct)
    // -------------------------
    if (item.type === "Table") {
      const headers =
        item.props?.headers || item.props?.columns?.map((c) => c.name) || [];

      const rows =
        item.props?.rows ||
        item.props?.data?.map((row) =>
          Object.values(row).map((v) => String(v)),
        ) ||
        [];

      normalized.components.push({
        type: "Table",
        props: { headers, rows },
      });
    }

    // -------------------------
    // CARD (FLATTEN, NO CHILDREN)
    // -------------------------
    if (item.type === "Card") {
      const children = item.props?.children || [];

      for (const child of children) {
        if (child.type === "Table") {
          const headers = child.props.columns.map((c) => c.name);
          const rows = child.props.data.map((row) =>
            headers.map((h) => String(row[h.toLowerCase()] || "")),
          );

          normalized.components.push({
            type: "Table",
            props: { headers, rows },
          });
        }
      }
    }
  }

  return normalized;
}
