import useInterviewStore from "../store/interviewStore";
import { calculateAnalytics } from "../utils/analytics";

const AnalyticsDashboard = () => {
  const { results } = useInterviewStore();

  // ✅ STEP 1: SAFETY GUARD (THIS WAS MISSING)
  if (!results || results.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-400">
        No interview data available yet.
      </div>
    );
  }

  // ✅ STEP 2: SAFE CALCULATION
  const analytics = calculateAnalytics(results);

  if (!analytics) {
    return (
      <div className="text-center mt-10 text-gray-400">
        Unable to calculate analytics.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Interview Analytics</h2>

      {/* SCORE CARD */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded">
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-xl font-bold">{analytics.averageScore}</p>
        </div>

        <div className="p-4 border rounded">
          <p className="text-sm text-gray-500">Best Score</p>
          <p className="text-xl font-bold">{analytics.bestScore}</p>
        </div>

        <div className="p-4 border rounded">
          <p className="text-sm text-gray-500">Attempts</p>
          <p className="text-xl font-bold">{analytics.totalAttempts}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
