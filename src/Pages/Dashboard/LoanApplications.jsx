import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";


const LoanApplications = () => {
  const axiosSecure = UseAxiosSecure();

  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchApplications = async () => {
    try {
      const res = await axiosSecure.get("loan-applications");
      setApplications(res.data);
      setFilteredApps(res.data);
    } catch (err) {
      console.error("Failed to fetch applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter by status
  useEffect(() => {
    if (filterStatus === "All") {
      setFilteredApps(applications);
    } else {
      setFilteredApps(
        applications.filter(app => app.status === filterStatus)
      );
    }
  }, [filterStatus, applications]);

  if (loading) {
    return <p className="text-center py-10">Loading loan applications...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Loan Applications</h2>

        {/* Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredApps.length === 0 ? (
        <p>No loan applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th>Loan ID</th>
                <th>User</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app._id} className="text-sm">
                  <td>{app.loanId}</td>
                  <td>
                    <p className="font-medium">{app.firstName} {app.lastName}</p>
                    <p className="text-xs text-gray-500">{app.userEmail}</p>
                  </td>
                  <td>{app.loanTitle || "N/A"}</td>
                  <td>{app.loanAmount}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        app.status === "Approved"
                          ? "bg-green-500"
                          : app.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedApp(app)}
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

      {/* View Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              Loan Application Details
            </h3>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedApp.firstName} {selectedApp.lastName}</p>
              <p><strong>Email:</strong> {selectedApp.userEmail}</p>
              <p><strong>Contact:</strong> {selectedApp.contactNumber}</p>
              <p><strong>Loan ID:</strong> {selectedApp.loanId}</p>
              <p><strong>Amount:</strong> {selectedApp.loanAmount}</p>
              <p><strong>Interest:</strong> {selectedApp.interestRate}</p>
              <p><strong>Income Source:</strong> {selectedApp.incomeSource}</p>
              <p><strong>Monthly Income:</strong> {selectedApp.monthlyIncome}</p>
              <p><strong>Address:</strong> {selectedApp.address}</p>
              <p><strong>Reason:</strong> {selectedApp.reason}</p>
              <p><strong>Status:</strong> {selectedApp.status}</p>
              <p><strong>Applied At:</strong> {new Date(selectedApp.createdAt).toLocaleString()}</p>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
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

export default LoanApplications;
