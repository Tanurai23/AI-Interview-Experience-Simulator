import useInterviewStore from "../store/interviewStore";

function HistoryScreen() {
  const sessions = useInterviewStore((state) => state.sessions) || [];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Interview History
      </h2>

      {sessions.length === 0 ? (
        <p className="text-sm text-gray-400 italic">
          No interviews taken yet. Your progress will appear here.
        </p>
      ) : (
        sessions.map((session, index) => (
          <div
            key={session.id}
            className="flex justify-between p-3 mb-2 border rounded"
          >
            <span>
              Attempt {index + 1}
            </span>
            <span className="font-semibold">
              Avg Score: {session.averageScore}%
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoryScreen;
