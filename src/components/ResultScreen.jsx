import useInterviewStore from "../store/interviewStore";

const ResultScreen = ({ onAnalytics }) => {
  const { results, finishInterview } = useInterviewStore();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Interview Feedback</h2>
        <button
          onClick={() => {
            finishInterview();
            onAnalytics();
          }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md"
        >
          View Overall Analytics
        </button>
      </div>

      {results.length === 0 ? (
        <p className="text-center text-gray-500">No results found. Please complete an interview.</p>
      ) : (
        results.map((res, idx) => (
          <div
            key={idx}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="space-y-4">
              {/* Question Header */}
              <div>
                <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider">Question {idx + 1}</p>
                <p className="font-semibold text-lg text-gray-900 dark:text-white">{res.question}</p>
                <p className="text-sm font-medium text-gray-500">Score: {res.score}/10</p>
              </div>

              {/* STAR Method Feedback */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-xs font-bold text-gray-400 mb-2">STAR ANALYSIS</p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li><span className="font-bold text-indigo-500">S:</span> {res.situation || "N/A"}</li>
                  <li><span className="font-bold text-indigo-500">T:</span> {res.task || "N/A"}</li>
                  <li><span className="font-bold text-indigo-500">A:</span> {res.action || "N/A"}</li>
                  <li><span className="font-bold text-indigo-500">R:</span> {res.result || "N/A"}</li>
                </ul>
              </div>

              {/* AI Summary */}
              <div className="border-t pt-3">
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  <span className="text-indigo-600">AI Summary:</span> {res.aiSummary || "No summary available"}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ResultScreen;