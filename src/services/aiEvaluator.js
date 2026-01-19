// Removed unused scoring utility imports to fix Vercel build errors

export const evaluateAnswer = async (question, answer) => {
  const response = await fetch("/api/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch evaluation from AI service");
  }

  return response.json();
};

export const formatFeedbackSTAR = (question, aiFeedback) => {
  return {
    situation: "Analysis of the context provided in the response.",
    task: "The specific challenge identified by the AI.",
    action: "The actions and skills demonstrated in the answer.",
    result: "The final outcome and impact analyzed by the AI.",
    aiSummary: aiFeedback,
  };
};