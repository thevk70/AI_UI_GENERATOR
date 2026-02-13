export function validateJSX(code) {
  if (!code || typeof code !== "string") {
    throw new Error("❌ Generated code is empty");
  }

  if (!code.includes("export default")) {
    throw new Error("❌ JSX must export a default component");
  }

  if (!code.includes("return")) {
    throw new Error("❌ JSX must contain a return statement");
  }

  if (!code.includes("<")) {
    throw new Error("❌ Invalid JSX structure");
  }

  return true;
}
