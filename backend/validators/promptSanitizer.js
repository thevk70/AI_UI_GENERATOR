const FORBIDDEN_PATTERNS = [
  /ignore previous/i,
  /disregard rules/i,
  /use tailwind/i,
  /inline styles/i,
  /create new component/i,
  /external library/i,
];

export function sanitizePrompt(prompt) {
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(prompt)) {
      throw new Error("❌ Prompt violates system safety rules");
    }
  }
  return prompt;
}
