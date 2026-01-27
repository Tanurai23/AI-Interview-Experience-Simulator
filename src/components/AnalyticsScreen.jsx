import useInterviewStore from "../store/interviewStore";
import ProgressChart from "./ProgressChart";

const AnalyticsScreen = ({ onBack }) => {
  const { sessions } = useInterviewStore();

  if (!sessions.length) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-slate-800/50 border border-slate-700 rounded-xl text-center text-slate-400">
        Analytics will appear after you complete your first interview.
      </div>
    );
  }

  const scores = sessions.map((s, index) => ({
    session: `Session ${sessions.length - index}`,
    score: s.averageScore,
  }));

  const averageScore =
    sessions.reduce((sum, s) => sum + s.averageScore, 0) / sessions.length;

  const bestScore = Math.max(...sessions.map((s) => s.averageScore));

  const improvement =
    sessions.length > 1
      ? sessions[0].averageScore -
        sessions[sessions.length - 1].averageScore
      : 0;

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Performance Analytics
        </h2>

        <button
          onClick={onBack}
          className="border border-slate-600 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-700"
        >
          Back
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <AnalyticsCard label="Average Score" value={`${averageScore.toFixed(1)}%`} />
        <AnalyticsCard label="Best Score" value={`${bestScore}%`} />
        <AnalyticsCard
          label="Improvement"
          value={`${improvement >= 0 ? "+" : ""}${improvement}%`}
          highlight={improvement >= 0}
        />
      </div>

      <ProgressChart data={scores} />
    </div>
  );
};

const AnalyticsCard = ({ label, value, highlight }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
    <p className="text-sm text-slate-400">{label}</p>
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
