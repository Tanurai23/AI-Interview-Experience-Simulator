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
  useThemeStore(); // ensures store initializes


  // ✅ Persist dark mode on refresh
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

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
        return <div>Screen not found</div>;
    }
  };

  return (
    <div
      className="
        min-h-screen flex flex-col
        bg-gradient-to-br
        from-gray-50 to-gray-100
        dark:from-zinc-900 dark:to-black
        transition-colors duration-300
      "
    >
      {/* HEADER */}
      <Header
        currentScreen={screen}
        onHome={() => setScreen("landing")}
      />

      {/* MAIN CONTENT */}
      <main className="flex justify-center px-4 py-12 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="
              w-full max-w-5xl
              bg-white/70 dark:bg-zinc-900/70
              backdrop-blur-xl
              border border-white/20 dark:border-white/10
              rounded-3xl
              shadow-2xl
              p-6 md:p-10
            "
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER ACTION */}
      {screen !== "landing" && screen !== "interview" && (
        <footer className="text-center pb-8">
          <button
            onClick={() => setScreen("history")}
            className="
              bg-gradient-to-r from-blue-500 to-indigo-600
              text-white px-6 py-3 rounded-xl
              shadow-lg shadow-blue-500/30
              hover:scale-105 hover:shadow-xl
              active:scale-95
              transition-all duration-300
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
