import { PlayCircle, BarChart2 } from "lucide-react";

const Home = ({ onStartInterview, onAnalytics }) => {
  return (
    <section className="max-w-xl text-center space-y-6 mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        GoodSpace AI
      </h1>

      <p className="text-lg text-gray-600 mb-2">
        AI Interview Experience Simulator
      </p>

      <p className="text-sm text-gray-500 mb-10">
        Practice AI-powered interviews and get instant feedback.
      </p>

      <div className="flex flex-col items-center gap-4 mt-8">
        <button
          onClick={onStartInterview}
          className="group flex items-center gap-2 px-6 py-3 rounded-xl
          bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium
          shadow-lg hover:scale-105 transition-all"
        >
          <PlayCircle className="w-5 h-5 group-hover:rotate-6 transition" />
          Start Interview
        </button>

        <button
          onClick={onAnalytics}
          className="flex items-center gap-2 px-6 py-3 rounded-xl
          border border-gray-300 dark:border-gray-600
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <BarChart2 className="w-5 h-5" />
          Analytics
        </button>
      </div>
    </section>
  );
};

export default Home;
