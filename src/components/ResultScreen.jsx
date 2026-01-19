import useInterviewStore from "../store/interviewStore";

const ResultScreen = ({ onAnalytics }) => {

  const { results } = useInterviewStore();

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Interview Feedback</h2>

      {results.map((res, idx) => (
        <div
          key={idx}
          className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow"
        >
          <p className="font-semibold mb-2">{res.question}</p>
          <p className="text-sm text-gray-500 mb-2">Score: {res.score}/100</p>

          <ul className="list-disc pl-5 text-sm">
            {res.feedback.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          <button
  onClick={() => onAnalytics()}
  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
>
  View Analytics
</button>

        </div>
      ))}
    </div>
  );
};

export default ResultScreen;
