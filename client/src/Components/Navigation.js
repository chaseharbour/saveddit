import React, { useContext } from "react";
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

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* <li className="home nav-btn navbar-list_item">
                    <Link to="/">Home</Link>
                </li> */}
        {isAuth ? (
          <>
            <h1 className="navbar-title">Saveddit</h1>
            <li
              className="high-contrast-btn-sm navbar-list_item"
              onClick={handleLogoutClick}
            >
              Sign out
            </li>
          </>
        ) : (
          <h1 className="navbar-title">Saveddit</h1>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
