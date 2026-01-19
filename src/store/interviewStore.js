import { create } from "zustand";

const savedAttempts =
  JSON.parse(localStorage.getItem("interviewAttempts")) || [];

const useInterviewStore = create((set) => ({
  // ---------------- CORE INTERVIEW STATE ----------------
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
      evaluations: {},
    }),

  // ---------------- ATTEMPTS / HISTORY ----------------
  attempts: savedAttempts,

  saveAttempt: (score) =>
    set((state) => {
      const updated = [
        ...state.attempts,
        { score, date: new Date().toISOString() },
      ];
      localStorage.setItem("interviewAttempts", JSON.stringify(updated));
      return { attempts: updated };
    }),

  // ---------------- RESULTS ----------------
  results: [],

  addResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
    })),

  clearResults: () => set({ results: [] }),

  // ---------------- SESSION ANALYTICS ----------------
  sessionHistory: [],

  saveSession: (score) =>
    set((state) => ({
      sessionHistory: [
        ...state.sessionHistory,
        {
          session: state.sessionHistory.length + 1,
          score,
          date: new Date().toLocaleDateString(),
        },
      ],
    })),

  // ---------------- AI EVALUATION ----------------
  evaluations: {},

  saveEvaluation: (index, evaluation) =>
    set((state) => ({
      evaluations: {
        ...state.evaluations,
        [index]: evaluation,
      },
    })),
}));

export default useInterviewStore;
