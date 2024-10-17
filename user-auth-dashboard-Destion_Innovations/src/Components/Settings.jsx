// src/components/Settings.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = ({ }) => {
  const navigate = useNavigate()
  const handlesubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handlesubmit}
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
