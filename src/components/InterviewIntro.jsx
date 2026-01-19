function InterviewIntro({ config, onStart }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">
        
        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {config.role} Interview
        </h2>

        <p className="text-gray-600 mb-6">
          Get ready for a timed, AI-powered interview experience.
        </p>

        {/* META INFO */}
        <div className="flex justify-between bg-gray-50 rounded-lg p-4 mb-6 text-sm">
          <div>
            <p className="text-gray-500">Questions</p>
            <p className="font-semibold">{config.totalQuestions}</p>
          </div>
          <div>
            <p className="text-gray-500">Time / Question</p>
            <p className="font-semibold">
              {config.timePerQuestion}s
            </p>
          </div>
        </div>

        {/* INSTRUCTIONS */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            Instructions
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {config.instructions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* ACTION */}
        <button
          onClick={onStart}
          className="
bg-gradient-to-r from-blue-500 to-indigo-600
text-white px-6 py-3 rounded-xl
shadow-lg shadow-blue-500/30
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

