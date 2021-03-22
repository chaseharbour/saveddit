import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const Navigation = () => {
  const { isAuth, setAuthData, setLoadingState } = useContext(AuthContext);

  const handleLogoutClick = () => {
    window.open(
      "https://aqueous-hollows-02149.herokuapp.com/auth/logout",
      "_self"
    );
    setAuthData(false);
  };

  const handleLoginClick = () => {
    window.open(
      "https://aqueous-hollows-02149.herokuapp.com/auth/reddit",
      "_self"
    );
    setLoadingState(true);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* <li className="home nav-btn navbar-list_item">
                    <Link to="/">Home</Link>
                </li> */}
        {isAuth ? (
          <>
            <li
              className="high-contrast-btn navbar-list_item"
              onClick={handleLogoutClick}
            >
              Logout
            </li>
          </>
        ) : (
          <li
            className="high-contrast-btn navbar-list_item"
            onClick={handleLoginClick}
          >
            Login
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
