import Dashboard from '../Components/Dashboard';

import React, { useEffect, useState } from "react";
import OverviewCards from "../Components/OverviewCards.jsx";
import RecentTransactions from "../Components/RecentTransactions.jsx";
// import GraphicalAnalysis from "../components/GraphicalAnalysis";
import AddTransactionModal from "../components/AddTransactionModel.jsx";
import { useNavigate } from 'react-router-dom';

const Dashboardpages = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    // Optionally: verify token with backend here
  }, [navigate]);
  return (
    <Dashboard>
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <OverviewCards />
      </div>
      <div className="mb-6">
        <RecentTransactions />
      </div>
      {/* <div className="mb-6">
        <GraphicalAnalysis />
      </div> */}
      <div className="flex justify-end">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={() => setShowModal(true)}
        >
          + Add Income
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => setShowModal(true)}
        >
          + Add Expense
        </button>
      </div>
      
      {showModal && (
        <AddTransactionModal closeModal={() => setShowModal(false)} />
      )}
    </div>
  </Dashboard>
  );

      

};

export default Dashboardpages;

