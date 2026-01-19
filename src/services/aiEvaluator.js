export const evaluateAnswer = async (question, answer) => {
  // 1. Wait for 1.5 seconds to "pretend" the AI is thinking
  await new Promise((resolve) => setTimeout(resolve, 1500)); 

  // 2. SMART LOGIC: Check the length of the user's answer
  const wordCount = answer.trim().split(/\s+/).length;

  // 3. If the answer is too short (less than 10 words), give a warning
  if (wordCount < 10) {
    return {
      score: 4,
      situation: "Answer too brief.",
      task: "Not enough detail provided.",
      action: "Please expand on your actions.",
      result: "Incomplete data.",
      aiSummary: "Your answer is a bit too short. Try to provide more detail using the STAR method (Situation, Task, Action, Result) to get a better score!"
    };
  }

  // 4. If the answer is good (10+ words), return the high-quality feedback
  return {
    score: Math.floor(Math.random() * 2) + 8, // Gives 8 or 9
    situation: "Your description of the background was clear and set the stage well.",
    task: "You successfully identified the core challenge that needed to be solved.",
    action: "The steps you took demonstrate strong problem-solving skills and initiative.",
    result: "You highlighted a positive outcome that shows the value of your work.",
    aiSummary: "Strong response! You used the STAR method effectively. To improve even more, try to include specific numbers like 'helped 50 people' or 'saved 2 hours'."
  };
};