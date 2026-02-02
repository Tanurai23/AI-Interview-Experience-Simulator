import useInterviewStore from "../store/interviewStore";
import ProgressChart from "./ProgressChart";

const AnalyticsScreen = ({ onBack }) => {
  const { sessions } = useInterviewStore();

  if (!sessions.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="max-w-xl p-8 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No Analytics Yet
          </h3>
          <p className="text-gray-600 dark:text-slate-400">
            Analytics will appear after you complete your first interview.
          </p>
          <button
            onClick={onBack}
            className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition-all"
          >
            Start Interview
          </button>
        </div>
      </div>
    );
  }

  /* ================= DATA ================= */
  const reversedSessions = [...sessions].reverse();

  const scores = sessions.map((s, i) => ({
    session: `Session ${i + 1}`,
    score: s.averageScore,
  }));

  const averageScore =
    sessions.reduce((sum, s) => sum + s.averageScore, 0) / sessions.length;

  const bestScore = Math.max(...sessions.map((s) => s.averageScore));

  const improvement =
    sessions.length > 1
      ? sessions[sessions.length - 1].averageScore - sessions[0].averageScore
      : 0;

  /* ================= UI ================= */
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Performance Analytics
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Sessions: {sessions.length}
            </p>
          </div>

          <button
            onClick={onBack}
            className="border border-slate-600 px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-700 transition"
          >
            ← Back
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <AnalyticsCard label="Average Score" value={`${averageScore.toFixed(1)}%`} />
          <AnalyticsCard label="Best Score" value={`${bestScore}%`} />
          <AnalyticsCard
            label="Improvement"
            value={`${improvement >= 0 ? "+" : ""}${improvement.toFixed(1)}%`}
            highlight={improvement >= 0}
          />
        </div>

        {/* Chart */}
        <ProgressChart data={scores} />

        {/* History */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Session History
          </h3>

          <div className="space-y-3">
            {reversedSessions.map((session, index) => (
              <div
                key={session.id}
                className="flex justify-between items-center p-4 bg-slate-900/40 rounded-xl border border-slate-700"
              >
                <div>
                  <p className="font-semibold text-white">
                    Session {reversedSessions.length - index}
                    {index === 0 && (
                      <span className="ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded">
                        Latest
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-400">
                    {session.date} {/* ✅ FIXED */}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-400">
                    {session.averageScore}%
                  </p>
                  <p className="text-xs text-slate-400">
                    {session.results.length} questions
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalyticsCard = ({ label, value, highlight }) => (
  <div className="bg-white dark:bg-slate-800/50 border border-slate-700 rounded-xl p-6">
    <p className="text-sm text-slate-400 mb-1">{label}</p>
    <p
      className={`text-3xl font-bold ${
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
