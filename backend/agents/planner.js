import { getGroqClient } from "./groqClient.js";
import { cleanJson } from "../utils/cleanJson.js";

export async function plannerAgent({ userPrompt, existingCode, intentType }) {
  const groq = getGroqClient();

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
You are a UI planner.
Allowed components ONLY:
Button, Card, Input, Modal, Sidebar, Navbar, Table.
STRICT RULES:
- Output ONLY raw JSON
- No markdown
- No backticks
- No explanation
        `,
      },
      {
        role: "user",
        content: JSON.stringify({ userPrompt, existingCode, intentType }),
      },
    ],
  });

  const raw = response.choices[0].message.content;
  const cleaned = cleanJson(raw);

  return JSON.parse(cleaned);
}
