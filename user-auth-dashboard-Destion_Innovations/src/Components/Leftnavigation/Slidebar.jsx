import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Dashboard>
    <div className="w-64 h-full bg-white shadow-md p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-gray-700 hover:text-blue-500">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/settings" className="text-gray-700 hover:text-blue-500">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/investment-tracker" className="text-gray-700 hover:text-blue-500">
              Investment tracker
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </Dashboard>
  );
};

export default Sidebar;
