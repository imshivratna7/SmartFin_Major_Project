// import React, { useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import 'chart.js/auto';

// const MyInvestments = () => {
//   // State for storing investments
//   const [investments, setInvestments] = useState({
//     stocks: [],
//     sips: [],
//     gold: [],
//     silver: [],
//   });

//   // State for form inputs
//   const [form, setForm] = useState({
//     category: 'stocks',
//     name: '',
//     invested: '',
//     current: '',
//   });

//   // Function to handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // Function to add a new investment
//   const addInvestment = (e) => {
//     e.preventDefault();
//     const { category, name, invested, current } = form;

//     if (!name || !invested || !current) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     const newInvestment = {
//       name,
//       invested: parseFloat(invested),
//       current: parseFloat(current),
//       growth: ((parseFloat(current) - parseFloat(invested)) / parseFloat(invested)) * 100,
//     };

//     setInvestments((prev) => ({
//       ...prev,
//       [category]: [...prev[category], newInvestment],
//     }));

//     // Reset form fields
//     setForm({ category: 'stocks', name: '', invested: '', current: '' });
//   };

//   // Data for Pie Chart
//   const pieData = {
//     labels: ['Stocks', 'SIPs', 'Gold', 'Silver'],
//     datasets: [
//       {
//         data: [
//           investments.stocks.reduce((sum, i) => sum + i.current, 0),
//           investments.sips.reduce((sum, i) => sum + i.current, 0),
//           investments.gold.reduce((sum, i) => sum + i.current, 0),
//           investments.silver.reduce((sum, i) => sum + i.current, 0),
//         ],
//         backgroundColor: ['#3b82f6', '#10b981', '#fbbf24', '#a855f7'],
//       },
//     ],
//   };

//   // Cumulative calculations
//   const totalInvested = Object.values(investments).flat().reduce((acc, item) => acc + item.invested, 0);
//   const totalCurrent = Object.values(investments).flat().reduce((acc, item) => acc + item.current, 0);
//   const overallGrowth = ((totalCurrent - totalInvested) / totalInvested) * 100;

//   return (
//     <div className="bg-white p-6 rounded shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">My Investments</h2>

//       {/* Add Investment Form */}
//       <form onSubmit={addInvestment} className="mb-4 grid gap-4 md:grid-cols-4">
//         <select
//           name="category"
//           value={form.category}
//           onChange={handleInputChange}
//           className="border p-2 rounded"
//         >
//           <option value="stocks">Stocks</option>
//           <option value="sips">SIPs</option>
//           <option value="gold">Gold</option>
//           <option value="silver">Silver</option>
//         </select>
//         <input
//           type="text"
//           name="name"
//           placeholder="Investment Name"
//           value={form.name}
//           onChange={handleInputChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           name="invested"
//           placeholder="Invested Amount"
//           value={form.invested}
//           onChange={handleInputChange}
//           className="border p-2 rounded"
//         />
//         <input
//           type="number"
//           name="current"
//           placeholder="Current Valuation"
//           value={form.current}
//           onChange={handleInputChange}
//           className="border p-2 rounded"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Add Investment
//         </button>
//       </form>

//       {/* Cumulative Analysis */}
//       <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
//         <div className="p-4 bg-blue-100 rounded">
//           <p className="text-gray-700">Total Invested</p>
//           <p className="text-xl font-bold">₹{totalInvested}</p>
//         </div>
//         <div className="p-4 bg-green-100 rounded">
//           <p className="text-gray-700">Current Valuation</p>
//           <p className="text-xl font-bold">₹{totalCurrent}</p>
//         </div>
//         <div className="p-4 bg-yellow-100 rounded">
//           <p className="text-gray-700">Overall Growth</p>
//           <p className="text-xl font-bold">{overallGrowth.toFixed(2)}%</p>
//         </div>
//       </div>

//       {/* Pie Chart */}
//       <div className="mt-6">
//         <h3 className="text-lg font-medium mb-4">Investment Allocation</h3>
//         <div className="w-full h-64">
//           <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
//         </div>
//       </div>

//       {/* Investment Sections */}
//       {Object.keys(investments).map((category) => (
//         <div key={category} className="mt-8">
//           <h3 className="text-xl font-semibold">{category.toUpperCase()}</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4">Investment Name</th>
//                   <th className="py-2 px-4">Invested Amount</th>
//                   <th className="py-2 px-4">Current Valuation</th>
//                   <th className="py-2 px-4">Growth Rate</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {investments[category].map((item, index) => (
//                   <tr key={index}>
//                     <td className="border px-4 py-2">{item.name}</td>
//                     <td className="border px-4 py-2">₹{item.invested}</td>
//                     <td className="border px-4 py-2">₹{item.current}</td>
//                     <td className={`border px-4 py-2 ${item.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                       {item.growth.toFixed(2)}%
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyInvestments;

import React, { useState } from 'react';
import InvestmentForm from './InvestmentForm';
import InvestmentList from './InvestmentList';
import InvestmentSummary from './InvestmentSummary';
import Dashboard from '../Maincontent/Dashboard';

const MyInvestments = () => {
  const [investments, setInvestments] = useState({
    stocks: [],
    sips: [],
    gold: [],
    silver: [],
  });

  const addInvestment = (investment) => {
    setInvestments((prev) => ({
      ...prev,
      [investment.type]: [...prev[investment.type], investment],
    }));
  };

  return (
    <Dashboard>
    <div className="container mx-auto p-6 flex flex-col gap-[25px]">
      <h2 className="text-2xl font-semibold mb-4">My Investments</h2>
      <InvestmentForm addInvestment={addInvestment} />
      <InvestmentSummary investments={investments} />
      <InvestmentList investments={investments} />
    </div>
    </Dashboard>
  );
};

export default MyInvestments;
