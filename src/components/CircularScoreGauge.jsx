const CircularScoreGauge = ({ score = 0, size = 140 }) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width={size}
        height={size}
        className="rotate-[-90deg]"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#334155" // slate-700
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6" // blue-500
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center Text */}
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-white">
          {score}%
        </span>
        <span className="text-xs text-slate-400 tracking-wide">
          SCORE
        </span>
      </div>
    </div>
  );
};

export default CircularScoreGauge;
