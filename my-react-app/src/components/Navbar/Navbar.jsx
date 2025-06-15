import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">
                <img src="logo.png" alt="Logo" className="nav-logo" />
            </Link>
            
            <div className="nav-right">
                {user ? (
                    <>
                        {user.user_type === 'host' ? (
                            <Link to="/host-dashboard" className="nav-link">Host Dashboard</Link>
                        ) : (
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        )}
                        <button onClick={logout} className="nav-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-button">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;