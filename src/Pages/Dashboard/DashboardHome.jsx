import React from "react";
import { motion } from "framer-motion";

const DashboardHome = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-lg w-full"
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your loans, track progress, and stay updated from here.
        </p>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
