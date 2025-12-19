import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    { name: "Alice Johnson", feedback: "Loanify made getting a loan so easy and stress-free!", rating: 5 },
    { name: "Mark Wilson", feedback: "Great customer service and very transparent process.", rating: 4 },
  ];

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-base-content">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="p-6 bg-base-200 rounded-xl shadow-lg relative transition-colors duration-300"
          >
            <FaQuoteLeft className="absolute top-4 left-4 text-base-content/30 text-2xl" />
            <p className="text-base-content mb-4">"{review.feedback}"</p>
            <div className="flex items-center">
              {Array(review.rating)
                .fill(0)
                .map((_, i) => (
                  <FaStar key={i} className="text-accent mr-1" />
                ))}
              <span className="ml-2 text-base-content/70">- {review.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
