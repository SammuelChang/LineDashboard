import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Analysis from "./pages/Analysis";
import Home from "./pages/Home";
import Process from "./pages/Process";
import ProcessUpload from "./pages/Process/upload";
import ProcessAnalysis from "./pages/Process/analysis";
import ProcessCheck from "./pages/Process/check";
import Header from "./components/Header";
import Maintain from "./pages/Maintain";

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

    window.addEventListener("scroll", reveal);
    window.addEventListener("load", reveal);
  }, []);

  function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 50;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  return (
    <div
      className={`App dark:bg-[#363636] ${
        !darkMode ? "theme-light" : "theme-dark"
      }`}
    >
      <Header toggleTheme={toggleTheme}></Header>
      <Routes>
        <Route index element={<Home />}></Route>
        {/* <Route path="process" element={<Process />}>
          <Route path="upload" element={<ProcessUpload />}></Route>
          <Route path="analysis" element={<ProcessAnalysis />}></Route>
          <Route path="check" element={<ProcessCheck />}></Route>
        </Route> */}
        <Route path="maintain" element={<Maintain />}></Route>
        <Route path="analysis" element={<Analysis />}></Route>
      </Routes>
    </div>
  );
}

export default App;
