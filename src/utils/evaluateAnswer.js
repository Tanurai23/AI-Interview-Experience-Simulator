import { evaluationRules } from "../data/evaluationRules";

export const evaluateAnswer = (answer, topic = "general") => {
  let score = 0;
  const feedback = [];

  // Length check
  if (answer.length >= evaluationRules.minLength) {
    score += 30;
  } else {
    feedback.push("Answer is too short. Try to explain more clearly.");
  }

  // Keyword matching
  const keywords = evaluationRules.keywords[topic] || [];
  const matched = keywords.filter((k) =>
    answer.toLowerCase().includes(k)
  );

  score += matched.length * 10;

  if (matched.length === 0) {
    feedback.push("Try to include relevant technical keywords.");
  }

  // Clarity heuristic
  if (answer.includes(".") && answer.split(" ").length > 15) {
    score += 20;
  } else {
    feedback.push("Answer lacks clarity or structure.");
  }

  return {
    score: Math.min(score, 100),
    matchedKeywords: matched,
    feedback,
  };
};
export const getAnswerQuality = (score, maxKeywords) => {
  if (score >= 80) return "Strong";
  if (score >= 50) return "Average";
  return "Weak";
};