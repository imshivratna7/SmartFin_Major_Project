// import React, { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const ExpenseEarningChart = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/transactions"); // Adjust endpoint as per your backend
//         const transactions = response.data;

//         // Process data to group by month
//         const monthlyData = transactions.reduce((acc, transaction) => {
//           const date = new Date(transaction.date);
//           const month = date.toLocaleString("default", { month: "short" });
          
//           if (!acc[month]) {
//             acc[month] = { month, earnings: 0, expenses: 0 };
//           }

//           if (transaction.type === "earning") {
//             acc[month].earnings += transaction.amount;
//           } else if (transaction.type === "expense") {
//             acc[month].expenses += transaction.amount;
//           }

//           return acc;
//         }, {});

//         setData(Object.values(monthlyData));
//       } catch (error) {
//         console.error("Error fetching transactions:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">Monthly Expenses and Earnings</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="earnings" fill="#82ca9d" name="Earnings" />
//           <Bar dataKey="expenses" fill="#8884d8" name="Expenses" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ExpenseEarningChart;


import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "../../axios";
import { useUser } from "../../UserContext";

const ExpenseEarningPieChart = ({month,year}) => {
  const [data, setData] = useState([]);
  const { user } = useUser();
  console.log(user?.username);
  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`/transactions/user/${user?.username}`,{ params: { month, year } }); // Replace with your endpoint `/transactions/user/${user.username}`
              console.log(response.data);
              const transactions = response.data;
            //   console.log(transactions);
              
              let totalEarnings = 0;
              let totalExpenses = 0;
              
        transactions.forEach((transaction) => {
          if (transaction.type === "income") {
            totalEarnings += transaction.amount;
          } else if (transaction.type === "expense") {
            totalExpenses += transaction.amount;
          }
        });

        console.log(totalEarnings);
        console.log(totalExpenses);
        

        setData([
          { name: "Earnings", value: totalEarnings },
          { name: "Expenses", value: totalExpenses },
        ]);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, [user,month,year]);

  const COLORS = ["#4CAF50", "#F44336"]; // Green for earnings, red for expenses

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Expense vs Earnings
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseEarningPieChart;
