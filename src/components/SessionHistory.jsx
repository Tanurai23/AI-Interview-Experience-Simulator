import useInterviewStore from "../store/interviewStore";

const SessionHistory = () => {
  const sessions =
    useInterviewStore((state) => state.sessions) || [];

  if (sessions.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No interview sessions yet.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-6">
        Interview History
      </h2>

      {sessions.map((session, index) => (
        <div
          key={session.id}
          className="mb-4 p-4 bg-white rounded-xl shadow"
        >
          <p className="text-sm text-gray-500">
            Session #{index + 1}
          </p>

          <p className="text-xs text-gray-400">
            {session.date}
          </p>

          <p className="mt-2 text-sm font-medium">
            Questions: {session.totalQuestions}
          </p>

          <p className="text-sm font-semibold text-blue-600">
            Avg Score: {session.averageScore}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default SessionHistory;
