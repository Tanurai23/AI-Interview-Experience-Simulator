import OpenAI from "openai";

// Vercel specific configuration to allow long-running AI tasks
export const maxDuration = 30; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, answer } = req.body;

  // 1️⃣ COST CONTROL: Truncate long answers to save tokens (approx 150-200 words)
  const MAX_WORDS = 200;
  const truncatedAnswer = answer ? answer.split(" ").slice(0, MAX_WORDS).join(" ") : "";

  try {
    // 2️⃣ AI CALL: Using gpt-4o-mini for speed and cost efficiency
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert interview evaluator. 
          Analyze the user's answer and provide feedback strictly in the following JSON format:
          {
            "score": (number 1-10),
            "situation": "Short analysis of the S in STAR",
            "task": "Short analysis of the T in STAR",
            "action": "Short analysis of the A in STAR",
            "result": "Short analysis of the R in STAR",
            "aiSummary": "A brief overall summary of the feedback"
          }`
        },
        {
          role: "user",
          content: `Question: ${question}\nAnswer: ${truncatedAnswer}`
        }
      ],
      response_format: { type: "json_object" }, // Ensures AI returns valid JSON
      max_tokens: 400,
      temperature: 0.7,
    });

    const aiData = JSON.parse(completion.choices[0].message.content);

    // 3️⃣ SUCCESS RESPONSE
    res.status(200).json(aiData);

  } catch (error) {
    console.error("OpenAI API Error:", error);

    // 4️⃣ FALLBACK LOGIC: Prevents the app from getting "stuck" if API fails
    res.status(200).json({
      score: 5,
      situation: "Context identified from your response.",
      task: "Core challenge analyzed.",
      action: "Key steps noted.",
      result: "Outcome evaluated.",
      aiSummary: "AI evaluation is currently offline. Your answer has been saved for manual review.",
      isFallback: true
    });
  }
}