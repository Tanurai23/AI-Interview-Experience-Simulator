import { create } from "zustand";

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme === "light" ? false : true;
};

const useThemeStore = create((set) => ({
  isDark: getInitialTheme(),

  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDark;

      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return { isDark: newTheme };
    }),
}));

export default useThemeStore;
