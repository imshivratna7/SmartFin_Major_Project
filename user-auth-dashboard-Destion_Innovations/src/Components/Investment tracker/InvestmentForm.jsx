import React, { useState } from 'react';

const InvestmentForm = ({ addInvestment }) => {
  const [investmentType, setInvestmentType] = useState('stocks');
  const [name, setName] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [investmentDate, setInvestmentDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !investedAmount || !growthRate || !investmentDate) return;

    const investment = {
      type: investmentType,
      name,
      investedAmount: parseFloat(investedAmount),
      growthRate: parseFloat(growthRate),
      investmentDate,
    };
    addInvestment(investment);
    setName('');
    setInvestedAmount('');
    setGrowthRate('');
    setInvestmentDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium">Investment Type</label>
        <select
          value={investmentType}
          onChange={(e) => setInvestmentType(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="stocks">Stocks</option>
          <option value="sips">SIPs</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Investment Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Invested Amount (₹)</label>
        <input
          type="number"
          value={investedAmount}
          onChange={(e) => setInvestedAmount(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Growth Rate (% p.a.)</label>
        <input
          type="number"
          value={growthRate}
          onChange={(e) => setGrowthRate(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Investment Date</label>
        <input
          type="date"
          value={investmentDate}
          onChange={(e) => setInvestmentDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Add Investment
      </button>
    </form>
  );
};

export default InvestmentForm;
