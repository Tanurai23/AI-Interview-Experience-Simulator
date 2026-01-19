import { useEffect, useState, useCallback, useRef } from "react";
import useInterviewStore from "../store/interviewStore";
import questions from "../data/questions";
import { evaluateAnswer } from "../services/aiEvaluator";

const InterviewScreen = ({ onFinish }) => {
  const textareaRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentIndex,
    saveAnswer,
    nextQuestion,
    addResult,
  } = useInterviewStore();

  const currentQuestion = questions[currentIndex];

  // ---------- HANDLE NEXT ----------
  const handleNext = useCallback(
    async (isAutoSubmit = false) => {
      // 1. Prevent action if answer is empty (unless timer ran out) or already loading
      if (!isAutoSubmit && !answer.trim()) return;
      if (isLoading) return; 

      setIsLoading(true);

      try {
        // 2. Call AI API
        const evaluation = await evaluateAnswer(currentQuestion.text, answer);

        // 3. Save result with SAFETY values (prevents crashes if AI returns nothing)
        addResult({
          question: currentQuestion.text,
          answer,
          score: evaluation?.score || 5,
          situation: evaluation?.situation || "Analysis completed",
          task: evaluation?.task || "Context identified",
          action: evaluation?.action || "Action noted",
          result: evaluation?.result || "Result evaluated",
          aiSummary: evaluation?.aiSummary || "Feedback successfully generated."
        });
      } catch (error) {
        console.error("AI Error - Moving forward with fallback:", error);
        // If AI fails, save a fallback so the app doesn't break
        addResult({
          question: currentQuestion.text,
          answer,
          score: 0,
          aiSummary: "AI evaluation skipped due to connection error."
        });
      }

      // 4. RESET & MOVE (These lines are now outside the 'try' to ensure they ALWAYS run)
      saveAnswer(currentIndex, answer);
      setAnswer("");
      setIsLoading(false); 

      if (currentIndex === questions.length - 1) {
        onFinish();
      } else {
        nextQuestion();
        setTimeLeft(60);
      }
    },
    [answer, currentIndex, nextQuestion, onFinish, saveAnswer, addResult, currentQuestion, isLoading]
  );

  // ---------- TIMER ----------
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleNext]);

  // ---------- AUTO FOCUS ----------
  useEffect(() => {
    textareaRef.current?.focus();
  }, [currentIndex]);

  if (!currentQuestion) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase">
            Question {currentIndex + 1} / {questions.length}
          </span>
          <span className={`font-mono font-bold ${timeLeft <= 10 ? "text-red-600 animate-pulse" : "text-blue-600"}`}>
            ⏱ {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full">
          <div
            className="bg-blue-600 h-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </header>

      <h2 className="text-xl font-medium mb-6">{currentQuestion.text}</h2>

      <textarea
        ref={textareaRef}
        rows="5"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={isLoading}
        className="w-full border-2 p-4 rounded-xl mb-4 focus:border-blue-500 outline-none transition disabled:bg-gray-50"
        placeholder="Type your answer here..."
      />

      <div className="flex justify-end">
        <button
          onClick={() => handleNext(false)}
          disabled={!answer.trim() || isLoading}
          className={`px-5 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
            answer.trim() && !isLoading
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              Analyzing...
            </>
          ) : currentIndex === questions.length - 1 ? (
            "Finish Interview"
          ) : (
            "Next Question"
          )}
        </button>
      </div>
    </main>
  );
};

export default InterviewScreen;