import axios from "axios";

const MODEL_NAME = "deepseek-v3.2";

const ollama = axios.create({
  baseURL: "https://ollama.com/api",
  timeout: 600000,
  headers: {
    Authorization: `Bearer a0a30e899b96491a988699a019db4bfd.2E4ny0x8uvI4nKYYIlH_JYjz`,
    "Content-Type": "application/json",
  },
});

export async function callLLM(prompt) {
  const response = await ollama.post("/generate", {
    model: MODEL_NAME,
    prompt: prompt,
    stream: false,
    temperature: 0,
  });

  return response.data?.response ?? "";
}
