import React from "react";
import { MdBlock } from "react-icons/md";
import { Link } from "react-router";


const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md">
        <MdBlock className="text-red-500 text-7xl mb-6 mx-auto" />
        <h1 className="text-4xl font-bold mb-4">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          Oops! You don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
