// import React, { useState } from 'react';
// import Dashboard from '../Dashboard';

// const SIPCalculator = () => {
//   const [monthlyInvestment, setMonthlyInvestment] = useState(0);
//   const [rateOfReturn, setRateOfReturn] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [futureValue, setFutureValue] = useState(0);

//   const calculateSIP = (e) => {
//     e.preventDefault();
//     const rate = rateOfReturn / 100 / 12;
//     const months = duration * 12;
//     const futureValue = monthlyInvestment * (((1 + rate) ** months - 1) / rate) * (1 + rate);
//     setFutureValue(futureValue.toFixed(2));
//   };

//   return (
//     <Dashboard>
//     <div className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">SIP Calculator</h2>
//       <form onSubmit={calculateSIP}>
//         <div className="mb-4">
//           <label htmlFor="monthlyInvestment" className="block text-sm font-medium text-gray-700">
//             Monthly Investment (INR)
//           </label>
//           <input
//             type="number"
//             id="monthlyInvestment"
//             value={monthlyInvestment}
//             onChange={(e) => setMonthlyInvestment(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="rateOfReturn" className="block text-sm font-medium text-gray-700">
//             Expected Rate of Return (%)
//           </label>
//           <input
//             type="number"
//             id="rateOfReturn"
//             value={rateOfReturn}
//             onChange={(e) => setRateOfReturn(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
//             Duration (Years)
//           </label>
//           <input
//             type="number"
//             id="duration"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
//           Calculate
//         </button>
//       </form>
//       {futureValue > 0 && (
//         <div className="mt-4">
//           <h3 className="text-lg font-bold">Future Value: ₹{futureValue}</h3>
//         </div>
//       )}
//     </div>
//     </Dashboard>
//   );
// };

// export default SIPCalculator;

import Chart from 'chart.js/auto';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Dashboard from '../Maincontent/Dashboard';
import DonutChart from 'react-donut-chart'

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [annualReturnRate, setAnnualReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);

  const calculateSIP = () => {
    const monthlyRate = annualReturnRate / 12 / 100;
    const months = timePeriod * 12;
    const totalInvested = monthlyInvestment * months;
    const maturityValue =
      monthlyInvestment * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
    const returns = maturityValue - totalInvested;

    setInvestedAmount(totalInvested.toFixed(2));
    setMaturityAmount(maturityValue.toFixed(2));
    setEstimatedReturns(returns.toFixed(2));
  };

  const pieData = {
    labels: ['Invested Amount', 'Estimated Returns'],
    datasets: [
      {
        data: [investedAmount, estimatedReturns],
        backgroundColor: ['#3b82f6', '#10b981'],
        hoverBackgroundColor: ['#2563eb', '#059669'],
      },
    ],
  };

  return (
    <Dashboard>
    <div className='flex items-center'>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">SIP Calculator</h2>

        {/* Input Fields with Sliders */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Monthly Investment (₹)</label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="range"
              min="500"
              max="1000000"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Expected Return Rate (p.a)</label>
            <input
              type="number"
              value={annualReturnRate}
              onChange={(e) => setAnnualReturnRate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="range"
              min="1"
              max="30"
              value={annualReturnRate}
              onChange={(e) => setAnnualReturnRate(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Time Period (Years)</label>
            <input
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="range"
              min="1"
              max="40"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <button
          onClick={calculateSIP}
          className="w-full bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition-all"
        >
          Calculate
        </button>

        {/* Results and Visualization */}
        <div className="flex mt-6 items-center justify-between">
          <div className="flex-1 space-y-4">
            <h3 className="text-lg font-medium">Results</h3>
            <div className="flex justify-between">
              <div>
                <p className="text-gray-600">Invested Amount:</p>
                <p className="text-xl font-bold">₹{investedAmount}</p>
              </div>
              <div>
                <p className="text-gray-600">Estimated Returns:</p>
                <p className="text-xl font-bold">₹{estimatedReturns}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Value:</p>
                <p className="text-xl font-bold">₹{maturityAmount}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
          {/* Pie Chart */}
          <div className="flex-none flex justify-center items-center h-64">
            <div className="w-64 h-full">
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div> 
          </div> 
      </div>
    </Dashboard>
  );
};

export default SIPCalculator;
