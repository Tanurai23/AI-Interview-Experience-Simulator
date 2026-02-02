import { motion } from "framer-motion";

function Home({ onStartInterview, onAnalytics }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          w-full max-w-2xl
          bg-white/90 dark:bg-slate-800/60
          backdrop-blur-md
          border border-gray-300 dark:border-slate-700
          rounded-2xl sm:rounded-3xl
          shadow-2xl
          p-5 sm:p-8
          text-gray-900 dark:text-slate-200
          transition-colors duration-500
        "
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 mb-5 sm:mb-6">
          {/* AI Brain Image */}
          <div className="shrink-0">
            <img
             
             src="/Home.png"
              alt="AI Brain"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl shadow-lg object-cover"
            />
          </div>

          {/* Title & Actions */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Intervu<span className="text-blue-600 dark:text-blue-400">AI</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 sm:mt-2">
              AI Interview Experience Simulator
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-5 w-full sm:w-auto">
              <button
                onClick={onStartInterview}
                className="
                  bg-blue-600 hover:bg-blue-500
                  text-white
                  px-6 sm:px-8 py-2.5 sm:py-3
                  rounded-xl
                  shadow-lg shadow-blue-600/30
                  hover:scale-105 hover:shadow-xl
                  active:scale-95
                  transition-all duration-300
                  text-sm sm:text-base font-medium
                  w-full sm:w-auto
                "
              >
                Start Interview
              </button>
              <button
                onClick={onAnalytics}
                className="
                  bg-gray-300 hover:bg-gray-200
                  dark:bg-gray-700 dark:hover:bg-gray-600
                  text-gray-800 dark:text-gray-200
                  px-6 sm:px-8 py-2.5 sm:py-3
                  rounded-xl
                  shadow-md
                  hover:scale-105
                  active:scale-95
                  transition-all duration-300
                  text-sm sm:text-base font-medium
                  w-full sm:w-auto
                "
              >
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Features/Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-xl border border-blue-200 dark:border-blue-800 transition-colors duration-500">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">5+</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Questions</div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-3 sm:p-4 rounded-xl border border-green-200 dark:border-green-800 transition-colors duration-500">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">120s</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Per Question</div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 sm:p-4 rounded-xl border border-purple-200 dark:border-purple-800 col-span-2 sm:col-span-1 transition-colors duration-500">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">AI</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Powered</div>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-3">
            What You'll Experience
          </h3>
          
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Real-time AI evaluation of your answers
            </p>
          </div>

          <div className="flex items-start gap-2 sm:gap-3">
            <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Timed questions to simulate real interview pressure
            </p>
          </div>

          <div className="flex items-start gap-2 sm:gap-3">
            <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Detailed feedback and performance insights
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;