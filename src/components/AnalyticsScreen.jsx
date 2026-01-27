import useInterviewStore from "../store/interviewStore";
import ProgressChart from "./ProgressChart";

const AnalyticsScreen = ({ onBack }) => {
  const { history } = useInterviewStore();

  if (!history || history.length === 0) {
    return (
      <div className="
        max-w-xl mx-auto mt-10 p-6
        bg-slate-800/50 backdrop-blur-md
        border border-slate-700 rounded-xl
        text-center text-slate-400
      ">
        Analytics will appear after you complete your first interview.
      </div>
    );
  }

  const scores = history.map((s, index) => ({
    session: `Session ${history.length - index}`,
    score: s.score,
  }));

  const averageScore =
    history.reduce((sum, s) => sum + s.score, 0) / history.length;

  const bestScore = Math.max(...history.map((s) => s.score));
  const improvement =
    history.length > 1
      ? history[0].score - history[history.length - 1].score
      : 0;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Performance Analytics
        </h2>

        <button
          onClick={onBack}
          className="
            px-4 py-2 rounded-lg
            border border-slate-600
            text-slate-300 hover:bg-slate-700
            transition
          "
        >
          Back
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard label="Average Score" value={`${averageScore.toFixed(1)}%`} />
        <AnalyticsCard label="Best Score" value={`${bestScore}%`} />
        <AnalyticsCard
          label="Improvement"
          value={`${improvement >= 0 ? "+" : ""}${improvement}%`}
          highlight={improvement >= 0}
        />
      </div>

      {/* CHART */}
      <ProgressChart data={scores} />
    </div>
  );
};

const AnalyticsCard = ({ label, value, highlight }) => (
  <div className="
    bg-slate-800/50 backdrop-blur-md
    border border-slate-700 rounded-xl
    p-6 text-center shadow-lg
  ">
    <p className="text-sm text-slate-400 mb-1">{label}</p>
    <p
      className={`text-2xl font-bold ${
        highlight === undefined
          ? "text-white"
          : highlight
          ? "text-green-400"
          : "text-red-400"
      }`}
    >
      {value}
    </p>
  </div>
);

export default AnalyticsScreen;
