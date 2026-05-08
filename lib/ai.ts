import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIAnalysis = async (prompt: string, data: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a professional Career Architect. Return ONLY JSON." },
        { role: "user", content: `${prompt}: ${data}` }
      ],
      response_format: { type: "json_object" },
    });
    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("AI Error:", error);
    return null;
  }
};
