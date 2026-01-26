import { PlayCircle, BarChart2 } from "lucide-react";

const Home = ({ onStartInterview, onAnalytics }) => {
  return (
    <section className="max-w-xl text-center space-y-6 mx-auto">
      <h1 className="text-4xl font-extrabold text-white mb-4">
        GoodSpace AI
      </h1>

      <p className="text-lg text-slate-300 mb-2">
        AI Interview Experience Simulator
      </p>

      <p className="text-sm text-slate-400 mb-10">
        Practice AI-powered interviews and get instant feedback.
      </p>

      <div className="flex flex-col items-center gap-4 mt-8">
        {/* PRIMARY BUTTON */}
        <button
          onClick={onStartInterview}
          className="
            group flex items-center gap-2
            px-6 py-3 rounded-xl
            bg-gradient-to-r from-blue-600 to-indigo-600
            text-white font-medium
            shadow-lg shadow-blue-600/30
            hover:scale-105 hover:shadow-xl
            active:scale-95
            transition-all
          "
        >
          <PlayCircle className="w-5 h-5 group-hover:rotate-6 transition" />
          Start Interview
        </button>

        {/* SECONDARY BUTTON */}
        <button
          onClick={onAnalytics}
          className="
            flex items-center gap-2
            px-6 py-3 rounded-xl
            border border-slate-700
            text-slate-200
            bg-slate-800/40 backdrop-blur-md
            hover:bg-slate-700/50
            transition
          "
        >
          <BarChart2 className="w-5 h-5" />
          Analytics
        </button>
      </div>
    </section>
  );
};

export default Home;
