function InterviewIntro({ config, onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0f172a]">
      {/* Glass Card */}
      <div
        className="
          max-w-xl w-full
          bg-slate-800/50
          backdrop-blur-md
          border border-slate-700
          rounded-3xl
          shadow-2xl
          p-8
          text-slate-200
        "
      >
        {/* HEADER */}
        <h2 className="text-2xl font-bold text-white mb-2">
          {config.role} Interview
        </h2>

        <p className="text-slate-400 mb-6">
          Get ready for a timed, AI-powered interview experience.
        </p>

        {/* META INFO */}
        <div
          className="
            flex justify-between
            bg-slate-900/40
            border border-slate-700
            rounded-xl
            p-4
            mb-6
            text-sm
          "
        >
          <div>
            <p className="text-slate-400">Questions</p>
            <p className="font-semibold text-white">
              {config.totalQuestions}
            </p>
          </div>

          <div>
            <p className="text-slate-400">Time / Question</p>
            <p className="font-semibold text-white">
              {config.timePerQuestion}s
            </p>
          </div>
        </div>

        {/* INSTRUCTIONS */}
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-2">
            Instructions
          </h3>

          <ul className="list-disc list-inside space-y-2 text-slate-300">
            {config.instructions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* ACTION */}
        <button
          onClick={onStart}
          className="
            bg-blue-600 hover:bg-blue-500
            text-white
            px-6 py-3
            rounded-xl
            shadow-lg shadow-blue-600/30
            hover:scale-105 hover:shadow-xl
            active:scale-95
            transition-all duration-300
          "
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}

export default InterviewIntro;
