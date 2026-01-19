import useInterviewStore from "../store/interviewStore";

function AnalyticsScreen() {
  const { attempts } = useInterviewStore();

  if (attempts.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <p className="text-sm text-gray-400 italic">
  Analytics will appear after you complete your first interview.
</p>

      </div>
    );
  }

  const scores = attempts.map((a) => a.score);
  const averageScore =
    scores.reduce((sum, s) => sum + s, 0) / scores.length;

  const bestScore = Math.max(...scores);
  const improvement =
    scores.length > 1 ? scores[scores.length - 1] - scores[0] : 0;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Performance Analytics</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded text-center">
          <p className="text-gray-500 text-sm">Average Score</p>
          <p className="text-xl font-bold">{averageScore.toFixed(1)}</p>
        </div>

        <div className="p-4 border rounded text-center">
          <p className="text-gray-500 text-sm">Best Score</p>
          <p className="text-xl font-bold">{bestScore}</p>
        </div>

        <div className="p-4 border rounded text-center">
          <p className="text-gray-500 text-sm">Improvement</p>
          <p
            className={`text-xl font-bold ${
              improvement >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {improvement >= 0 ? "+" : ""}
            {improvement}
          </p>
        </div>
      </div>

      <h3 className="font-semibold mb-2">Score Trend</h3>
      <div className="flex gap-2">
        {scores.map((score, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white text-sm flex items-end justify-center rounded"
            style={{
              height: `${score * 10}px`,
              width: "40px",
            }}
          >
            {score}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsScreen;
