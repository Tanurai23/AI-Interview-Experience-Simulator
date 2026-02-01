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

function App() {
  const [screen, setScreen] = useState("landing");

  // ✅ Properly consume theme state
  const { isDark } = useThemeStore();

  // ✅ Sync theme with <html> and localStorage - NO FLICKER
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
            onFinish={() => setScreen("complete")}
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
        return <HistoryScreen />;

      case "analytics":
        return <AnalyticsScreen onBack={() => setScreen("landing")} />;

      default:
        return <div className="text-center">Screen not found</div>;
    }
  };

  return (
    <div className={`${isDark ? "dark" : ""} min-h-screen h-screen overflow-hidden bg-white dark:bg-[#0f172a] transition-colors duration-500`}>
      {/* HEADER - Fixed */}
      <Header
        currentScreen={screen}
        onHome={() => setScreen("landing")}
      />

      {/* MAIN CONTENT - Fixed height, no scroll */}
      <main className="h-[calc(100vh-80px)] overflow-y-auto flex justify-center px-4 py-6 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="
              w-full max-w-5xl h-fit
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

      {/* FOOTER ACTION - Fixed at bottom when visible */}
      {screen !== "landing" && screen !== "interview" && (
        <footer className="fixed bottom-0 left-0 right-0 text-center pb-6 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pt-8">
          <button
            onClick={() => setScreen("history")}
            className="
              bg-blue-600 hover:bg-blue-500
              text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl
              shadow-lg shadow-blue-500/30
              hover:scale-105 active:scale-95
              transition-all duration-300
              text-sm sm:text-base
            "
          >
            View History
          </button>
        </footer>
      )}
    </div>
  );
}

export default App;