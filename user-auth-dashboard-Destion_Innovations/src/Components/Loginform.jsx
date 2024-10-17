// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../axios';
// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//       });
//       localStorage.setItem('token', response.data.token); // Store JWT token
//       alert('Login successful');
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Invalid email or password');
//     }

//     // Handle login logic
//     // const storedUser = JSON.parse(localStorage.getItem('user'));

//     // if (storedUser && storedUser.mail === email && storedUser.pass === password) {
//     //   alert('Login successful');
//     //   navigate('/dashboard');
//     // } else {
//     //   alert('Invalid email or password');
//     // }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-10 bg-white shadow-md rounded-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
//       <div className="mb-4">
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//           Email/Username
//         </label>
//         <input
//           type="text"
//           id="email"
//           className="mt-1 block w-full p-3 border rounded-md"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>
//       <div className="mb-6">
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           className="mt-1 block w-full p-3 border rounded-md"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md text-lg">
//         Login
//       </button>
//       <div className="mt-6 flex justify-between text-sm">
//         <a href="/signup" className="text-blue-500 hover:underline">
//           Forgot Password?
//         </a>
//         <a href="/signup" className="text-blue-500 hover:underline">
//           Sign Up
//         </a>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; // Adjust this if axios configuration file is elsewhere
import { useUser } from '../UserContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { loginUser } = useUser(); // To store user data in context after login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
      });
      // console.log(password);

      // Assuming the response contains a token and user details
      const { token, user } = response.data;

      // Store JWT token in localStorage for authorization in future API calls
      localStorage.setItem('token', token);

      // Store user information in the context
      console.log(user);
      
      loginUser({
        email: user.email,
        username: user.username,
      });

      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-10 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email/Username
        </label>
        <input
          type="text"
          id="email"
          className="mt-1 block w-full p-3 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full p-3 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className={`w-full bg-blue-500 text-white py-3 rounded-md text-lg ${loading ? 'opacity-50' : ''}`}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div className="mt-6 flex justify-between text-sm">
        <a href="/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </a>
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
