import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

const Navigation = () => {

    const { isAuth, setAuthData, setLoadingState } = useContext(AuthContext);

    const handleLogoutClick = () => {
        window.open("http://localhost:8081/auth/logout", "_self")
        setAuthData(false);
    }

    const handleLoginClick = () => {
        window.open("http://localhost:8081/auth/reddit", "_self")
        setLoadingState(true);
    }
    
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {/* <li className="home nav-btn navbar-list_item">
                    <Link to="/">Home</Link>
                </li> */}
                {isAuth ? (
                    <>
                        <li className="login nav-btn navbar-list_item" onClick={handleLogoutClick}>Logout</li>
                    </>
                ) : (
                    <li className="logout nav-btn navbar-list_item" onClick={handleLoginClick}>Login</li>
                )}
            </ul>
        </nav>
    )
}

export default Navigation
