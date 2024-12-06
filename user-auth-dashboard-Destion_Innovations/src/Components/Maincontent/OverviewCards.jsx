import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { useUser } from '../../UserContext';

const OverviewCards = ({month,year}) => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
  });
  const { user } = useUser();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        if (user) {
          const response = await axios.get(`/transactions/summary/${user.username}`,{ params: { month, year } });
          
          setSummary(response.data);
        }
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };
    

    fetchSummary();
  }, [user,month,year]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow border border-black border-solid">
        <h3 className="text-xl font-semibold">Total Income</h3>
        <p className="text-3xl text-green-500">${summary.totalIncome.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow border border-black border-solid">
        <h3 className="text-xl font-semibold">Total Expenses</h3>
        <p className="text-3xl text-red-500">${summary.totalExpenses.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow border border-black border-solid">
        <h3 className="text-xl font-semibold">Balance</h3>
        <p className={`text-3xl ${summary.balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          ${summary.balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OverviewCards;
