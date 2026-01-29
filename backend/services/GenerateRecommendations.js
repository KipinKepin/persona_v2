import { callLLM } from "./OllamaClient.js";

export async function generateRecommendations(
  cif,
  personaSummary,
  segments,
  rejectedRecommendations = [],
) {
  const prompt = `
You are an AI assistant helping internal bank teams generate product recommendations.

Customer CIF: ${cif}

Persona summary:
"${personaSummary}"

Customer segments:
${JSON.stringify(segments, null, 2)}

Previously REJECTED recommendations (STRICTLY AVOID):
${
  rejectedRecommendations.length > 0
    ? JSON.stringify(rejectedRecommendations, null, 2)
    : "None"
}

CRITICAL CONSTRAINTS (MUST FOLLOW):
- NEVER repeat rejected recommendations
- NEVER suggest the SAME product type as rejected ones
- NEVER suggest a CLOSE VARIANT of rejected products
  (example: credit card → premium credit card → platinum credit card = SAME TYPE)
- Treat rejected recommendations as PERMANENTLY INVALID
- If unsure whether a product is similar, ASSUME IT IS SIMILAR and AVOID it

TASK:
- Generate NEW recommendations PER SEGMENT
- Recommendations must be fundamentally DIFFERENT from rejected ones
- Align recommendations with the segment context
- Provide a clear, concrete business reason
- Do NOT recommend products the customer already owns
- Prioritize:
  1. Alternative product categories
  2. Softer or lower-commitment offerings
  3. Complementary (cross-sell) and step-up (upsell) options

OUTPUT RULES:
- If a segment has NO SAFE recommendation, OMIT that segment
- Output RAW JSON only
- Do NOT mention rejection, feedback, AI, or models

OUTPUT FORMAT:
{
  "recommendations": [
    {
      "segment_name": "",
      "recommendation": "",
      "reason": ""
    }
  ]
}
`;

  const raw = await callLLM(prompt);
  return JSON.parse(raw);
}
