import {
  scoreAnswerWithRules,
  getAnswerQuality,
} from "../utils/answerScoring";

export const evaluateAnswer = async (question, answer) => {
  const response = await fetch("/api/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer }),
  });

  return response.json();
};
export const formatFeedbackSTAR = (question, aiFeedback) => {
  return {
    situation: "Briefly describe the scenario in your answer",
    task: "State the task or goal clearly",
    action: "Explain steps you took or skills used",
    result: "Show outcome or learning points",
    aiSummary: aiFeedback,
  };
};
