// import Dashboard from '../Components/Maincontent/Dashboard.jsx';

// import React, { useEffect, useState } from "react";
// import OverviewCards from "../Components/Maincontent/OverviewCards.jsx";
// import RecentTransactions from "../Components/Maincontent/RecentTransactions.jsx";
// // import GraphicalAnalysis from "../components/GraphicalAnalysis";
// import AddTransactionModal from "../Components/Maincontent/AddTransactionModel.jsx";
// import { useNavigate } from 'react-router-dom';

// const Dashboardpages = () => {
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//     }
//     // Optionally: verify token with backend here
//   }, [navigate]);
//   return (
//     <Dashboard>
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="mb-6">
//         <OverviewCards />
//       </div>
//       <div className="mb-6">
//         <RecentTransactions />
//       </div>
//       {/* <div className="mb-6">
//         <GraphicalAnalysis />
//       </div> */}
//       <div className="flex justify-end">
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
//           onClick={() => setShowModal(true)}
//         >
//           + Add Income
//         </button>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded-md"
//           onClick={() => setShowModal(true)}
//         >
//           + Add Expense
//         </button>
//       </div>
      
//       {showModal && (
//         <AddTransactionModal closeModal={() => setShowModal(false)} />
//       )}
//     </div>
//   </Dashboard>
//   );

      

// };

// export default Dashboardpages;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Dashboard from "../Components/Maincontent/Dashboard.jsx";
// import OverviewCards from "../Components/Maincontent/OverviewCards.jsx";
// import RecentTransactions from "../Components/Maincontent/RecentTransactions.jsx";
// // import GraphicalAnalysis from "../components/GraphicalAnalysis";
// import AddTransactionModal from "../Components/Maincontent/AddTransactionModel.jsx";
// import ExpenseEarningChart from "../Components/ExpenseEarningViz/Viz.jsx"; 
// const Dashboardpages = () => {
//   const [showModal, setShowModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//     }
//     // Optional: Add backend token verification here
//   }, [navigate]);

//   return (
//     <Dashboard>
//       <div className="p-6 bg-gray-100">
//         {/* Overview Section */}
//         <div className="mb-6">
//           <OverviewCards />
//         </div>

//         {/* Recent Transactions */}
//         <div className="mb-6">
//           <RecentTransactions />
//         </div>

//         {/* Graphical Analysis */}
//         {/* <div className="mb-6">
//           <GraphicalAnalysis />
//         </div> */}

//         {/* Add Income/Expense Buttons */}
//         <div className="flex justify-end space-x-4">
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-md transition hover:bg-green-600"
//             onClick={() => setShowModal("income")}
//           >
//             + Add Income
//           </button>
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded-md transition hover:bg-red-600"
//             onClick={() => setShowModal("expense")}
//           >
//             + Add Expense
//           </button>
//         </div>

//         {/* Modal Section */}
//         {showModal && (
//           <AddTransactionModal
//             transactionType={showModal} // "income" or "expense"
//             closeModal={() => setShowModal(false)}
//           />
//         )}

//       </div>
//       <div>
//         <ExpenseEarningChart/>
//       </div>
//     </Dashboard>
//   );
// };

// export default Dashboardpages;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Components/Maincontent/Dashboard.jsx";
import OverviewCards from "../Components/Maincontent/OverviewCards.jsx";
import RecentTransactions from "../Components/Maincontent/RecentTransactions.jsx";
import AddTransactionModal from "../Components/Maincontent/AddTransactionModel.jsx";
import ExpenseEarningChart from "../Components/ExpenseEarningViz/Viz.jsx";
import axios from "../axios.js";
import { useUser } from "../UserContext.jsx";

const Dashboardpages = () => {
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `/transactions/user/${user?.username}`,
        { params: { month, year } }
      );
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, year, user]);

  return (
    <Dashboard>
      <div className="p-6 bg-gray-100">
        {/* Month and Year Selector */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <label>Month: </label>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
            <label className="ml-4">Year: </label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Overview Section */}
        <div className="mb-6">
          <OverviewCards month={month} year={year} />
        </div>

        {/* Recent Transactions */}
        <div className="mb-6">
          <RecentTransactions month={month} year={year}/>
        </div>

        {/* Add Income/Expense Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md transition hover:bg-green-600"
            onClick={() => setShowModal("income")}
          >
            + Add Income
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md transition hover:bg-red-600"
            onClick={() => setShowModal("expense")}
          >
            + Add Expense
          </button>
        </div>

        {/* Modal Section */}
        {showModal && (
          <AddTransactionModal
            transactionType={showModal}
            closeModal={() => setShowModal(false)}
          />
        )}

        {/* Expense vs Earning Chart */}
        <div>
          <ExpenseEarningChart  month={month} year={year} />
        </div>
      </div>
    </Dashboard>
  );
};

export default Dashboardpages;
