import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h1 className="navbar-title">📚 Library Management</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>

        </nav>
    );
};

export default Navbar;