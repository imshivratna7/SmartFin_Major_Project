import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
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
    <div className="min-h-screen flex ">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
        <h2 className="text-2xl font-bold text-center">SmartFin</h2>
        <nav>
          <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
            Dashboard
          </Link>

          <Link to="/sip-calculator" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
           SIP Calculator
          </Link>

          <Link to="/investment-tracker" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
           Investment Tracker
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
        <header className="bg-white shadow p-4 border border-black border-solid m-[1px]">
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
        {/* <main className="flex-1 p-6 bg-gray-100"> */}
        <main className="flex-1 p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useUser } from '../../UserContext';

// const Dashboard = ({ children }) => {
//   const { user } = useUser();
//   const navigate = useNavigate();

//   const handleLogout = (e) => {
//     e.preventDefault();
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-200">
//       {/* Sidebar */}
//       <aside className="bg-gradient-to-b from-blue-100 to-blue-300 text-gray-800 w-full lg:w-64 space-y-6 py-7 px-4 shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
//           SmartFin
//         </h2>
//         <nav className="space-y-3">
//           <Link
//             to="/dashboard"
//             className="block py-3 px-5 rounded-md bg-blue-200 hover:bg-blue-300 transition text-gray-800 font-medium"
//           >
//             Dashboard
//           </Link>
//           <Link
//             to="/profile"
//             className="block py-3 px-5 rounded-md bg-blue-200 hover:bg-blue-300 transition text-gray-800 font-medium"
//           >
//             Profile
//           </Link>
//           <Link
//             to="/settings"
//             className="block py-3 px-5 rounded-md bg-blue-200 hover:bg-blue-300 transition text-gray-800 font-medium"
//           >
//             Settings
//           </Link>
//           <Link
//             to="/sip-calculator"
//             className="block py-3 px-5 rounded-md bg-blue-200 hover:bg-blue-300 transition text-gray-800 font-medium"
//           >
//             SIP Calculator
//           </Link>
//           <Link
//             to="/investment-tracker"
//             className="block py-3 px-5 rounded-md bg-blue-200 hover:bg-blue-300 transition text-gray-800 font-medium"
//           >
//             Investment Tracker
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-white shadow p-6">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
//             <div className="flex items-center space-x-6">
//               <span className="text-gray-600">
//                 Welcome, {user?.username || "Guest"}
//               </span>
//               <button
//                 className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Content Area */}
//         <main className="flex-1 p-8 bg-white rounded-lg shadow-inner overflow-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


