import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const ApprovedLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const axiosSecure = UseAxiosSecure();

  const fetchApprovedLoans = async () => {
    try {
      const res = await axiosSecure.get("/loan-applications/approved");
      setLoans(res.data);
    } catch (err) {
      console.error("Failed to fetch approved loans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedLoans();
  }, []);

  const openModal = (loan) => {
    setSelectedLoan(loan);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLoan(null);
    setModalOpen(false);
  };

  if (loading) {
    return <p className="text-center py-10">Loading approved loans...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Approved Loan Applications</h2>

      {loans.length === 0 ? (
        <p>No approved loans found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th>Loan ID</th>
                <th>User Info</th>
                <th>Amount</th>
                <th>Approved Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td>{loan.loanId}</td>
                  <td>
                    {loan.userName} <br /> {loan.userEmail}
                  </td>
                  <td>{loan.loanAmount}</td>
                  <td>{new Date(loan.approvedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => openModal(loan)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <FiEye />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal to view loan details */}
      {modalOpen && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold mb-4">
              Loan Details - {selectedLoan.loanId}
            </h3>

            <p>
              <strong>Borrower Name:</strong> {selectedLoan.userName}
            </p>
            <p>
              <strong>Email:</strong> {selectedLoan.userEmail}
            </p>
            <p>
              <strong>Amount:</strong> {selectedLoan.loanAmount}
            </p>
            <p>
              <strong>Interest Rate:</strong> {selectedLoan.interestRate}
            </p>
            <p>
              <strong>Status:</strong> {selectedLoan.status}
            </p>
            <p>
              <strong>Approved Date:</strong>{" "}
              {new Date(selectedLoan.approvedAt).toLocaleString()}
            </p>

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

export default ApprovedLoans;
