export function cleanJsx(text) {
  if (!text || typeof text !== "string") return text;

  return text
    .replace(/```jsx/gi, "")
    .replace(/```/g, "")
    .replace(/import React.*?;\n?/g, "")
    .replace(/import ReactDOM.*?;\n?/g, "")
    .trim();
}
