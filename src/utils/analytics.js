export const calculateAnalytics = (results) => {
  if (!results.length) return null;

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const avgScore = Math.round(totalScore / results.length);

  const strengths = [];
  const weaknesses = [];

  results.forEach((r) => {
    if (r.score >= 70) strengths.push(r.question);
    else weaknesses.push(r.question);
  });

  return {
    avgScore,
    strengths,
    weaknesses,
    totalQuestions: results.length,
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
      analytics.strengths.forEach((q) => {
        report += `- ${q}\n`;
      });
    }       
    report += `\nWeaknesses:\n`;
    if (analytics.weaknesses.length === 0) {
      report += `- None\n`;
    } else {
      analytics.weaknesses.forEach((q) => {
        report += `- ${q}\n`;
      });   
    }
   
    return report;
};