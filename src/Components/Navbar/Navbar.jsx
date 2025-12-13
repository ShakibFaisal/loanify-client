import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { IoIosHome } from "react-icons/io";

const navItems = (
  <>
    <NavLink
      className="mx-3 flex items-center gap-1.5 font-bold cursor-pointer text-[16px] py-1"
      to="/"
    >
      <IoIosHome /> Home
    </NavLink>
    <NavLink
      className="mx-3 font-bold cursor-pointer text-[16px] py-1"
      to="/available"
    >
      All-Loans
    </NavLink>
    <NavLink
      className="mx-3 font-bold cursor-pointer text-[16px] py-1"
      to="/available"
    >
      About Us
    </NavLink>
    <NavLink
      className="mx-3 font-bold cursor-pointer text-[16px] py-1"
      to="/available"
    >
      Contact
    </NavLink>
  </>
);

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 h-[80px] shadow-sm px-4 md:px-8 flex items-center justify-between">
      {/* Navbar start */}
      <div className="flex items-center gap-4">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-0 w-52 p-2 shadow">
            {navItems}
          </ul>
        </div>

        <Link className="flex items-center">
          <img
            className="w-[100px] md:w-[200px] h-[150px] object-contain"
            src={logo}
            alt="Logo"
          />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* Navbar end */}
      <div className="flex items-center gap-2">
        <Link to={"/login"} className="btn bg-gradient-to-r from-[#16578D] to-[#6da2cd] text-white rounded-2xl px-6 py-2">
          Login
        </Link>
        <Link to={"/register"} className="btn hidden md:block bg-gradient-to-r from-[#16578D] to-[#6da2cd] text-white rounded-2xl px-6 py-2">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
