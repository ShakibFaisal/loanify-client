import React, { useEffect, useState } from "react";
import { FiEye, FiCheck, FiX } from "react-icons/fi";

import toast from "react-hot-toast";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const PendingLoans = () => {
  const axiosSecure = UseAxiosSecure();

  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending loans
  const fetchPendingLoans = async () => {
    try {
      const res = await axiosSecure.get("/loan-applications/pending");
      setLoans(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch pending loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingLoans();
  }, []);

  // Approve loan
  const approveLoan = async (loanId) => {
    try {
      await axiosSecure.patch(`/loan-applications/${loanId}/approve`);
      toast.success("Loan approved");
      fetchPendingLoans();
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve loan");
    }
  };

  // Reject loan
  const rejectLoan = async (loanId) => {
    try {
      await axiosSecure.patch(`/loan-applications/${loanId}/reject`);
      toast.error("Loan rejected");
      fetchPendingLoans();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject loan");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading pending loans...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Pending Loan Applications</h2>

      {loans.length === 0 ? (
        <p>No pending loans found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th>Loan ID</th>
                <th>User Info</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td>{loan.loanId}</td>
                  <td>
                    {loan.firstName} {loan.lastName} <br />
                    <small>{loan.userEmail}</small>
                  </td>
                  <td>{loan.loanAmount || "-"}</td>
                  <td>{new Date(loan.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    {/* 👁 View details */}
                    <button
                      onClick={() => toast(`Loan Details: ${loan.description || "-"}`)}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FiEye /> View
                    </button>

                    {/* ✅ Approve */}
                    <button
                      onClick={() => approveLoan(loan._id)}
                      className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <FiCheck /> Approve
                    </button>

                    {/* ❌ Reject */}
                    <button
                      onClick={() => rejectLoan(loan._id)}
                      className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <FiX /> Reject
                    </button>
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

export default PendingLoans;
