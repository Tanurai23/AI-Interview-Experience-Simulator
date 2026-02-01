function InterviewIntro({ config, onStart }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Glass Card */}
      <div
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
        <div className="mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to the AI Interview Simulator!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Get ready to start your interview and experience AI-driven feedback.
          </p>
        </div>

        {/* META INFO */}
        <div
          className="
            grid grid-cols-2 gap-3 sm:gap-4
            bg-gray-100/50 dark:bg-slate-900/40
            border border-gray-300 dark:border-slate-700
            rounded-xl
            p-3 sm:p-4
            mb-5 sm:mb-6
            text-sm
            transition-colors duration-500
          "
        >
          <div className="text-center sm:text-left">
            <p className="text-gray-500 dark:text-slate-400 text-xs sm:text-sm">Questions</p>
            <p className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
              {config.totalQuestions}
            </p>
          </div>

          <div className="text-center sm:text-left">
            <p className="text-gray-500 dark:text-slate-400 text-xs sm:text-sm">Time / Question</p>
            <p className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
              120s
            </p>
          </div>
        </div>

        {/* INSTRUCTIONS */}
        <div className="mb-5 sm:mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
            Instructions
          </h3>

          <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
            {config.instructions.map((item, index) => (
              <li key={index} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>

        {/* ACTION */}
        <button
          onClick={onStart}
          className="
            w-full sm:w-auto
            bg-blue-600 hover:bg-blue-500
            text-white
            px-6 sm:px-8 py-2.5 sm:py-3
            rounded-xl
            shadow-lg shadow-blue-600/30
            hover:scale-105 hover:shadow-xl
            active:scale-95
            transition-all duration-300
            text-sm sm:text-base font-medium
          "
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}

export default InterviewIntro;