import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../Provider/AuthContext";

const Navbar = () => {
  const { user, signout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const navItems = (
    <>
      <NavLink to="/" className="font-semibold hover:text-primary">
        Home
      </NavLink>

      <NavLink to="/available" className="font-semibold hover:text-primary">
        All Loans
      </NavLink>

      <NavLink to="/about" className="font-semibold hover:text-primary">
        About Us
      </NavLink>

      <NavLink to="/contact" className="font-semibold hover:text-primary">
        Contact
      </NavLink>

      {!user ? (
        <>
          <Link to="/login" className="btn btn-primary btn-sm rounded-2xl">
            Login
          </Link>
          <Link to="/register" className="btn btn-secondary btn-sm rounded-2xl">
            Register
          </Link>
        </>
      ) : (
        <>
          <NavLink to="/dashboard" className="font-semibold hover:text-primary">
            Dashboard
          </NavLink>
          <button onClick={signout} className="btn btn-error btn-sm rounded-2xl">
            Logout
          </button>
        </>
      )}

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="btn btn-ghost btn-circle"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>
    </>
  );

  return (
    <nav className="navbar bg-base-100/50 backdrop-blur-2xl text-base-content shadow px-4 md:px-8 h-[80px]">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-[120px] md:w-[180px] object-contain"
          />
        </Link>
      </div>

      {/* Right: Desktop Menu */}
      <div className="hidden lg:flex items-center gap-6">
        {navItems}
      </div>

      {/* Mobile Right */}
      <div className="lg:hidden flex items-center gap-2">
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
          {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-ghost btn-circle"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[80px] right-0 w-full bg-base-100 text-base-content shadow-md p-4 flex flex-col gap-4 lg:hidden z-50">
          {navItems}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
