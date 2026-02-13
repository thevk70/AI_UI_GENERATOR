const API_URL = "https://ai-ui-generator-cbso.onrender.com/api";

export async function generateUI(prompt) {
  const res = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }

  return res.json();
}

export async function fetchHistory() {
  const res = await fetch("http://localhost:5000/api/history");

  if (!res.ok) {
    throw new Error("History API failed");
  }

  return res.json();
}
