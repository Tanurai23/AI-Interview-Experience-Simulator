import { create } from "zustand";

/* ---------------- LOAD SAVED SESSIONS ---------------- */
const savedSessions =
  JSON.parse(localStorage.getItem("interviewSessions")) || [];

const MAX_SCORE_PER_QUESTION = 10;

const useInterviewStore = create((set, get) => ({
  /* ================= INTERVIEW FLOW ================= */
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
      lastResults: [],
    }),

  /* ================= AI RESULTS ================= */
  results: [],
  lastResults: [],

  addResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
    })),

  /* ================= SESSION HISTORY ================= */
  sessions: savedSessions,

  finishInterview: () => {
    const { results, sessions } = get();

    if (!results.length) return;

    const totalScore = results.reduce(
      (sum, r) => sum + (r.score || 0),
      0
    );

    const averageScore = Math.round(
      (totalScore / (results.length * MAX_SCORE_PER_QUESTION)) * 100
    );

    const newSession = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      totalQuestions: results.length,
      averageScore,
      results,
    };

    const updatedSessions = [newSession, ...sessions];

    localStorage.setItem(
      "interviewSessions",
      JSON.stringify(updatedSessions)
    );

    set({
      sessions: updatedSessions,
      lastResults: results,
      results: [],
      currentIndex: 0,
      answers: {},
    });
  },

  clearSessions: () => {
    localStorage.removeItem("interviewSessions");
    set({ sessions: [] });
  },
}));

export default useInterviewStore;
