import React, { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Rahim Ahmed",
    role: "Small Business Owner",
    feedback:
      "The loan process was super easy and fast. I got approval within a day!",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Nusrat Jahan",
    role: "Farmer",
    feedback:
      "Agricultural loan helped me expand my farming project. Highly recommended!",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Tanvir Hasan",
    role: "Freelancer",
    feedback:
      "Transparent terms and great customer support. Very satisfied.",
    image: "https://i.pravatar.cc/150?img=8",
  },
];

const CustomerFeedback = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-11/12 mx-auto text-center">

        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Customer Feedback
        </h2>
        <p className="text-gray-600 mt-3">
          What our customers say about us
        </p>

        {/* Carousel */}
        <div className="relative mt-12 max-w-3xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md transition-all duration-500">
            <img
              src={testimonials[current].image}
              alt={testimonials[current].name}
              className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500"
            />

            <p className="text-gray-700 mt-6 italic">
              “{testimonials[current].feedback}”
            </p>

            <h4 className="mt-4 text-lg font-semibold text-gray-800">
              {testimonials[current].name}
            </h4>

            <span className="text-sm text-gray-500">
              {testimonials[current].role}
            </span>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === current
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
