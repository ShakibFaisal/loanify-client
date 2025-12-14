import React, { useContext, useEffect, useState } from "react";

import { FaMoneyBillWave } from "react-icons/fa";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Provider/AuthContext";

const MyLoans = () => {
  const { user } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const  axiosSecure = UseAxiosSecure()

  useEffect(() => {
    if (!user?.email) return;

    const fetchLoans = async () => {
      try {
        const res = await axiosSecure.get(
          `my-loans?email=${user.email}`
        );
        setLoans(res.data);
      } catch (error) {
        console.error("Failed to fetch loans", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user?.email]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-medium">
        Loading your loans...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <FaMoneyBillWave className="text-green-600 text-xl" />
        <h2 className="text-xl font-semibold">My Loans</h2>
      </div>

      {loans.length === 0 ? (
        <p className="text-gray-500">No loan applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th>#</th>
                <th>Loan Title</th>
                <th>Loan Amount</th>
                <th>Interest</th>
                <th>Status</th>
                <th>Application Fee</th>
                <th>Applied At</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr key={loan._id} className="text-sm">
                  <td>{index + 1}</td>
                  <td>{loan.loanTitle}</td>
                  <td>{loan.loanAmount}</td>
                  <td>{loan.interestRate}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        loan.status === "Approved"
                          ? "bg-green-500"
                          : loan.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td>{loan.applicationFeeStatus}</td>
                  <td>
                    {new Date(loan.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyLoans;
