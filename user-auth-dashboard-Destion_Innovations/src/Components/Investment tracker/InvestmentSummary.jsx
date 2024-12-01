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
import React from 'react';

// Utility function to calculate current value based on investment details
const InvestmentSummary = ({ investments = { stocks: [], sips: [], gold: [], silver: [] } }) => {
  let years = 0;
  const calculateCurrentValue = (investedAmount, growthRate, investmentDate) => {
  const currentDate = new Date();
  const startDate = new Date(investmentDate);
  years = ((currentDate - startDate) / (1000 * 60 * 60 * 24 * 365)).toFixed(2);
  console.log(years);
  
  // Compound growth formula: A = P * (1 + r)^n
  const currentValue = investedAmount * Math.pow(1 + growthRate / 100, years);
  return currentValue;
  };

  // Flatten all investments into a single array
  const allInvestments = [
    ...investments.stocks,
    ...investments.sips,
    ...investments.gold,
    ...investments.silver,
  ];

  const totalInvested = allInvestments.reduce((sum, inv) => sum + parseFloat(inv.investedAmount || 0), 0);

  const totalCurrentValue = allInvestments.reduce((sum, inv) => {
    const currentValue = calculateCurrentValue(
      parseFloat(inv.investedAmount || 0),
      parseFloat(inv.growthRate || 0),
      inv.investmentDate || new Date()
    );
    return sum + parseFloat(currentValue || 0);
  }, 0);

  const overallGrowth =
    totalInvested > 0
      ? ((totalCurrentValue - totalInvested) / totalInvested) * 100/years
      : 0;

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

