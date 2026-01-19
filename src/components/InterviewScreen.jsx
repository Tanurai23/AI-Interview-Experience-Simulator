import { useEffect, useState, useCallback, useRef } from "react";
import useInterviewStore from "../store/interviewStore";
import questions from "../data/questions";
import { evaluateAnswer } from "../utils/evaluateAnswer";


const InterviewScreen = ({ onFinish }) => {
  const textareaRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState(60);
  const [answer, setAnswer] = useState("");

  const {
  currentIndex,
  saveAnswer,
  nextQuestion,
  addResult,
} = useInterviewStore();


  const currentQuestion = questions[currentIndex];

  // ---------- HANDLE NEXT (manual / auto submit) ----------
  const handleNext = useCallback(
  (isAutoSubmit = false) => {
    if (!isAutoSubmit && !answer.trim()) return;

    // ✅ STEP 1: Evaluate answer
    const evaluation = evaluateAnswer(
      answer,
      currentQuestion.topic
    );

    // ✅ STEP 2: Save evaluated result
    addResult({
      question: currentQuestion.text,
      answer,
      ...evaluation,
    });

    // ✅ STEP 3: Save raw answer (optional but good)
    saveAnswer(currentIndex, answer);

    // ✅ STEP 4: Reset answer
    setAnswer("");

    // ✅ STEP 5: Move forward
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

  // ---------- AUTO FOCUS TEXTAREA ----------
  useEffect(() => {
    textareaRef.current?.focus();
  }, [currentIndex]);

  // ---------- KEYBOARD SHORTCUT (Ctrl + Enter) ----------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && e.ctrlKey) {
        handleNext(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext]);

  if (!currentQuestion) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading question...
      </p>
    );
  }

  return (
    <main
      className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg"
      aria-labelledby="question-heading"
    >
      {/* HEADER */}
      <header className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Question {currentIndex + 1} / {questions.length}
          </span>

          <span
            aria-live="polite"
            aria-label={`Time left ${timeLeft} seconds`}
            className={`font-mono font-bold transition-all duration-300 ${
              timeLeft <= 10
                ? "text-red-600 scale-110 animate-pulse"
                : "text-blue-600"
            }`}
          >
            ⏱ {timeLeft}s
          </span>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-500 ease-out"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* QUESTION */}
      <h2
        id="question-heading"
        key={currentIndex}
        className="text-xl font-medium text-gray-800 mb-6 leading-relaxed animate-fadeIn"
      >
        {currentQuestion.text}
      </h2>

      {/* ANSWER INPUT */}
      <textarea
        ref={textareaRef}
        className="
          w-full border-2 border-gray-200
          focus:border-blue-500
          focus:ring-2 focus:ring-blue-200
          p-4 rounded-xl mb-2
          transition-all outline-none
        "
        rows="5"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
      />

      <p className="text-xs text-gray-400 mb-4">
        Press <strong>Ctrl + Enter</strong> to continue
      </p>

      {/* ACTION */}
      <div className="flex justify-end">
        <button
  onClick={() => handleNext(false)}
  disabled={!answer.trim()}
  className={`
    px-5 py-2 rounded-lg font-medium
    transition-all duration-150
    focus:outline-none
    focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
    ${
      answer.trim()
        ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-md"
        : "bg-gray-200 text-gray-400 cursor-not-allowed disabled:opacity-80 disabled:pointer-events-none"
    }
  `}
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
