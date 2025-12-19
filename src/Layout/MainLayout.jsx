import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    const root = document.getElementById("root");
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="bg-base-100 text-base-content">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      </header>

      {/* Page content */}
      <main className="max-w-11/12 mx-auto py-6">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
      <Toaster></Toaster>
    </div>
  );
};

export default MainLayout;
