import useInterviewStore from "../store/interviewStore";

const HistoryScreen = ({ onBack }) => {
  const { sessions, clearSessions } = useInterviewStore();

  if (!sessions || sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6">
        <div className="text-center">
          <svg className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Interview History
          </h2>
          <p className="text-gray-600 dark:text-slate-400">
            Your completed interviews will appear here.
          </p>
        </div>
        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition-all shadow-lg"
        >
          Start First Interview
        </button>
      </div>
    );
  }

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all interview history?")) {
      clearSessions();
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Interview History
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {sessions.length} interview{sessions.length !== 1 ? "s" : ""} completed
            </p>
          </div>

          <button
            onClick={handleClearAll}
            className="text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              {/* Session Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg
                    ${
                      index === 0
                        ? "bg-blue-600"
                        : "bg-gray-400 dark:bg-gray-600"
                    }
                  `}
                  >
                    #{sessions.length - index}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Session {sessions.length - index}
                      {index === 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                          Latest
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {session.date}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {session.averageScore}%
                  </p>
                </div>
              </div>

              {/* Session Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Questions</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {session.totalQuestions}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Avg Score</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {(
                      session.results.reduce((sum, r) => sum + (r.score || 0), 0) /
                      session.results.length
                    ).toFixed(1)}
                    /10
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-lg p-3 col-span-2 sm:col-span-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {Math.round(
                      session.results.reduce((sum, r) => sum + (r.timeSpent || 0), 0) / 60
                    )}{" "}
                    min
                  </p>
                </div>
              </div>

              {/* View Details Button */}
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;