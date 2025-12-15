import React from "react";
import { motion } from "framer-motion";
import loaderImage from "../../assets/logo.png"; 

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center">
      
      {/* Logo or Image */}
      <motion.img
        src={loaderImage}
        alt="Loading"
        className="w-32 h-32 mb-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />

      {/* Animated Dots */}
      <div className="flex space-x-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-white rounded-full"
            animate={{ y: [0, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Loading Text */}
      <motion.p
        className="mt-6 text-white text-lg font-semibold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        Loading, please wait...
      </motion.p>
    </div>
  );
};

export default Loader;
