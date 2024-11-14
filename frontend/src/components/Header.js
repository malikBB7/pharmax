import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../assets/Logo.png';

const Header = ({ onToggleSidebar }) => {
    const [showEmailDropdown, setShowEmailDropdown] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [showTooltip, setShowTooltip] = useState(false); // State to handle tooltip visibility

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        setUserEmail(email || '');
    }, []);

    const handleUserIconClick = () => {
        setShowEmailDropdown((prev) => !prev);
    };

    const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : '?';

    return (
        <header className="header">
            <div className="hamburger" onClick={onToggleSidebar}>
                &#9776;
            </div>

            <nav className="navigation">
                <div 
                    className="logo-container"
                    onMouseEnter={() => setShowTooltip(true)} // Show tooltip on hover
                    onMouseLeave={() => setShowTooltip(false)} // Hide tooltip when not hovering
                >
                    <img src={Logo} alt="Logo" className="logo" />
                    {showTooltip && <div className="tooltip">PHARMA</div>} {/* Tooltip element */}
                </div>

                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                </ul>
            </nav>

            <div className="user-icon" onClick={handleUserIconClick}>
                {userInitial}
            </div>

            {showEmailDropdown && (
                <div className="email-dropdown">
                    <p>{userEmail}</p>
                    <Link to="/settings" className="settings-link">Settings</Link>
                </div>
            )}
        </header>
    );
};

export default Header;
