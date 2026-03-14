import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  // Fetch logged-in user data
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users/profile", {
        withCredentials: true, // IMPORTANT
      });
      setUser(res.data);
    } catch (err) {
      console.log("Profile Error:", err);
    }
  };

  // Logout user
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/users/logout",
        {},
        { withCredentials: true }
      );

      window.location.href = "/login";
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 mt-4">
      <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-green-300 flex items-center justify-center text-2xl font-bold">
            {user.firstname[0]}
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {user.firstname} {user.lastname}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
