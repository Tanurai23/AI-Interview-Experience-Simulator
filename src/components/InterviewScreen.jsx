import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const TOTAL_TIME = 120;

const InterviewScreen = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [collectedAnswers, setCollectedAnswers] = useState([]);

  const submittingRef = useRef(false); // 🔒 prevents double submit

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  /* ================= SUBMIT HANDLER ================= */
  const handleSubmit = useCallback(
    (autoSubmit = false) => {
      if (submittingRef.current) return;
      submittingRef.current = true;

      const submittedAnswer = {
        questionId: currentQuestion.id,
        question: currentQuestion.text, // ✅ FIXED KEY
        answer: answer || "(No answer provided)",
        timeSpent: TOTAL_TIME - timeLeft,
        autoSubmitted: autoSubmit,
      };

      setCollectedAnswers((prev) => {
        const updated = [...prev, submittedAnswer];

        if (currentIndex < questions.length - 1) {
          setTimeout(() => {
            submittingRef.current = false;
            setCurrentIndex((i) => i + 1);
            setAnswer("");
            setTimeLeft(TOTAL_TIME);
          }, 0);
        } else {
          onFinish(updated); // ✅ guaranteed full data
        }

        return updated;
      });
    },
    [answer, currentIndex, currentQuestion, timeLeft, questions.length, onFinish]
  );

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!currentQuestion) return;

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
  }, [handleSubmit, currentQuestion]);

  /* ================= HELPERS ================= */
  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  if (!currentQuestion) {
    return (
      <div className="text-center text-white text-xl">
        Loading question…
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="w-full flex flex-col">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700 rounded-xl p-4 mb-5">
        <p className="text-3xl font-bold text-blue-400">
          {formatTime(timeLeft)}
        </p>
      </div>

      {/* Question */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 mb-5"
      >
        <p className="text-blue-400 text-sm mb-2 uppercase">
          Question {currentIndex + 1}
        </p>
        <h2 className="text-2xl font-semibold text-white">
          {currentQuestion.text}
        </h2>
      </motion.div>

      {/* Answer */}
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="
          w-full min-h-[150px]
          bg-slate-900 border border-slate-700
          rounded-xl p-4
          text-white
          focus:ring-2 focus:ring-blue-500
        "
      />

      {/* Submit */}
      <button
        onClick={() => handleSubmit(false)}
        disabled={!answer.trim()}
        className="
          mt-6 self-start
          bg-blue-600 hover:bg-blue-500
          px-6 py-3 rounded-lg
          text-white font-semibold
          transition-all
          disabled:opacity-50
        "
      >
        {currentIndex < questions.length - 1
          ? "Next Question"
          : "Finish Interview"}
      </button>
    </div>
  );
};

export default InterviewScreen;
