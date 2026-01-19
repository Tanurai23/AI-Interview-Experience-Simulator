// src/services/aiEvaluator.js

export const evaluateAnswer = async (question, answer) => {
  // 1. Simulate "Network Delay" so the user sees your "Analyzing..." spinner
  // This makes the app feel like it's actually talking to an AI.
  await new Promise((resolve) => setTimeout(resolve, 2000)); 

  // 2. Return a static, high-quality STAR response
  // This ensures your Result Screen always looks professional.
  return {
    score: Math.floor(Math.random() * 2) + 8, // Gives an 8 or 9
    situation: "Your description of the background was clear and set the stage well.",
    task: "You successfully identified the core challenge that needed to be solved.",
    action: "The steps you took demonstrate strong problem-solving skills and initiative.",
    result: "You highlighted a positive outcome that shows the value of your work.",
    aiSummary: "Strong response! You followed the STAR method perfectly. To make this even better, try to include specific metrics (like percentages or time saved) in your result section."
  };
};