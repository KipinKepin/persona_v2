import { callLLM } from "./OllamaClient.js";

export async function generatePersonaSummary(cif, transactions, products) {
  const prompt = `
You are an AI system that summarizes customer financial behavior.

Customer CIF: ${cif}

Active products owned by customer:
${JSON.stringify(products)}

Transaction data:
${JSON.stringify(transactions)}

TASK:
- Produce a concise persona summary (2–3 sentences)
- Focus on dominant and consistent behavior
- Ignore incidental transactions

RULES:
- Output MUST be plain text
- DO NOT output JSON
- DO NOT use bullet points
- DO NOT include quotes
`;

  const raw = await callLLM(prompt);

  if (typeof raw === "string") {
    return raw.trim();
  }

  return String(raw);
}
