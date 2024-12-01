import React from 'react';

const calculateCurrentValue = (investedAmount, growthRate, investmentDate) => {
    const currentDate = new Date();
    const startDate = new Date(investmentDate);
    
    // Calculate the time difference in years
    const years = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 365);
    
    // Annual compound interest formula: A = P * (1 + r/n)^(n*t)
    // Since the growth rate is annual, n = 1 (compounded once per year)
    const annualRate = growthRate / 100;
    const currentValue = investedAmount * Math.pow(1 + annualRate, years);
    
    return currentValue;
  };
  

const InvestmentList = ({ investments }) => {
  return (
    <div className="space-y-6">
      {Object.keys(investments).map((type) => (
        <div key={type}>
          <h3 className="text-xl font-semibold">{type.toUpperCase()}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Invested Amount</th>
                  <th className="py-2 px-4">Current Value</th>
                  <th className="py-2 px-4">Growth Rate</th>
                </tr>
              </thead>
              <tbody>
                {investments[type].map((investment, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{investment.name}</td>
                    <td className="border px-4 py-2">₹{investment.investedAmount}</td>
                    <td className="border px-4 py-2">
                      ₹{calculateCurrentValue(investment.investedAmount, investment.growthRate, investment.investmentDate).toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">{investment.growthRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestmentList;
