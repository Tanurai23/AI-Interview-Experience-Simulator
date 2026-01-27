const CircularScoreGauge = ({ score }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="160" height="160" className="-rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#1e293b"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#3b82f6"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* CENTER TEXT */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">
          {score}%
        </span>
        <span className="text-sm text-slate-400">
          Overall Score
        </span>
      </div>
    </div>
  );
};

export default CircularScoreGauge;
