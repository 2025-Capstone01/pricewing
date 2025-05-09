import React from 'react';
import './Navbar.css';
import logo from '../assets/project_icon.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="PriceWing Logo" />
                <span className="logo-text">프라이스윙</span>
            </div>
        </nav>
    );
};

export default Navbar;
