import React, { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";

const ManageLoans = () => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 🔹 Fetch manager loans
  const fetchLoans = async () => {
    try {
      const res = await axiosSecure.get("/manager/loans");
      setLoans(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // 🔍 Search filter
  const filteredLoans = useMemo(() => {
    return loans.filter(
      (loan) =>
        loan.loanTitle?.toLowerCase().includes(search.toLowerCase()) ||
        loan.category?.toLowerCase().includes(search.toLowerCase())
    );
  }, [loans, search]);

  // 🗑️ Delete
  const confirmDelete = async () => {
    try {
      await axiosSecure.delete(`/loans/${selectedLoan._id}`);
      toast.success("Loan deleted");
      fetchLoans();
      setDeleteModalOpen(false);
      setSelectedLoan(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete loan");
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading loans...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Loans</h2>

        {/* 🔍 Search */}
        <div className="relative">
          <FiSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg text-sm"
          />
        </div>
      </div>

      {filteredLoans.length === 0 ? (
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan._id}>
                  <td>
                    <img
                      src={loan.loanImage || "https://via.placeholder.com/50"}
                      alt={loan.loanTitle}
                      className="w-12 h-12 rounded object-cover"
                    />
                  </td>
                  <td>{loan.loanTitle}</td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.category}</td>
                  <td className="flex gap-2">
                    {/* ✏️ Update */}
                    <button
                      onClick={() =>
                        navigate(`/dashboard/update-loan/${loan._id}`)
                      }
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <FiEdit2 />
                      Edit
                    </button>

                    {/* 🗑️ Delete */}
                    <button
                      onClick={() => {
                        setSelectedLoan(loan);
                        setDeleteModalOpen(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
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

     
      {deleteModalOpen && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <strong>{selectedLoan.loanTitle}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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

export default ManageLoans;
