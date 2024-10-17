// import React from "react";

// const RecentTransactions = () => {
//   const transactions = [
//     { date: "2024-10-12", type: "Income", category: "Salary", amount: 1500 },
//     { date: "2024-10-13", type: "Expense", category: "Groceries", amount: 200 },
//     { date: "2024-10-14", type: "Expense", category: "Utilities", amount: 100 },
//   ];

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const response = await fetch(`/api/transactions/${currentUser._id}`);
//         const data = await response.json();
//         if (response.ok) {
//           setTransactions(data);  // Update state with transactions
//         } else {
//           alert('Error fetching transactions');
//         }
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//       }
//     };
  
//     fetchTransactions();
//   }, []);
  

//   return (
//     <div className="bg-white p-4 rounded-md shadow">
//       <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
//       <table className="w-full table-auto">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Type</th>
//             <th className="px-4 py-2">Category</th>
//             <th className="px-4 py-2">Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((txn, index) => (
//             <tr key={index} className="border-b">
//               <td className="px-4 py-2">{txn.date}</td>
//               <td className="px-4 py-2">{txn.type}</td>
//               <td className="px-4 py-2">{txn.category}</td>
//               <td className="px-4 py-2">${txn.amount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RecentTransactions;


import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useUser } from '../UserContext';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (user) {
          
          const response = await axios.get(`/transactions/user/${user.username}`);
          console.log(response.data);
          setTransactions(response.data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [user]);

  const incomeTransactions = transactions?.filter((transaction) => transaction.type === 'income');
  const expenseTransactions = transactions?.filter((transaction) => transaction.type === 'expense');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {console.log(transactions)}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Incomes</h2>
        {incomeTransactions?.length > 0 ? (
          <ul className="space-y-4">
            {incomeTransactions?.map((transaction) => (
              <li key={transaction?._id} className="flex justify-between">
                <div>
                  <p className="text-lg font-medium">{transaction?.category}</p>
                  <p className="text-sm text-gray-500">{transaction?.description}</p>
                </div>
                <p className="text-green-500 font-semibold">
                  +${transaction?.amount.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent income transactions.</p>
        )}
      </div>

      {/* Expense Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        {expenseTransactions?.length > 0 ? (
          <ul className="space-y-4">
            {expenseTransactions.map((transaction) => (
              <li key={transaction?._id} className="flex justify-between">
                <div>
                  <p className="text-lg font-medium">{transaction?.category}</p>
                  <p className="text-sm text-gray-500">{transaction?.description}</p>
                </div>
                <p className="text-red-500 font-semibold">
                  -${transaction?.amount.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent expense transactions.</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
