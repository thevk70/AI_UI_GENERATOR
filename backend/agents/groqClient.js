import Groq from "groq-sdk";

let client = null;

export function getGroqClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY not loaded");
  }

  if (!client) {
    client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  return client;
}
