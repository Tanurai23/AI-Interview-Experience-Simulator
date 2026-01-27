import { PlayCircle, BarChart2 } from "lucide-react";

const Home = ({ onStartInterview, onAnalytics }) => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-12 min-h-[80vh]">
      
      {/* LEFT SIDE: BRAIN IMAGE CONTAINER */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-md aspect-square rounded-[2.5rem] overflow-hidden border-4 border-slate-800 shadow-2xl shadow-blue-500/20 group">
          <img 
            src="https://i.pinimg.com/1200x/74/cf/79/74cf79066fe236b47c5964ccb3b7c84c.jpg" 
            alt="AI Brain Visualization"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* RIGHT SIDE: CONTENT */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-extrabold text-white leading-tight tracking-tight">
            GoodSpace <span className="text-blue-500">AI</span>
          </h1>
          <p className="text-2xl text-slate-300 font-semibold tracking-wide">
            AI Interview Experience Simulator
          </p>
        </div>

        {/* EQUAL SIZE BUTTONS CONTAINER */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 justify-center md:justify-start">
          {/* PRIMARY BUTTON */}
          <button
            onClick={onStartInterview}
            className="group flex items-center justify-center gap-3 w-full sm:w-48 h-14 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all text-lg"
          >
            <PlayCircle className="w-5 h-5 fill-white/20" />
            Start
          </button>

          {/* SECONDARY BUTTON */}
          <button
            onClick={onAnalytics}
            className="flex items-center justify-center gap-3 w-full sm:w-48 h-14 rounded-2xl border-2 border-slate-700 text-slate-200 bg-slate-800/40 backdrop-blur-md hover:bg-slate-700/60 transition-all text-lg font-semibold"
          >
            <BarChart2 className="w-5 h-5 text-blue-400" />
            Analytics
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;