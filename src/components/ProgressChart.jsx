import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProgressChart = ({ data }) => {
  return (
    <div
      className="
        bg-white/90 dark:bg-slate-800/60
        backdrop-blur-md
        border border-gray-300 dark:border-slate-700
        rounded-xl p-4 sm:p-6
        shadow-xl
        transition-colors duration-500
      "
    >
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Interview Progress
      </h3>

      <div className="w-full h-[200px] sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="session"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              className="dark:stroke-slate-400"
            />
            <YAxis
              domain={[0, 100]}
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              className="dark:stroke-slate-400"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                borderColor: "#334155",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;