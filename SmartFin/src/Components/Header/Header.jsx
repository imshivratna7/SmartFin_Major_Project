import React from 'react';

const Header = () => {
  return (
    <header className="bg-black shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-semibold">My App</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Welcome, User</span>
        <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </header>
  );
};

export default Header;
