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
    finishInterview,
  } = useInterviewStore();

  const currentQuestion = questions[currentIndex];

  // ---------------- HANDLE NEXT ----------------
  const handleNext = useCallback(
    async (autoSubmit = false) => {
      if (isLoading) return;

      const finalAnswer = answer.trim();

      // ✅ Always save answer (even empty on auto-submit)
      saveAnswer(currentIndex, finalAnswer);

      setIsLoading(true);

      try {
        let evaluation = null;

        if (finalAnswer) {
          evaluation = await evaluateAnswer(
            currentQuestion.text,
            finalAnswer
          );
        }

        // ✅ GUARANTEED result push
        addResult({
          question: currentQuestion.text,
          answer: finalAnswer || "(No answer provided)",
          score: evaluation?.score ?? 0,
          aiSummary:
            evaluation?.aiSummary ??
            (finalAnswer
              ? "Evaluation complete"
              : "No answer submitted"),
        });
      } catch (error) {
        console.error("AI failed:", error);
        addResult({
          question: currentQuestion.text,
          answer: finalAnswer || "(No answer provided)",
          score: 0,
          aiSummary: "AI evaluation failed",
        });
      }

      setAnswer("");
      setIsLoading(false);

      // ✅ FINAL QUESTION
      if (currentIndex === questions.length - 1) {
        // ⏱ ensure Zustand updates before navigation
        setTimeout(() => {
          finishInterview();
          onFinish();
        }, 0);
      } else {
        nextQuestion();
        setTimeLeft(60);
      }
    },
    [
      answer,
      currentIndex,
      currentQuestion,
      isLoading,
      addResult,
      saveAnswer,
      nextQuestion,
      finishInterview,
      onFinish,
    ]
  );

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleNext]);

  // ---------------- AUTO FOCUS ----------------
  useEffect(() => {
    textareaRef.current?.focus();
  }, [currentIndex]);

  if (!currentQuestion) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* HEADER */}
      <header className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            Question {currentIndex + 1} / {questions.length}
          </span>
          <span
            className={`font-bold ${
              timeLeft <= 10 ? "text-red-600 animate-pulse" : "text-blue-600"
            }`}
          >
            ⏱ {timeLeft}s
          </span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div
            className="bg-blue-600 h-full rounded-full transition-all"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* QUESTION */}
      <h2 className="text-xl font-medium mb-5">
        {currentQuestion.text}
      </h2>

      {/* ANSWER */}
      <textarea
        ref={textareaRef}
        rows={5}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={isLoading}
        className="w-full border-2 p-4 rounded-xl mb-4 focus:border-blue-500 outline-none"
        placeholder="Type your answer here..."
      />

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          onClick={() => handleNext(false)}
          disabled={isLoading}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            !isLoading
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading
            ? "Analyzing..."
            : currentIndex === questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </button>
      </div>
    </main>
  );
};

export default InterviewScreen;
