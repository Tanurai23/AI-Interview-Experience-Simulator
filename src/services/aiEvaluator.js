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
export const evaluateAnswerLocally = (question, answer) => {
  // For simplicity, using "general" topic for all questions
  const { score, matchedKeywords, feedback } =
    scoreAnswerWithRules(answer, "general");
    const quality = getAnswerQuality(score);    
    return {    
        score,
        matchedKeywords,
        feedback: feedback.join(" "),
        quality,
    };  
}