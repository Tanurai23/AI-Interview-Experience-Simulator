import useInterviewStore from "../store/interviewStore";
import CircularScoreGauge from "./CircularScoreGauge";

const ResultScreen = ({ onAnalytics }) => {
  const { lastResults } = useInterviewStore();

  if (!lastResults || lastResults.length === 0) {
    return (
      <p className="text-center mt-10 text-slate-400">
        No results found. Please complete an interview.
      </p>
    );
  }

  // 🔢 Calculate overall percentage score
  const totalScore = Math.round(
    (lastResults.reduce((sum, r) => sum + r.score, 0) /
      (lastResults.length * 10)) *
      100
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Interview Feedback
        </h2>

        <button
          onClick={onAnalytics}
          className="
            px-4 py-2
            bg-blue-600 hover:bg-blue-500
            text-white rounded-lg
            transition-all
            shadow-md
          "
        >
          View Overall Analytics
        </button>
      </div>

      {/* 🔵 OVERALL SCORE */}
      <div className="flex justify-center">
        <div
          className="
            bg-slate-800/50 backdrop-blur-md
            border border-slate-700
            rounded-3xl p-8
            shadow-xl
          "
        >
          <CircularScoreGauge score={totalScore} />
        </div>
      </div>

      {/* 🧠 QUESTION BREAKDOWN */}
      <div className="space-y-6">
        {lastResults.map((res, idx) => (
          <div
            key={idx}
            className="
              p-6
              bg-slate-800/50 backdrop-blur-md
              border border-slate-700
              rounded-2xl
              shadow-lg
            "
          >
            <p className="text-blue-400 font-semibold text-sm">
              Question {idx + 1}
            </p>

            <p className="font-semibold text-lg text-white mt-1">
              {res.question}
            </p>

            <p className="text-sm font-medium text-slate-400 mt-1">
              Score: {res.score}/10
            </p>

            <div className="mt-4 text-sm text-slate-300 leading-relaxed">
              <strong>AI Summary:</strong> {res.aiSummary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultScreen;
