import React, { useEffect, forwardRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QualityControlIcon from '../assets/QualityControl.png';
import SafetyControlIcon from '../assets/SafetyControl.png';
import SolventRecoveryIcon from '../assets/SolventRecovery.png';
import SafetyAlertIcon from '../assets/SafetyAlert.png';
import ProductionIcon from '../assets/Production.png';
import IndustryIcon from '../assets/Industry.png';
import DataAnalyticsIcon from '../assets/DataAnalytics.png';
import BatchProcessingIcon from '../assets/BatchProcessing.png';
import './Sidebar.css'; // Ensure this path is correct

const Sidebar = forwardRef(({ isOpen, onClose }, ref) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear login status
        navigate('/login'); // Redirect to login page
    };

    const handleOutsideClick = useCallback((e) => {
        if (ref.current && e.target.classList.contains('sidebar')) {
            onClose(); // Close sidebar if clicking outside
        }
    }, [onClose, ref]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen, handleOutsideClick]);

    return (
        <div ref={ref} className={`sidebar ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <button className="close-button" onClick={onClose}>X</button>
            <ul>
                <li>
                    <Link to="/quality-control">
                        <img src={QualityControlIcon} alt="Quality Control" className="sidebar-icon" />
                        Quality Control
                    </Link>
                </li>
                <li>
                    <Link to="/safety-control">
                        <img src={SafetyControlIcon} alt="Safety Control" className="sidebar-icon" />
                        Safety Control
                    </Link>
                </li>
                <li>
                    <Link to="/solvent-recovery">
                        <img src={SolventRecoveryIcon} alt="Solvent Recovery" className="sidebar-icon" />
                        Solvent Recovery
                    </Link>
                </li>
                <li>
                    <Link to="/safety-alert">
                        <img src={SafetyAlertIcon} alt="Safety Alert" className="sidebar-icon" />
                        Safety Alert
                    </Link>
                </li>
                <li>
                    <Link to="/production">
                        <img src={ProductionIcon} alt="Production" className="sidebar-icon" />
                        Production
                    </Link>
                </li>
                <li>
                    <Link to="/industry">
                        <img src={IndustryIcon} alt="Industry" className="sidebar-icon" />
                        Industry
                    </Link>
                </li>
                <li>
                    <Link to="/data-analytics">
                        <img src={DataAnalyticsIcon} alt="Data Analytics" className="sidebar-icon" />
                        Data Analytics
                    </Link>
                </li>
                <li>
                    <Link to="/batch-processing">
                        <img src={BatchProcessingIcon} alt="Batch Processing" className="sidebar-icon" />
                        Batch Processing
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </li>
            </ul>
        </div>
    );
});

export default Sidebar;
