import useInterviewStore from "../store/interviewStore";

function HistoryScreen() {
  const { attempts } = useInterviewStore();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Interview History</h2>

     {attempts.length === 0 && (
  <p className="text-sm text-gray-400 italic">
    No interviews taken yet. Your progress will appear here.
  </p>
)}

      {attempts.map((attempt, index) => (
        <div
          key={index}
          className="flex justify-between p-3 mb-2 border rounded"
        >
          <span>
            Attempt {index + 1}
          </span>
          <span className="font-semibold">
            Score: {attempt.score}
          </span>
        </div>
      ))}
    </div>
  );
}

export default HistoryScreen;
