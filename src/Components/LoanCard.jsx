import React from "react";
import { Link } from "react-router";

const LoanCard = ({ loan }) => {
  const { loanImage, loanTitle, description, maxLimit, _id } = loan;

  return (
    <div className="bg-base-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
      {/* Image */}
      <img
        src={loanImage}
        alt={loanTitle}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold text-accent">{loanTitle}</h2>

        <p className="text-base-content text-sm line-clamp-2">{description}</p>

        <p className="text-sm font-medium text-base-content">
          Max Loan Limit:{" "}
          <span className="text-blue-600 font-semibold">
            ৳{maxLimit.toLocaleString()}
          </span>
        </p>

        {/* Button */}
        <Link
          to={`/loans/${_id}`}
          className="block w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default LoanCard;
