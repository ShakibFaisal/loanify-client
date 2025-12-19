import React, { useState, useMemo } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoanCard from "../../Components/LoanCard";
import Loader from "../../Components/Loader/Loader"

const AvailableLoan = () => {
  const axiosSecure = UseAxiosSecure();
  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axiosSecure.get(`loans`);
      return res.data;
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  // Filter loans based on search term
  const filteredLoans = useMemo(() => {
    return loans.filter((loan) =>
      loan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [loans, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredLoans.length / cardsPerPage);
  const currentLoans = filteredLoans.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on search
  };
  if(isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Centered Search */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center mb-8 gap-2"
      >
        <input
          type="text"
          placeholder="Search loans..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-base-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
        <button
          type="submit"
          className="bg-primary text-base-100 px-4 rounded-r-lg hover:bg-primary/90 transition"
        >
          Search
        </button>
      </form>

      {/* Loan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {currentLoans.length > 0 ? (
          currentLoans.map((loan) => (
            <LoanCard key={loan._id} loan={loan} />
          ))
        ) : (
          <p className="text-center col-span-full text-base-content">
            No loans found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded-md border transition ${
                currentPage === idx + 1
                  ? "bg-primary text-base-100 border-primary"
                  : "bg-base-200 text-base-content border-base-300 hover:bg-primary hover:text-base-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableLoan;
