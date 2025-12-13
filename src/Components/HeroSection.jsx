import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import img1 from "../assets/pic1 (1).png";
import img2 from "../assets/pic2.png";
import img3 from "../assets/pic3.png";

// Hero slides
const slides = [
  {
    text: "Simplify Microloan Management with Loanify.",
    image: img1,
  },
  {
    text: "Empowering NGOs and Small Financial Organizations.",
    image: img2,
  },
  {
    text: "Fast, Transparent, and Reliable Loan Processing.",
    image: img3,
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto-change slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <div className="w-full h-[70vh] my-5 flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 h-full">
        {/* Text */}
        <motion.div
          key={current} 
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 mb-8 md:mb-0 flex items-center h-full"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            {slide.text}
          </h1>
        </motion.div>

        {/* Image */}
        <motion.div
          key={current + "-img"}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 h-full flex items-center justify-center"
        >
          <img
            src={slide.image}
            alt="Hero"
            className="w-full h-full object-contain rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
