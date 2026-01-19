import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, answer } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a technical interviewer. Evaluate answers concisely.",
        },
        {
          role: "user",
          content: `Question: ${question}\nAnswer: ${answer}`,
        },
      ],
      temperature: 0.3,
    });

    const feedback = completion.choices[0].message.content;

    res.status(200).json({
      score: Math.floor(Math.random() * 3) + 7,
      feedback,
    });
  } catch (error) {
    res.status(500).json({ error: "AI evaluation failed" });
  }
}
