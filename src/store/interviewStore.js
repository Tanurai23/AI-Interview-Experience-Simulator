import { create } from "zustand";

const savedSessions = JSON.parse(localStorage.getItem("interviewSessions")) || [];
const MAX_SCORE_PER_QUESTION = 10;

const useInterviewStore = create((set, get) => ({
  /* ================= STATE ================= */
  results: [],
  lastResults: [],
  sessions: savedSessions,

  /* ================= SAVE RESULT ================= */
  addResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
    })),

  /* ================= FINISH INTERVIEW ================= */
  finishInterview: (answers) => {
    // Use passed answers instead of store results
    const resultsToSave = answers || get().results;

    if (!resultsToSave || resultsToSave.length === 0) {
      console.error("⚠️ No results to save!");
      return;
    }

    const totalScore = resultsToSave.reduce((sum, r) => sum + (r.score || 0), 0);
    const averageScore = Math.round(
      (totalScore / (resultsToSave.length * MAX_SCORE_PER_QUESTION)) * 100
    );

    const newSession = {
      id: Date.now(),
      date: new Date().toLocaleString(), // ✅ FIXED: Added date field
      startedAt: new Date().toISOString(),
      endedAt: new Date().toISOString(),
      totalQuestions: resultsToSave.length,
      averageScore,
      results: resultsToSave,
    };

    const updatedSessions = [newSession, ...get().sessions];

    localStorage.setItem("interviewSessions", JSON.stringify(updatedSessions));

    set({
      sessions: updatedSessions,
      lastResults: resultsToSave, // ✅ Set BEFORE navigation
      results: [],
    });

    console.log("✅ Session saved:", newSession);
  },

  /* ================= RESET ================= */
  resetInterview: () =>
    set({
      results: [],
      lastResults: [],
    }),

  /* ================= CLEAR ALL ================= */
  clearSessions: () => {
    localStorage.removeItem("interviewSessions");
    set({ sessions: [], lastResults: [], results: [] });
  },
}));

export default useInterviewStore;