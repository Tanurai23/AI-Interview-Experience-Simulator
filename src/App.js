import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import InterviewIntro from "./components/InterviewIntro";
import InterviewScreen from "./components/InterviewScreen";
import ResultScreen from "./components/ResultScreen";
import HistoryScreen from "./components/HistoryScreen";
import AnalyticsScreen from "./components/AnalyticsScreen";
import Header from "./components/Header";

import interviewConfig from "./data/interviewConfig";
import questions from "./data/questions";

import useThemeStore from "./store/themeStore";
import useInterviewStore from "./store/interviewStore";

function App() {
  const [screen, setScreen] = useState("landing");

  const { isDark } = useThemeStore();
  const { finishInterview } = useInterviewStore();

  // ✅ Sync theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // ✅ Handle interview completion
  const handleInterviewFinish = (answers) => {
    console.log("📊 Interview finished with answers:", answers);
    
    // Save to store FIRST
    finishInterview(answers);
    
    // Then navigate
    setTimeout(() => {
      setScreen("complete");
    }, 100);
  };

  const renderContent = () => {
    switch (screen) {
      case "landing":
        return (
          <Home
            onStartInterview={() => setScreen("intro")}
            onAnalytics={() => setScreen("analytics")}
          />
        );

      case "intro":
        return (
          <InterviewIntro
            config={interviewConfig}
            onStart={() => setScreen("interview")}
          />
        );

      case "interview":
        return (
          <InterviewScreen
            questions={questions}
            onFinish={handleInterviewFinish}
          />
        );

      case "complete":
        return (
          <ResultScreen
            onRestart={() => setScreen("landing")}
            onAnalytics={() => setScreen("analytics")}
          />
        );

      case "history":
        return <HistoryScreen onBack={() => setScreen("landing")} />;

      case "analytics":
        return <AnalyticsScreen onBack={() => setScreen("landing")} />;

      default:
        return <div className="text-center text-gray-900 dark:text-white">Screen not found</div>;
    }
  };

  return (
    <div className={`${isDark ? "dark" : ""} fixed inset-0 overflow-hidden bg-white dark:bg-[#0f172a] transition-colors duration-500`}>
      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header currentScreen={screen} onHome={() => setScreen("landing")} />
      </div>

      {/* MAIN CONTENT */}
      <main className="absolute top-[80px] bottom-0 left-0 right-0 overflow-hidden flex justify-center px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="
              w-full max-w-5xl h-full overflow-y-auto
              bg-white/80 dark:bg-slate-800/50
              backdrop-blur-xl
              border border-slate-200 dark:border-slate-700
              rounded-3xl
              shadow-xl
              p-4 sm:p-6 md:p-10
              transition-colors duration-500
            "
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER - Only for history */}
      {screen === "history" && (
        <div className="fixed bottom-0 left-0 right-0 z-10 text-center pb-8 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pt-8">
          <button
            onClick={() => setScreen("landing")}
            className="
              bg-blue-600 hover:bg-blue-500
              text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl
              shadow-lg shadow-blue-500/30
              hover:scale-105 active:scale-95
              transition-all duration-300
              text-sm sm:text-base
            "
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default App;