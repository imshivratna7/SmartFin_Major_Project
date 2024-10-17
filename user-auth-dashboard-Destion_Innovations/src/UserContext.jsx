// // UserContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create the context
// const UserContext = createContext();

// // Custom hook to use the UserContext
// export const useUser = () => useContext(UserContext);

// // Context provider component
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Function to store user data after login
//   const loginUser = (userData) => {
//     console.log(userData);
    
//     setUser(userData);
    
//     console.log(user);
//     localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
//   };

//   // Function to logout user
//   const logoutUser = () => {
//     setUser(null);
//     localStorage.removeItem('user'); // Remove user data from localStorage
//     localStorage.removeItem('token'); // Remove JWT token if stored
//   };

//   // Load user data from localStorage when the component mounts
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, loginUser, logoutUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data from localStorage if it exists
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData) => {
    // Save user data to state and localStorage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Clear user data from state and localStorage
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
