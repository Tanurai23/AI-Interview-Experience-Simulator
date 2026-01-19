import useInterviewStore from "../store/interviewStore";

const SessionHistory = () => {
  const { sessionHistory } = useInterviewStore();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Past Sessions</h3>

      {sessionHistory.length === 0 ? (
        <p className="text-sm text-gray-400">No sessions yet</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {sessionHistory.map((s, i) => (
            <li key={i} className="flex justify-between">
              <span>Session {s.session}</span>
              <span className="font-medium">{s.score}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionHistory;
