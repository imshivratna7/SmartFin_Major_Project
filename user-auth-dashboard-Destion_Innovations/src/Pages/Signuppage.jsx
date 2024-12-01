// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../axios';
// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validate = () => {
//     console.log("i am");
    
//     const newErrors = {};
//     if (!formData.username) newErrors.username = 'Username is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.password) newErrors.password = 'Password is required';
//     if (formData.password !== formData.confirmPassword)
//       newErrors.confirmPassword = 'Passwords must match';
//     return newErrors;
//   };

//   const handleSubmit =async (e) => {
//     e.preventDefault();
//     const uname = formData.username;
//     const pass = formData.password;
//     const mail = formData.email;
//     // console.log(formData.password);
//     // console.log(formData.confirmPassword);
    
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         uname,
//         mail,
//         pass,
//       });
//       alert('Signup successful! Please login.');
//       navigate('/login');
//     } catch (error) {
//       console.error('Signup failed:', error);
//       alert('Registration failed. Please try again.');
//     }

//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-red-100">
//       <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               className="mt-1 block w-full p-2 border rounded-md"
//               value={formData.username}
//               onChange={handleChange}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm">{errors.username}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="mt-1 block w-full p-2 border rounded-md"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm">{errors.email}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="mt-1 block w-full p-2 border rounded-md"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm">{errors.password}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               className="mt-1 block w-full p-2 border rounded-md"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//             />
//             {errors.confirmPassword && (
//               <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           >
//             Sign Up
//           </button>

//           <div className="mt-4 text-sm text-center">
//             Already have an account?{' '}
//             <Link to="/" className="text-blue-500 hover:underline">
//               Login here
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('/auth/register', {
          uname: formData.username,
          mail: formData.email,
          pass: formData.password,
        });
        alert('Signup successful! Please login.');
        navigate('/login');
      } catch (error) {
        console.error('Signup failed:', error);
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 px-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="hidden lg:block lg:w-1/2 bg-purple-700 rounded-l-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to Our Community!</h2>
          <p className="text-white text-lg">
            Join us today and start managing your account efficiently.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
