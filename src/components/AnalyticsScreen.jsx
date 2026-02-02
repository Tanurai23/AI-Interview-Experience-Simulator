import useInterviewStore from "../store/interviewStore";
import ProgressChart from "./ProgressChart";

const AnalyticsScreen = ({ onBack }) => {
  const { sessions } = useInterviewStore();

  if (!sessions || sessions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="max-w-xl p-8 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-2xl text-center transition-colors duration-500">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No Analytics Yet
          </h3>
          <p className="text-gray-600 dark:text-slate-400">
            Analytics will appear after you complete your first interview.
          </p>
          <button
            onClick={onBack}
            className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            Start Interview
          </button>
        </div>
      </div>
    );
  }

  /* ================= DATA ================= */
  // Sessions are already in reverse order (newest first) from store
  const scores = sessions.map((s, i) => ({
    session: `Session ${sessions.length - i}`,
    score: s.averageScore,
  })).reverse(); // Reverse for chart (oldest to newest)

  const averageScore =
    sessions.reduce((sum, s) => sum + s.averageScore, 0) / sessions.length;

  const bestScore = Math.max(...sessions.map((s) => s.averageScore));

  const improvement =
    sessions.length > 1
      ? sessions[0].averageScore - sessions[sessions.length - 1].averageScore
      : 0;

  /* ================= UI ================= */
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Performance Analytics
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Total Sessions: {sessions.length}
            </p>
          </div>

          <button
            onClick={onBack}
            className="border-2 border-gray-300 dark:border-slate-600 px-6 py-3 rounded-xl text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all text-sm sm:text-base font-medium"
          >
            ← Back
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <AnalyticsCard
            label="Average Score"
            value={`${averageScore.toFixed(1)}%`}
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            }
          />
          <AnalyticsCard
            label="Best Score"
            value={`${bestScore}%`}
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            }
          />
          <AnalyticsCard
            label="Improvement"
            value={`${improvement >= 0 ? "+" : ""}${improvement.toFixed(1)}%`}
            highlight={improvement >= 0}
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>

        {/* Progress Chart */}
        <ProgressChart data={scores} />

        {/* Session History */}
        <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 transition-colors duration-500">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Session History
          </h3>

          <div className="space-y-3">
            {sessions.map((session, index) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-800 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                    ${
                      index === 0
                        ? "bg-blue-600 ring-4 ring-blue-200 dark:ring-blue-900"
                        : "bg-gray-400 dark:bg-gray-600"
                    }
                  `}
                  >
                    {sessions.length - index}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Session {sessions.length - index}
                      {index === 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                          Latest
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.date}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {session.averageScore}%
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {session.results?.length || 0} questions
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

const AnalyticsCard = ({ label, value, highlight, icon }) => (
  <div className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-gray-600 dark:text-slate-400">{label}</p>
      <div
        className={`
        ${highlight === undefined ? "text-blue-600 dark:text-blue-400" : ""}
        ${highlight === true ? "text-green-600 dark:text-green-400" : ""}
        ${highlight === false ? "text-red-600 dark:text-red-400" : ""}
      `}
      >
        {icon}
      </div>
    </div>
    <p
      className={`text-3xl font-bold ${
        highlight === undefined
          ? "text-gray-900 dark:text-white"
          : highlight
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`}
    >
      {value}
    </p>
  </div>
);

export default AnalyticsScreen;