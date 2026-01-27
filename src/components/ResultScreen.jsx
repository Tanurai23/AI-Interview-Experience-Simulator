import useInterviewStore from "../store/interviewStore";
import CircularScoreGauge from "./CircularScoreGauge";
import { useEffect } from "react";

const MAX_SCORE_PER_QUESTION = 10;

const ResultScreen = ({ onAnalytics }) => {
  const { lastResults, finishInterview } = useInterviewStore();

  useEffect(() => {
    finishInterview(); // 🔥 FINALIZE SESSION
  }, [finishInterview]);

  if (!lastResults.length) {
    return (
      <p className="text-center mt-10 text-slate-400">
        No results found. Please complete an interview.
      </p>
    );
  }

  const totalScore = Math.round(
    (lastResults.reduce((sum, r) => sum + r.score, 0) /
      (lastResults.length * MAX_SCORE_PER_QUESTION)) *
      100
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Interview Feedback
        </h2>

        <button
          onClick={onAnalytics}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          View Overall Analytics
        </button>
      </div>

      <div className="flex justify-center">
        <CircularScoreGauge score={totalScore} />
      </div>
    </div>
  );
};

export default ResultScreen;
