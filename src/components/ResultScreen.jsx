import useInterviewStore from "../store/interviewStore";
import CircularScoreGauge from "./CircularScoreGauge";

const MAX_SCORE_PER_QUESTION = 10;

const ResultScreen = ({ onAnalytics, onRestart }) => {
  const { lastResults } = useInterviewStore();

  /* ================= SAFETY GUARD ================= */
  if (!lastResults || lastResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            No Results Available
          </h2>
          <p className="text-slate-400">
            Please complete an interview to see results.
          </p>
        </div>
        <button
          onClick={onRestart}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition-all"
        >
          Start Interview
        </button>
      </div>
    );
  }

  /* ================= CALCULATIONS ================= */
  const totalScore = Math.round(
    (lastResults.reduce((sum, r) => sum + (r.score || 0), 0) /
      (lastResults.length * MAX_SCORE_PER_QUESTION)) *
      100
  );

  const averageScore =
    lastResults.reduce((sum, r) => sum + (r.score || 0), 0) /
    lastResults.length;

  /* ================= UI ================= */
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h2 className="text-3xl font-bold text-white">
            Interview Feedback
          </h2>

          <div className="flex gap-3">
            <button
              onClick={onAnalytics}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl"
            >
              View Analytics
            </button>
            <button
              onClick={onRestart}
              className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-xl"
            >
              New Interview
            </button>
          </div>
        </div>

        {/* Score Gauge */}
        <div className="flex justify-center py-8">
          <CircularScoreGauge score={totalScore} />
        </div>

        {/* Summary */}
        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Performance Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Questions" value={lastResults.length} />
            <StatCard label="Avg Score" value={`${averageScore.toFixed(1)}/10`} />
            <StatCard label="Overall" value={`${totalScore}%`} />
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">
            Question Breakdown
          </h3>

          {lastResults.map((result, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-5"
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold text-white">
                  Q{index + 1}: {result.question}
                </h4>
                <span className="text-blue-400 font-bold">
                  {result.score}/10
                </span>
              </div>

              <p className="text-slate-300 text-sm">
                {result.answer}
              </p>

              {result.feedback && (
                <p className="mt-2 text-slate-400 text-sm">
                  💡 {result.feedback}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENT ================= */
const StatCard = ({ label, value }) => (
  <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
    <p className="text-sm text-slate-400">{label}</p>
    <p className="text-2xl font-bold text-blue-400">{value}</p>
  </div>
);

export default ResultScreen;
