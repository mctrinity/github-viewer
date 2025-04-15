"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", dark);
    setIsDark(dark);
  }, []);

  const toggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <button
      onClick={toggle}
      className="absolute top-4 right-4 p-2 rounded-full border bg-background shadow-md hover:scale-105 transition"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
