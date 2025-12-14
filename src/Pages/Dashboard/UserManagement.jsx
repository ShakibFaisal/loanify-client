import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const axiosSecure = UseAxiosSecure()
  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const updateRole = async () => {
    if (!selectedUser) return;

    try {
      await axiosSecure.patch(`users/${selectedUser._id}/role`, {
        role: newRole,
      });
      fetchUsers(); // refresh table
      closeModal();
    } catch (err) {
      console.error("Failed to update role:", err);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Loading users...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Users Management</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => openModal(user)}
                    >
                      <FiEdit2 />
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Update Role for {selectedUser.name}
            </h3>

            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mb-4"
            >
              
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
              <option value="suspended">Suspended</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={updateRole}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
