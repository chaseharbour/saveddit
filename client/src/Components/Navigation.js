import React from 'react'
import { Link } from 'react-router-dom';

const Navigation = ({ authenticated, setAuthenticated }) => {



    const handleLogoutClick = () => {
        window.open("http://localhost:8081/auth/logout", "_self")
        setAuthenticated(false);
    }

    const handleLoginClick = () => {
        window.open("http://localhost:8081/auth/reddit", "_self")
    }

    const handleGetSubsClick = () => {
        window.open("http://localhost:8081/dashboard/", "_self")
    }
    
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            {authenticated ? (
                <>
                    <li onClick={handleLogoutClick}>Logout</li>
                    <li onClick={handleGetSubsClick}>Dashboard</li>
                </>
            ) : (
                <li onClick={handleLoginClick}>Login</li>
            )}
        </ul>
    )
}

export default Navigation
