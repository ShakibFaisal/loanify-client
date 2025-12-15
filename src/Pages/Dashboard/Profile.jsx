import React, { useContext } from "react";

import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const Profile = () => {
  const { user, signout } = useContext(AuthContext);
  const navigate = useNavigate();
 console.log(user)
  const handleLogout = async () => {
    try {
      await signout();
      navigate("/login"); 
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!user) {
    return <p className="text-center py-10">Loading profile...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-lg mx-auto mt-6 text-center">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      {/* User Image */}
      <div className="mb-4">
        <img
          src={user.photoURL || "https://via.placeholder.com/100"}
          alt={user.displayName
}
          className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* User Info */}
      <div className="space-y-3 text-gray-700 text-left">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role || "User"}
        </p>
        <p>
          <strong>Joined At:</strong>{" "}
          {new Date(user.metadata.creationTime).toLocaleDateString()}
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
