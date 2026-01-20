export const calculateAnalytics = (results) => {
  if (!results || results.length === 0) return null;

  const totalScore = results.reduce(
    (sum, r) => sum + (r.score || 0),
    0
  );

  const avgScore = Math.round(totalScore / results.length);

  const strengths = [];
  const weaknesses = [];

  results.forEach((r) => {
    if (!r.question) return;

    if (r.score >= 70) {
      strengths.push({
        question: r.question,
        score: r.score,
      });
    } else {
      weaknesses.push({
        question: r.question,
        score: r.score,
      });
    }
  });

  return {
    avgScore,
    totalQuestions: results.length,
    strengths,
    weaknesses,
  };
};

export const formatAnalyticsReport = (analytics) => {
  if (!analytics) return "No analytics available.";

  let report = `Interview Analytics Report\n\n`;
  report += `Average Score: ${analytics.avgScore}%\n`;
  report += `Total Questions: ${analytics.totalQuestions}\n\n`;

  report += `Strengths:\n`;
  if (analytics.strengths.length === 0) {
    report += `- None\n`;
  } else {
    analytics.strengths.forEach((item) => {
      report += `- ${item.question} (${item.score}%)\n`;
    });
  }

  report += `\nWeaknesses:\n`;
  if (analytics.weaknesses.length === 0) {
    report += `- None\n`;
  } else {
    analytics.weaknesses.forEach((item) => {
      report += `- ${item.question} (${item.score}%)\n`;
    });
  }

  return report;
};
