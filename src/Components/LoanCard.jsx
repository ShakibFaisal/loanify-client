import React from "react";

const LoanCard = ({ loan }) => {
  const {
    loanImage,
    loanTitle,
    description,
    maxLimit,
  } = loan;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      
      {/* Image */}
      <img
        src={loanImage}
        alt={loanTitle}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">
          {loanTitle}
        </h2>

        <p className="text-gray-600 text-sm line-clamp-2">
          {description}
        </p>

        <p className="text-sm font-medium text-gray-700">
          Max Loan Limit:{" "}
          <span className="text-blue-600 font-semibold">
            ৳{maxLimit.toLocaleString()}
          </span>
        </p>

        {/* Button */}
        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default LoanCard;
