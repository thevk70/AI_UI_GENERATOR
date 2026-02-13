const ALLOWED_COMPONENTS = [
  "Navbar",
  "Sidebar",
  "Card",
  "Input",
  "Button",
  "Table",
  "Modal",
  "App",
];

const FORBIDDEN_PATTERNS = [
  "{{",
  "onClick",
  "onSubmit",
  "fields=",
  "fieldName=",
  "text=",
  "subtitle=",
  "children",
  "Modal.open",
  "setContent",
  "console.",
];

export function validateComponents(code) {
  if (!code || typeof code !== "string") {
    throw new Error("❌ Empty or invalid code");
  }

  // ❌ Block forbidden patterns
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (code.includes(pattern)) {
      throw new Error(`❌ Forbidden pattern detected: ${pattern}`);
    }
  }

  // ❌ Block component nesting
  // if (/<(Card|Sidebar|Modal)[^>]*>/.test(code)) {
  //   throw new Error("❌ Components must NOT have children");
  // }

  // ❌ Block unknown JSX components
  const jsxRegex = /<([A-Z][A-Za-z0-9]*)/g;
  let match;
  while ((match = jsxRegex.exec(code)) !== null) {
    const name = match[1];
    if (!ALLOWED_COMPONENTS.includes(name)) {
      throw new Error(`❌ Component not allowed: ${name}`);
    }
  }

  return true;
}
