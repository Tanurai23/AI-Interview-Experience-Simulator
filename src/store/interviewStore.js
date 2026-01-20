import { create } from "zustand";

/* ---------------- LOAD SAVED SESSIONS ---------------- */
const savedSessions =
  JSON.parse(localStorage.getItem("interviewSessions")) || [];

const useInterviewStore = create((set, get) => ({
  /* ================= CORE INTERVIEW STATE ================= */
  currentIndex: 0,
  answers: {},

  saveAnswer: (index, answer) =>
    set((state) => ({
      answers: { ...state.answers, [index]: answer },
    })),

  nextQuestion: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),

  resetInterview: () =>
    set({
      currentIndex: 0,
      answers: {},
      results: [],
    }),

  /* ================= AI RESULTS ================= */
  results: [],
  lastResults: [], // ✅ NEW (for Results screen)

  addResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
    })),

  clearResults: () => set({ results: [] }),

  /* ================= SESSION HISTORY ================= */
  sessions: savedSessions,

  finishInterview: () => {
    const { results, sessions } = get();

    if (!results || results.length === 0) return;

    const avgScore =
      results.reduce((sum, r) => sum + (r.score || 0), 0) /
      results.length;

    const newSession = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      totalQuestions: results.length,
      averageScore: Number(avgScore.toFixed(1)),
    };

    const updatedSessions = [...sessions, newSession];

    localStorage.setItem(
      "interviewSessions",
      JSON.stringify(updatedSessions)
    );

    set({
      sessions: updatedSessions,
      lastResults: results, // ✅ SAVE BEFORE CLEARING
      currentIndex: 0,
      answers: {},
      results: [], // reset safely
    });
  },
}));

export default useInterviewStore;
