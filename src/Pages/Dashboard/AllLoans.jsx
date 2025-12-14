import React, { useEffect, useState } from "react";

import { FiEdit2, FiTrash2 } from "react-icons/fi";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";


const AllLoans = () => {
 
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const axiosSecure = UseAxiosSecure();

  // Fetch all loans
  const fetchLoans = async () => {
    try {
      const res = await axiosSecure.get("/loans");
      setLoans(res.data);
    } catch (err) {
      console.error("Failed to fetch loans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Open update modal
  const openModal = (loan) => {
    setSelectedLoan(loan);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLoan(null);
    setModalOpen(false);
  };


  const openDeleteModal = (loan) => {
    setSelectedLoan(loan);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedLoan(null);
    setDeleteModalOpen(false);
  };

  // Update loan info
  const updateLoan = async () => {
    try {
      await axiosSecure.patch(`/loans/${selectedLoan._id}`, selectedLoan);
      fetchLoans();
      closeModal();
    } catch (err) {
      console.error("Failed to update loan:", err);
    }
  };

  // Delete loan
  const deleteLoan = async () => {
    try {
      await axiosSecure.delete(`/loans/${selectedLoan._id}`);
      fetchLoans();
      closeDeleteModal();
    } catch (err) {
      console.error("Failed to delete loan:", err);
    }
  };

  // Toggle Show on Home
  const toggleShowOnHome = async (loan) => {
    try {
      await axiosSecure.patch(`/loans/${loan._id}/show-home`, {
        showOnHome: !loan.showOnHome,
      });
      fetchLoans();
    } catch (err) {
      console.error("Failed to toggle show on home:", err);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading loans...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">All Loans</h2>

      {loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Interest</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Show on Home</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan._id}>
                  <td>
                    <img
                      src={loan.loanImage}
                      alt={loan.loanTitle}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td>{loan.loanTitle}</td>
                  <td>{loan.interestRate}</td>
                  <td>{loan.category}</td>
                  <td>{loan.createdBy || "Admin"}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={loan.showOnHome || false}
                      onChange={() => toggleShowOnHome(loan)}
                    />
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => openModal(loan)}
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => openDeleteModal(loan)}
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {modalOpen && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold mb-4">Edit Loan</h3>

            <div className="space-y-3">
              <label className="block font-medium">Title</label>
              <input
                type="text"
                value={selectedLoan.loanTitle}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, loanTitle: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <label className="block font-medium">Description</label>
              <textarea
                value={selectedLoan.description || ""}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, description: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <label className="block font-medium">Interest Rate</label>
              <input
                type="text"
                value={selectedLoan.interestRate}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, interestRate: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <label className="block font-medium">Category</label>
              <input
                type="text"
                value={selectedLoan.category}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, category: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <label className="block font-medium">Loan Image URL</label>
              <input
                type="text"
                value={selectedLoan.loanImage}
                onChange={(e) =>
                  setSelectedLoan({ ...selectedLoan, loanImage: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={updateLoan}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete the loan: <strong>{selectedLoan.loanTitle}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteLoan}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllLoans;
