'use client'

import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("carelight");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "carelight";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "carelight" ? "caredark" : "carelight";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-primary">
      {theme === "carelight" ? <FaMoon /> : <IoSunnySharp />}
    </button>
  );
};

export default ThemeToggle;