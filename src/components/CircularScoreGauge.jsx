const CircularScoreGauge = ({ score }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 80) return "#10b981"; // green
    if (score >= 60) return "#3b82f6"; // blue
    if (score >= 40) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* SVG Circle */}
      <svg width="200" height="200" className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#1e293b"
          strokeWidth="12"
          fill="none"
          className="dark:stroke-slate-800"
        />
        
        {/* Progress Circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke={getScoreColor()}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* CENTER TEXT - Properly positioned */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-gray-900 dark:text-white mb-1">
          {score}%
        </span>
        <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
          Overall Score
        </span>
      </div>

      {/* Performance Label */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <span className={`
          px-4 py-1.5 rounded-full text-xs font-bold
          ${score >= 80 ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : ''}
          ${score >= 60 && score < 80 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : ''}
          ${score >= 40 && score < 60 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' : ''}
          ${score < 40 ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : ''}
        `}>
          {score >= 80 ? '🎉 Excellent!' : ''}
          {score >= 60 && score < 80 ? '👍 Good Job!' : ''}
          {score >= 40 && score < 60 ? '📈 Keep Improving!' : ''}
          {score < 40 ? '💪 Practice More!' : ''}
        </span>
      </div>
    </div>
  );
};

export default CircularScoreGauge;