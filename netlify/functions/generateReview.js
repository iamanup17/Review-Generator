export async function handler(event, context) {
  const API_URL = "https://api-inference.huggingface.co/models/gpt2";
  const API_KEY = process.env.HF_API_KEY; // keep secret in Netlify env vars

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing Hugging Face API key" }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const prompt = body.prompt || "Write a positive review for a business.";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: await response.text() }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("Serverless function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong" }),
    };
  }
}
