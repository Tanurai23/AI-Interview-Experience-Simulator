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
    <main
      className="
        max-w-3xl mx-auto mt-6 md:mt-10 p-5 md:p-6
        bg-slate-800/50 backdrop-blur-md
        border border-slate-700
        rounded-2xl shadow-2xl
      "
    >
      {/* HEADER: Tightened margins */}
      <header className="mb-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
            Question {currentIndex + 1} of {questions.length}
          </span>

          <span
            className={`font-mono text-sm font-bold transition ${
              timeLeft <= 10
                ? "text-red-500 animate-pulse"
                : "text-blue-500"
            }`}
          >
            ⏱ {timeLeft}s
          </span>
        </div>

        {/* PROGRESS BAR: Slimmer height */}
        <div className="w-full bg-slate-700/40 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-500"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* QUESTION: Slightly smaller text for better fit */}
      <h2 className="text-lg md:text-xl font-medium text-slate-100 mb-5 leading-snug">
        {currentQuestion.text}
      </h2>

      {/* ANSWER INPUT: Reduced rows from 5 to 4 */}
      <textarea
        ref={textareaRef}
        rows={4}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={isLoading}
        placeholder="Type your answer here..."
        className="
          w-full resize-none
          bg-slate-900/60
          border border-slate-700
          rounded-xl p-4 mb-4
          text-slate-100 text-sm md:text-base placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
        "
      />

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          onClick={() => handleNext(false)}
          disabled={isLoading}
          className={`
            px-8 py-2.5 rounded-xl font-bold text-sm
            transition-all duration-200
            active:scale-95
            ${
              isLoading
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20"
            }
          `}
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
}
export default InterviewScreen