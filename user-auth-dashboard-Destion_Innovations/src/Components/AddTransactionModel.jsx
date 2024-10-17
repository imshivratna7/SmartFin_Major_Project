// import React, { useState } from 'react';

// const AddTransactionModal = () => {
//   //   console.log(isOpen);
    
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [type, setType] = useState('income'); // 'income' or 'expense'

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   if (!amount || !description) {
//   //     alert('Please fill out all fields.');
//   //     return;
//   //   }

//   //   const newTransaction = {
//   //     amount: parseFloat(amount),
//   //     description,
//   //     type,
//   //   };

//   //   onSubmit(newTransaction);
//   //   onClose(); // Close the modal after submission
//   //   setAmount('');
//   //   setDescription('');
//   //   setType('income');

//   try {
//     const response = await fetch('/api/transactions/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         userId: currentUser._id,  // Replace with logged-in user ID
//         type: type,
//         amount: amount,
//         category: Category,
//         description: description,
//       }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       alert('Transaction added successfully');
//       // Refresh transactions list or update state
//     } else {
//       alert(data.message || 'Failed to add transaction');
//     }
//   } catch (error) {
//     console.error('Error adding transaction:', error);
//   }
//   };

// //   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="bg-white w-full max-w-md p-6 rounded-md shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Amount</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <input
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Type</label>
//             <select
//               value={type}
//               onChange={(e) => setType(e.target.value)}
//               className="mt-1 block w-full p-2 border rounded-md"
//             >
//               <option value="income">Income</option>
//               <option value="expense">Expense</option>
//             </select>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={onClose}
//               className="mr-2 bg-gray-300 text-gray-700 p-2 rounded-md"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white p-2 rounded-md"
//             >
//               Add
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTransactionModal;

import React, { useState } from 'react';
import { useUser } from '../UserContext';
import axios from '../axios';
const AddTransaction = () => {
  const [transactionType, setTransactionType] = useState('income');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionCategory, setTransactionCategory] = useState('');
  const [transactionDescription, setTransactionDescription] = useState('');
  const { user } = useUser();
  const handleAddTransaction = async () => {
    // console.log(user);
    
    try {
      const response = await axios.post('/transactions/add', {
          userId: user.username,  // Replace with the current user's ID
          type: transactionType,
          amount: transactionAmount,
          category: transactionCategory,
          description: transactionDescription,
        })
  
      const data = await response.data;
      
        console.log(data);
        alert('Transaction added successfully');
        // refreshTransactions(); // Refresh the list of transactions after adding a new one
        // Clear the input fields
        setTransactionAmount('');
        setTransactionCategory('');
        setTransactionDescription('');
      } 
     catch (error) {
      console.error('Error adding transaction:', error);
      alert(error.response?.data?.message || 'Failed to add transaction');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
      <div className="mb-3">
        <label className="block mb-1">Type</label>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="w-full border p-2 rounded-md"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1">Amount</label>
        <input
          type="number"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          className="w-full border p-2 rounded-md"
          placeholder="Enter amount"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Category</label>
        <input
          type="text"
          value={transactionCategory}
          onChange={(e) => setTransactionCategory(e.target.value)}
          className="w-full border p-2 rounded-md"
          placeholder="Enter category"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Description</label>
        <input
          type="text"
          value={transactionDescription}
          onChange={(e) => setTransactionDescription(e.target.value)}
          className="w-full border p-2 rounded-md"
          placeholder="Enter description"
        />
      </div>
      <button
        onClick={handleAddTransaction}
        className="w-full bg-blue-500 text-white p-2 rounded-md"
      >
        Add Transaction
      </button>
    </div>
  );
};

export default AddTransaction;

