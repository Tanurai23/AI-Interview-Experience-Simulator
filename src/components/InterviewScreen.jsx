import { useEffect, useState, useCallback, useRef } from "react";
import useInterviewStore from "../store/interviewStore";
import questions from "../data/questions";
import { evaluateAnswer } from "../services/aiEvaluator";

const InterviewScreen = ({ onFinish }) => {
  const textareaRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(60);
  const [answer, setAnswer] = useState("");

  const {
    currentIndex,
    saveAnswer,
    nextQuestion,
    addResult,
    saveEvaluation,
  } = useInterviewStore();

  const currentQuestion = questions[currentIndex];

  // ---------- HANDLE NEXT ----------
  const handleNext = useCallback(
  async (isAutoSubmit = false) => {
    if (!isAutoSubmit && !answer.trim()) return;

    // 1️⃣ AI Evaluation
    const evaluation = await evaluateAnswer(
      currentQuestion.text,
      answer
    );

    // 2️⃣ Save evaluation
    saveEvaluation(currentIndex, evaluation);

    // 3️⃣ Save full result
    addResult({
      question: currentQuestion.text,
      answer,
      ...evaluation,
    });

    // 4️⃣ Save raw answer
    saveAnswer(currentIndex, answer);

    // 5️⃣ Reset
    setAnswer("");

    // 6️⃣ Move forward
    if (currentIndex === questions.length - 1) {
      onFinish();
    } else {
      nextQuestion();
      setTimeLeft(60);
    }
  },
  [
    answer,
    currentIndex,
    nextQuestion,
    onFinish,
    saveAnswer,
    addResult,
    saveEvaluation,
    currentQuestion,
  ]
);


  // ---------- TIMER ----------
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleNext]);

  // ---------- AUTO FOCUS ----------
  useEffect(() => {
    textareaRef.current?.focus();
  }, [currentIndex]);

  // ---------- KEYBOARD ----------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && e.ctrlKey) {
        handleNext(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext]);

  if (!currentQuestion) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading question...
      </p>
    );
  }

  return (
    <main className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* HEADER */}
      <header className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase">
            Question {currentIndex + 1} / {questions.length}
          </span>

          <span
            className={`font-mono font-bold ${
              timeLeft <= 10
                ? "text-red-600 animate-pulse"
                : "text-blue-600"
            }`}
          >
            ⏱ {timeLeft}s
          </span>
        </div>

        <div className="w-full bg-gray-100 h-2 rounded-full">
          <div
            className="bg-blue-600 h-full transition-all"
            style={{
              width: `${
                ((currentIndex + 1) / questions.length) * 100
              }%`,
            }}
          />
        </div>
      </header>

      {/* QUESTION */}
      <h2 className="text-xl font-medium mb-6">
        {currentQuestion.text}
      </h2>

      {/* ANSWER */}
      <textarea
        ref={textareaRef}
        rows="5"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border-2 p-4 rounded-xl mb-4"
        placeholder="Type your answer here..."
      />

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          onClick={() => handleNext(false)}
          disabled={!answer.trim()}
          className={`px-5 py-2 rounded-lg font-medium transition ${
            answer.trim()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {currentIndex === questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </button>
      </div>
    </main>
  );
};

export default InterviewScreen;
