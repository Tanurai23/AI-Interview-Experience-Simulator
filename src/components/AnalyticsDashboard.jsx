import useInterviewStore from "../store/interviewStore";
import { calculateAnalytics } from "../utils/analytics";

const AnalyticsDashboard = () => {
  const { results } = useInterviewStore();
  const analytics = calculateAnalytics(results);

  if (!analytics) {
    return (
      <p className="text-center mt-20 text-gray-400">
        No interview data available.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-8">
      <h2 className="text-3xl font-bold text-center">
        Interview Analytics
      </h2>

      {/* SCORE CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Average Score" value={`${analytics.avgScore}%`} />
        <StatCard title="Questions" value={analytics.totalQuestions} />
        <StatCard
          title="Performance"
          value={analytics.avgScore >= 70 ? "Strong" : "Needs Improvement"}
        />
      </div>

      {/* STRENGTHS */}
      <Section title="Strengths" items={analytics.strengths} color="green" />

      {/* WEAKNESSES */}
      <Section title="Weaknesses" items={analytics.weaknesses} color="red" />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const Section = ({ title, items, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
    <h3 className={`text-xl font-semibold text-${color}-500 mb-4`}>
      {title}
    </h3>

    {items.length === 0 ? (
      <p className="text-gray-400 text-sm">No data</p>
    ) : (
      <ul className="list-disc pl-5 text-sm">
        {items.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    )}
    <ProgressChart data={sessionHistory} />

  </div>
);

export default AnalyticsDashboard;
