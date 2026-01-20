import useInterviewStore from "../store/interviewStore";

const ResultScreen = ({ onAnalytics }) => {
  const { lastResults } = useInterviewStore();

  if (!lastResults || lastResults.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No results found. Please complete an interview.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Interview Feedback</h2>

        <button
          onClick={onAnalytics}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md"
        >
          View Overall Analytics
        </button>
      </div>

      {lastResults.map((res, idx) => (
        <div
          key={idx}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border"
        >
          <p className="text-indigo-600 font-bold text-sm">
            Question {idx + 1}
          </p>

          <p className="font-semibold text-lg">{res.question}</p>

          <p className="text-sm font-medium text-gray-500">
            Score: {res.score}/10
          </p>

          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            <strong>AI Summary:</strong> {res.aiSummary}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultScreen;
