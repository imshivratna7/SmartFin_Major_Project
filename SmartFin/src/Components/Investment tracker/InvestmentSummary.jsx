// import React from 'react';

// const InvestmentSummary = ({ investments }) => {

 

//   const calculateCurrentValue = (investedAmount, growthRate, investmentDate) => {
//   const currentDate = new Date();
//   const startDate = new Date(investmentDate);
//   const years = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 365);

//   // Compound growth formula: A = P * (1 + r)^n
//   const currentValue = investedAmount * Math.pow(1 + growthRate / 100, years);
//   return currentValue.toFixed(2);
// };


//   const totalInvested = Object.values(investments).flat().reduce((sum, inv) => sum + inv.investedAmount, 0);
//   const totalCurrentValue = Object.values(investments).flat().reduce((sum, inv) => {
//     return sum + calculateCurrentValue(inv.investedAmount, inv.growthRate, inv.investmentDate);
//   }, 0);
//   const overallGrowth = ((totalCurrentValue - totalInvested) / totalInvested) * 100;

//   return (
//     <div className="grid gap-4 grid-cols-1 md:grid-cols-3 p-4 bg-gray-100 rounded-lg shadow">
//       <div>
//         <p className="text-gray-700">Total Invested</p>
//         <p className="text-xl font-bold">₹{totalInvested.toFixed(2)}</p>
//       </div>
//       <div>
//         <p className="text-gray-700">Current Valuation</p>
//         <p className="text-xl font-bold">₹{totalCurrentValue.toFixed(2)}</p>
//       </div>
//       <div>
//         <p className="text-gray-700">Overall Growth</p>
//         <p className="text-xl font-bold">{overallGrowth.toFixed(2)}%</p>
//       </div>
//     </div>
//   );
// };

// export default InvestmentSummary;

// components/InvestmentSummary.jsx
// import React from 'react';

// // Utility function to calculate current value based on investment details
// const InvestmentSummary = ({ investments = { stocks: [], sips: [], gold: [], silver: [] } }) => {
//   let years = 0;
//   const calculateCurrentValue = (investedAmount, growthRate, investmentDate) => {
//   const currentDate = new Date();
//   const startDate = new Date(investmentDate);
//   years = ((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365)).toFixed(2);
//   console.log(years);
  
//   // Compound growth formula: A = P * (1 + r)^n
//   const currentValue = investedAmount * Math.pow(1 + growthRate / 100, years);
//   return currentValue;
//   };

//   // Flatten all investments into a single array
//   const allInvestments = [
//     ...investments.stocks,
//     ...investments.sips,
//     ...investments.gold,
//     ...investments.silver,
//   ];

//   const totalInvested = allInvestments.reduce((sum, inv) => sum + parseFloat(inv.investedAmount || 0), 0);

//   const totalCurrentValue = allInvestments.reduce((sum, inv) => {
//     const currentValue = calculateCurrentValue(
//       parseFloat(inv.investedAmount || 0),
//       parseFloat(inv.growthRate || 0),
//       inv.investmentDate || new Date()
//     );
//     return sum + parseFloat(currentValue || 0);
//   }, 0);

//   const overallGrowth =
//     totalInvested > 0
//       ? ((totalCurrentValue - totalInvested) / totalInvested) * 100/years
//       : 0;

//   return (
//     <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//       <div className="p-4 bg-blue-100 rounded">
//         <p className="text-gray-700">Total Invested</p>
//         <p className="text-xl font-bold">₹{totalInvested.toFixed(2)}</p>
//       </div>
//       <div className="p-4 bg-green-100 rounded">
//         <p className="text-gray-700">Current Valuation</p>
//         <p className="text-xl font-bold">₹{totalCurrentValue.toFixed(2)}</p>
//       </div>
//       <div className="p-4 bg-yellow-100 rounded">
//         <p className="text-gray-700">Overall Growth</p>
//         <p className="text-xl font-bold">{overallGrowth.toFixed(2)}%</p>
//       </div>
//     </div>
//   );
// };

// export default InvestmentSummary;



import React, { useEffect, useState } from 'react';
import axios from '../../axios'; // Replace with your axios instance
import { useUser } from '../../UserContext';

const InvestmentSummary = ({ userId }) => {
  const [investments, setInvestments] = useState({
    stocks: [],
    sips: [],
    gold: [],
    silver: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useUser();

  const calculateCurrentValue = (amount, currentGrowthRate, date) => {
    console.log(date);
    
    const currentDate = new Date();
    const startDate = new Date(date);
    const years = ((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365)).toFixed(2);

    // Compound growth formula: A = P * (1 + r)^n
    const currentValue = amount * Math.pow(1 + currentGrowthRate / 100, years);
    return currentValue;
  };

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const { data } = await axios.get(`/transactions/investments/user/${user.username}`);
        
        const groupedInvestments = {
          stocks: data.filter((inv) => inv.type === 'stocks'),
          sips: data.filter((inv) => inv.type === 'sips'),
          gold: data.filter((inv) => inv.type === 'gold'),
          silver: data.filter((inv) => inv.type === 'silver'),
        };
        
        setInvestments(groupedInvestments);
        console.log(groupedInvestments);
        setLoading(false);
      } catch (err) {
        setError('Failed to load investments. Please try again.');
        setLoading(false);
      }
    };

    fetchInvestments();
  }, [user]);

  // Flatten all investments into a single array
  const allInvestments = [
    ...investments.stocks,
    ...investments.sips,
    ...investments.gold,
    ...investments.silver,
  ];

  const totalInvested = allInvestments.reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
  
  const totalCurrentValue = allInvestments.reduce((sum, inv) => {
    // console.log(inv);
    const currentValue = calculateCurrentValue(
      parseFloat(inv.amount || 0),
      parseFloat(inv.currentGrowthRate || 0),
      inv.date || new Date()
    );
    return sum + parseFloat(currentValue || 0);
  }, 0);

  
  
  const overallGrowth =
  totalInvested > 0
  ? ((totalCurrentValue - totalInvested) / totalInvested) * 100
  : 0;
  
  // console.log(overallGrowth);
  if (loading) return <p>Loading investments...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="p-4 bg-blue-100 rounded">
        <p className="text-gray-700">Total Invested</p>
        <p className="text-xl font-bold">₹{totalInvested.toFixed(2)}</p>
      </div>
      <div className="p-4 bg-green-100 rounded">
        <p className="text-gray-700">Current Valuation</p>
        <p className="text-xl font-bold">₹{totalCurrentValue.toFixed(2)}</p>
      </div>
      <div className="p-4 bg-yellow-100 rounded">
        <p className="text-gray-700">Overall Growth</p>
        <p className="text-xl font-bold">{overallGrowth.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default InvestmentSummary;
