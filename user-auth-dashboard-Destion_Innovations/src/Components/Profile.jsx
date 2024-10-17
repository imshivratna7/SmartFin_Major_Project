// src/components/Profile.jsx
import React from 'react';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Email:</label>
        <p className="text-gray-900">{user.mail}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">User ID:</label>
        <p className="text-gray-900">{user.name}</p>
      </div>
    </div>
  );
};

export default Profile;
