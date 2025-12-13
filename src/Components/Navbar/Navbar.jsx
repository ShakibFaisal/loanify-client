import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { IoIosHome } from "react-icons/io";
import { FaMoon, FaSun } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";

const Navbar = ({ darkMode, toggleTheme }) => {
  const { user, signout } = useContext(AuthContext);

  return (
    <div className={`navbar px-4 md:px-8 flex items-center justify-between h-[80px] shadow-sm ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      
      {/* Logo */}
      <Link className="flex items-center">
        <img className="w-[100px] md:w-[200px] h-[150px] object-contain" src={logo} alt="Logo" />
      </Link>

      {/* Nav items */}
      <div className="hidden lg:flex items-center gap-6">
        <NavLink className="mx-3 font-bold cursor-pointer" to="/">Home</NavLink>
        <NavLink className="mx-3 font-bold cursor-pointer" to="/available">All-Loans</NavLink>
        <NavLink className="mx-3 font-bold cursor-pointer" to="/about">About Us</NavLink>
        <NavLink className="mx-3 font-bold cursor-pointer" to="/contact">Contact</NavLink>

        {!user ? (
          <>
            <Link to="/login" className="btn bg-gradient-to-r from-[#16578D] to-[#6da2cd] text-white rounded-2xl px-6 py-2">Login</Link>
            <Link to="/register" className="btn hidden md:block bg-gradient-to-r from-[#16578D] to-[#6da2cd] text-white rounded-2xl px-6 py-2">Register</Link>
          </>
        ) : (
          <>
            <NavLink className="font-bold cursor-pointer" to="/dashboard">Dashboard</NavLink>
            <img src={user.photoURL || "https://via.placeholder.com/40"} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-gray-300" />
            <button onClick={signout} className="btn bg-red-500 text-white rounded-2xl px-4 py-1">Logout</button>
          </>
        )}

        {/* Theme toggle */}
        <button onClick={toggleTheme} className="ml-4">
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
