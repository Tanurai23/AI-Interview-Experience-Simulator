import { Moon, Sun } from "lucide-react";
import useThemeStore from "../store/themeStore";

const Header = () => {
  const { dark, toggleTheme } = useThemeStore();

  return (
    <header className="flex justify-between items-center px-6 py-4">
      <h1 className="font-bold text-xl">IntervuAI</h1>

    {/* RIGHT SIDE */}
  <div className="flex items-center gap-4">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {dark ? <Sun /> : <Moon />}
      </button>
      </div>
    </header>
  );
};

export default Header;
