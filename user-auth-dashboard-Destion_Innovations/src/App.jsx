import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/Signuppage';
import DashboardPage from './Pages/Dashboardpages';
import './index.css';
import Settings from './Components/Leftnavigation/Settings';
import Profile from './Components/Leftnavigation/Profile';
import SIPCalculator from './Components/Investment/sip-calculator';
import MyInvestments from './Components/Investment tracker/Investment_tracker';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/sip-calculator" element={<SIPCalculator />} />
        <Route path="/investment-tracker" element={<MyInvestments/>} />
      </Routes>
    </Router>
  );
};

export default App;
