import React, { useContext, useEffect, useState } from "react";
import { FaMoneyBillWave, FaEye, FaTimes, FaCheck } from "react-icons/fa";

import { AuthContext } from "../../Provider/AuthContext";
import toast from "react-hot-toast";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loader from "../../Components/Loader/Loader";

const MyLoans = () => {
  const { user } = useContext(AuthContext);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (!user?.email) return;

    const fetchLoans = async () => {
      try {
        const res = await axiosSecure.get(`my-loans?email=${user.email}`);
        setLoans(res.data);
      } catch (error) {
        console.error("Failed to fetch loans", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user?.email, axiosSecure]);

  const viewLoan = (loan) => {
    setSelectedLoan(loan);
  };

  const closeModal = () => {
    setSelectedLoan(null);
    setPaymentModalOpen(false);
  };

  const cancelLoan = async (loan) => {
    if (!window.confirm("Are you sure you want to cancel this loan?")) return;
    try {
      await axiosSecure.patch(`/loans/${loan._id}/cancel`);
      toast.success("Loan canceled successfully");
      setLoans(loans.filter((l) => l._id !== loan._id));
    } catch (err) {
      console.error("Failed to cancel loan:", err);
      toast.error("Failed to cancel loan");
    }
  };

 const payApplicationFee = async (loan) => {
  const paymentInfo = {
    amount: 10,                
    loanId: loan._id,
    userEmail: loan.userEmail,
    loanTitle: loan.loanTitle,
  };

  const res = await axiosSecure.post(
    "/loan-fee-checkout-session",
    paymentInfo
  );

  window.location.assign(res.data.url);
};

  const showPaymentDetails = (loan) => {
    setSelectedLoan(loan);
    setPaymentModalOpen(true);
  };

  if (loading) {
    return <Loader></Loader>;
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
          <table className="table w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Loan Info</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Application Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan, index) => (
                <tr key={loan._id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{loan.loanTitle}</strong>
                    <br />
                    {loan.category}
                  </td>
                  <td>${loan.loanAmount}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white ${
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
                  <td>
                    {loan.applicationFeeStatus === "Paid" ? (
                      <button
                        onClick={() => showPaymentDetails(loan)}
                        className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                      >
                        Paid
                      </button>
                    ) : (
                      <button
                        onClick={() => payApplicationFee(loan)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => viewLoan(loan)}
                      className="px-2 py-1 bg-gray-500 text-white rounded text-xs flex items-center gap-1"
                    >
                      <FaEye /> View
                    </button>
                    {loan.status === "Pending" && (
                      <button
                        onClick={() => cancelLoan(loan)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs flex items-center gap-1"
                      >
                        <FaTimes /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Loan Details Modal */}
      {selectedLoan && !paymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold mb-4">{selectedLoan.loanTitle}</h3>
            <p><strong>Category:</strong> {selectedLoan.category}</p>
            <p><strong>Amount:</strong> ${selectedLoan.loanAmount}</p>
            <p><strong>Status:</strong> {selectedLoan.status}</p>
            <p><strong>Application Fee:</strong> {selectedLoan.applicationFeeStatus}</p>
            <p><strong>Applied At:</strong> {new Date(selectedLoan.createdAt).toLocaleString()}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {selectedLoan && paymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <p><strong>Email:</strong> {selectedLoan.userEmail}</p>
            <p><strong>Loan ID:</strong> {selectedLoan._id}</p>
            <p><strong>Transaction ID:</strong> {selectedLoan.transactionId || "N/A"}</p>
            <p><strong>Amount Paid:</strong> $10</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLoans;
