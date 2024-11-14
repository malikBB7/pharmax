// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import Layout from './components/Layout';
import QualityControlPage from './pages/QualityControlPage';
import SafetyControlPage from './pages/SafetyControlPage';
import SolventRecovery from './pages/SolventRecovery';
import SafetyAlertPage from './pages/SafetyAlertPage';
import ProductionPage from './pages/ProductionPage';
import IndustryPage from './pages/IndustryPage';
import DataAnalyticsPage from './pages/DataAnalyticsPage';
import BatchProcessingPage from './pages/BatchProcessingPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem('user')));

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('user', 'true'); // Persist login status in localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user'); // Clear login status from localStorage
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={isAuthenticated ? <Layout><HomePage /></Layout> : <Navigate to="/login" />} />
        <Route path="/about-us" element={isAuthenticated ? <Layout><AboutUs /></Layout> : <Navigate to="/login" />} />
        <Route path="/contact-us" element={isAuthenticated ? <Layout><ContactUs /></Layout> : <Navigate to="/login" />} />
        <Route path="/quality-control" element={isAuthenticated ? <Layout><QualityControlPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/safety-control" element={isAuthenticated ? <Layout><SafetyControlPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/solvent-recovery" element={isAuthenticated ? <Layout><SolventRecovery /></Layout> : <Navigate to="/login" />} />
        <Route path="/safety-alert" element={isAuthenticated ? <Layout><SafetyAlertPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/production" element={isAuthenticated ? <Layout><ProductionPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/industry" element={isAuthenticated ? <Layout><IndustryPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/data-analytics" element={isAuthenticated ? <Layout><DataAnalyticsPage /></Layout> : <Navigate to="/login" />} />
        <Route path="/batch-processing" element={isAuthenticated ? <Layout><BatchProcessingPage /></Layout> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
