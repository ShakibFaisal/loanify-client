import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { IoIosHome } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";

const Navbar = ({ darkMode, toggleTheme }) => {
  const { user, signout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = (
    <>
      <NavLink
        className="block px-3 py-2 font-bold hover:text-primary"
        to="/"
        onClick={() => setMenuOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        className="block px-3 py-2 font-bold hover:text-primary"
        to="/available"
        onClick={() => setMenuOpen(false)}
      >
        All-Loans
      </NavLink>
      <NavLink
        className="block px-3 py-2 font-bold hover:text-primary"
        to="/about"
        onClick={() => setMenuOpen(false)}
      >
        About Us
      </NavLink>
      <NavLink
        className="block px-3 py-2 font-bold hover:text-primary"
        to="/contact"
        onClick={() => setMenuOpen(false)}
      >
        Contact
      </NavLink>

      {!user ? (
        <>
          <Link
            to="/login"
            className="block px-3 py-2 mt-2 bg-gradient-to-r from-[#16578D] to-[#6da2cd] text-white rounded-2xl text-center"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block px-3 py-2 mt-2 bg-gradient-to-r from-[#16578D] to-[#6da2cd] text-white rounded-2xl text-center"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
        </>
      ) : (
        <>
          <NavLink
            to="/dashboard"
            className="block px-3 py-2 mt-2 font-bold hover:text-primary"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          <button
            onClick={() => { signout(); setMenuOpen(false); }}
            className="block px-3 py-2 mt-2 bg-red-500 text-white rounded-2xl w-full text-center"
          >
            Logout
          </button>
        </>
      )}

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="block mt-2 px-3 py-2 text-center"
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </>
  );

  return (
    <nav
      className={`shadow-sm px-4 md:px-8 flex items-center justify-between h-[80px] ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Logo */}
      <Link className="flex items-center">
        <img
          className="w-[100px] md:w-[200px] h-[150px] object-contain"
          src={logo}
          alt="Logo"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-6">{navItems}</div>

      {/* Mobile Hamburger */}
      <div className="lg:hidden flex items-center gap-2">
        <button onClick={toggleTheme} className="mr-2">
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 border rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`absolute top-[80px] left-0 w-full p-4 shadow-md z-50 ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } lg:hidden`}
        >
          {navItems}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
