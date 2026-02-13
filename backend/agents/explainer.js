import { getGroqClient } from "./groqClient.js";

export async function explainerAgent(plan, code) {
  const groq = getGroqClient();

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "Explain UI decisions clearly in simple English.",
      },
      {
        role: "user",
        content: JSON.stringify({ plan, code }),
      },
    ],
  });

  return response.choices[0].message.content;
}
