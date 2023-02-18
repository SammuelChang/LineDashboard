import { useEffect, useState } from "react";
import { StyledDropzone } from "./components/DropZone";
import { Step } from "./components/Step";
import Analysis from "./pages/Analysis";

const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const root = window.document.documentElement;
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    root.classList.toggle("dark");
  };

  useEffect(() => {
    if (isDarkMode()) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  return (
    <div
      className={`App dark:bg-[#363636] ${
        !darkMode ? "theme-light" : "theme-dark"
      }`}
    >
      <button
        className="px-4 py-2 rounded-full bg-black dark:bg-white border-gray-400 border-2"
        onClick={toggleTheme}
      ></button>
      <Step phase={1} />
      <StyledDropzone />
      <Analysis />
    </div>
  );
}

export default App;
