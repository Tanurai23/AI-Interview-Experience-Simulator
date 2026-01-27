import useInterviewStore from "../store/interviewStore";

function HistoryScreen() {
  const sessions = useInterviewStore((state) => state.sessions) || [];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      {/* HEADER */}
      <h2 className="text-2xl font-bold text-white mb-6">
        Interview History
      </h2>

      {sessions.length === 0 ? (
        <div
          className="
            bg-slate-800/50 backdrop-blur-md
            border border-slate-700
            rounded-xl p-6
            text-center
          "
        >
          <p className="text-sm text-slate-400 italic">
            No interviews taken yet. Your progress will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className="
                flex justify-between items-center
                p-5
                bg-slate-800/50 backdrop-blur-md
                border border-slate-700
                rounded-xl
                shadow-lg
              "
            >
              <div>
                <p className="text-sm text-slate-400">
                  Attempt {index + 1}
                </p>
                <p className="text-xs text-slate-500">
                  {session.date}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-slate-400">
                  Avg Score
                </p>
                <p className="text-lg font-bold text-blue-400">
                  {session.averageScore}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryScreen;
