import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
const Dashboard = ({ children }) => {
  // const user = JSON.parse(localStorage.getItem("user")).mail;
  
  const {user} = useUser();
    
  const navigate = useNavigate();
  // console.log(user);
  const handlesubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
        <h2 className="text-2xl font-bold text-center">Destion Innovations</h2>
        <nav>
          <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Dashboard
          </Link>
          <Link to="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Profile
          </Link>
          <Link to="/settings" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.username}</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handlesubmit}>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
