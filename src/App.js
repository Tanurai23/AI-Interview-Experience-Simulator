import { useState } from "react";
import Home from "./pages/Home";
import InterviewIntro from "./components/InterviewIntro";
import InterviewScreen from "./components/InterviewScreen";
import ResultScreen from "./components/ResultScreen";
import HistoryScreen from "./components/HistoryScreen";
import AnalyticsScreen from "./components/AnalyticsScreen";
import Header from "./components/Header";
import interviewConfig from "./data/interviewConfig";
import questions from "./data/questions";
import { motion, AnimatePresence } from "framer-motion";


function App() {
  const [screen, setScreen] = useState("landing");

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
  return (
    <AnalyticsScreen onBack={() => setScreen("landing")} />
  );


      default:
        return <div>Screen not found</div>;
    }
  };

return (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    
    {/* HEADER */}
    <Header
      currentScreen={screen}
      onHome={() => setScreen("landing")}
    />

      <main className="flex justify-center px-4 py-12">
  <AnimatePresence mode="wait">
    <motion.div
      key={screen}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full flex justify-center"
    >
      {renderContent()}
    </motion.div>
  </AnimatePresence>
</main>


      {screen !== "landing" && screen !== "interview" && (
        <footer className="text-center pb-6">
          <button
            onClick={() => setScreen("history")}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            View History
          </button>
        </footer>
      )}
      
    </div>
    
  );
}

export default App;
