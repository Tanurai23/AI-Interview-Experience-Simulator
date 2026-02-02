import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { evaluateAnswer } from "../services/aiEvaluator";

const TOTAL_TIME = 120;

const InterviewScreen = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [collectedAnswers, setCollectedAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  /* ================= SUBMIT HANDLER ================= */
  const handleSubmit = useCallback(
    async (autoSubmit = false) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        // ✅ Get AI evaluation
        const evaluation = await evaluateAnswer(
          currentQuestion.text,
          answer || "(No answer provided)"
        );

        const submittedAnswer = {
          questionId: currentQuestion.id,
          question: currentQuestion.text,
          answer: answer || "(No answer provided)",
          timeSpent: TOTAL_TIME - timeLeft,
          autoSubmitted: autoSubmit,
          score: evaluation.score, // ✅ AI score
          feedback: evaluation.aiSummary, // ✅ AI feedback
        };

        const updatedAnswers = [...collectedAnswers, submittedAnswer];
        setCollectedAnswers(updatedAnswers);

        // ✅ Move to next question or finish
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((i) => i + 1);
          setAnswer("");
          setTimeLeft(TOTAL_TIME);
          setIsSubmitting(false);
        } else {
          // ✅ Interview complete - pass answers to parent
          onFinish(updatedAnswers);
        }
      } catch (error) {
        console.error("Submit error:", error);
        setIsSubmitting(false);
      }
    },
    [answer, currentIndex, currentQuestion, timeLeft, questions.length, collectedAnswers, onFinish, isSubmitting]
  );

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!currentQuestion || isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit(true);
          return TOTAL_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, handleSubmit, isSubmitting]);

  /* ================= HELPERS ================= */
  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  const getTimerColor = () => {
    if (timeLeft <= 30) return "text-red-500 dark:text-red-400";
    if (timeLeft <= 60) return "text-yellow-500 dark:text-yellow-400";
    return "text-green-500 dark:text-green-400";
  };

  const getProgressColor = () => {
    if (timeLeft <= 30) return "bg-red-500";
    if (timeLeft <= 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (!currentQuestion) {
    return (
      <div className="text-center text-white text-xl">Loading question…</div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Progress Bar */}
      <div className="mb-4 sm:mb-6 shrink-0">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="bg-white dark:bg-slate-800/80 rounded-xl p-3 sm:p-4 shadow-lg border border-gray-200 dark:border-slate-700 mb-4 sm:mb-6 transition-colors duration-500 shrink-0">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${getTimerColor()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-xl sm:text-2xl md:text-3xl font-bold ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-1000 ${getProgressColor()}`}
            style={{ width: `${(timeLeft / TOTAL_TIME) * 100}%` }}
          />
        </div>
        {timeLeft <= 30 && (
          <p className="text-red-500 dark:text-red-400 text-xs sm:text-sm font-medium mt-2">
            ⚠️ Time running out!
          </p>
        )}
      </div>

      {/* Question - HIGH CONTRAST */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 sm:p-6 mb-4 shadow-lg border-2 border-blue-200 dark:border-blue-800 transition-colors duration-500 shrink-0"
      >
        <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 uppercase tracking-wide">
          Question {currentIndex + 1}
        </p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
          {currentQuestion.text}
        </h2>
      </motion.div>

      {/* Answer Textarea */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-800/80 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-slate-700 min-h-0 transition-colors duration-500">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Your Answer
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          disabled={isSubmitting}
          className="
            flex-1 w-full px-3 sm:px-4 py-2 sm:py-3
            border-2 border-gray-300 dark:border-gray-600
            rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            resize-none
            transition-colors duration-500
            text-sm sm:text-base
            font-medium
            disabled:opacity-50
          "
        />
        <div className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {answer.length} characters
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-4 sm:mt-6 shrink-0">
        <button
          onClick={() => handleSubmit(false)}
          disabled={!answer.trim() || isSubmitting}
          className="
            w-full sm:w-auto sm:min-w-[200px]
            bg-blue-600 hover:bg-blue-500
            text-white
            px-6 sm:px-8 py-2.5 sm:py-3
            rounded-xl
            shadow-lg shadow-blue-600/30
            hover:scale-105 hover:shadow-xl
            active:scale-95
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            text-sm sm:text-base font-semibold
          "
        >
          {isSubmitting
            ? "Evaluating..."
            : currentIndex < questions.length - 1
            ? "Next Question"
            : "Finish Interview"}
        </button>
      </div>
    </div>
  );
};

export default InterviewScreen;