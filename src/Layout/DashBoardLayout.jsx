import React, { useContext } from "react";
import {
  FaCheckCircle,
  FaEdit,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaPlusCircle,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import { FaClockRotateLeft } from "react-icons/fa6";
import UseRole from "../Hooks/UseRole";

import { AuthContext } from "../Provider/AuthContext";

const DashBoardLayout = () => {
  const { role } = UseRole();
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full  bg-black text-white">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="w-full flex justify-between items-center ">
            <div className="px-4 flex items-center gap-3.5">
              <span className="text-2xl font-bold">Loanify Dashboard </span>{" "}
            </div>
            <div className="">
              <img
                src={user.photoURL}
                className="w-[50px] h-[50px] rounded-4xl border-2"
                alt=""
              />
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible ">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex  min-h-full flex-col items-start bg-black text-white is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}

                <Link
                  to={"/"}
                  data-tip="Home"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden">Home</span>
                </Link>
              </button>
            </li>
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="MyLoans"
                to="/dashboard/my-loans"
              >
                <FaMoneyBillWave />
                <span className="is-drawer-close:hidden">My Loans</span>
              </Link>
            </li>
            {role === "admin" && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Users"
                  to="/dashboard/user-management"
                >
                  <FaUser />
                  <span className="is-drawer-close:hidden">
                    User Management
                  </span>
                </Link>
              </li>
            )}

            {role === "admin" && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Loans"
                  to="/dashboard/all-loans"
                >
                  <FaWallet />
                  <span className="is-drawer-close:hidden">All Loans</span>
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Loan Applications"
                  to="/dashboard/loan-applications"
                >
                  <FaFileInvoiceDollar className="text-green-600" />

                  <span className="is-drawer-close:hidden">
                    Loan Applications
                  </span>
                </Link>
              </li>
            )}

            {role === "manager" && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add Loan"
                  to="/dashboard/add-loan"
                >
                  <FaPlusCircle className="text-red-600" />
                  <span className="is-drawer-close:hidden">Add Loan</span>
                </Link>
              </li>
            )}
            {role === "manager" && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage Loans"
                  to="/dashboard/manage-loans"
                >
                  <FaEdit />
                  <span className="is-drawer-close:hidden">Manage Loans</span>
                </Link>
              </li>
            )}
            {role === "manager" && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Pending Loans"
                  to="/dashboard/pending-loans"
                >
                  <FaClockRotateLeft />
                  <span className="is-drawer-close:hidden">Pending-Loans</span>
                </Link>
              </li>
            )}
            {role === "manager" && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Approved Loans"
                  to="/dashboard/approved-loans"
                >
                  <FaCheckCircle />
                  <span className="is-drawer-close:hidden">Approved-Loans</span>
                </Link>
              </li>
            )}
            {role === "manager" && (
              <li>
                <Link
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                  to="/dashboard/profile"
                >
                  <FaUser />
                  <span className="is-drawer-close:hidden">Profile</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
