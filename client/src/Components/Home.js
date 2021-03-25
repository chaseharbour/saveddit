import React, { useEffect, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Dashboard from "./Dashboard";
import Welcome from "./Welcome";

const Home = (props) => {
  const {
    isAuth,
    userName,
    setAuthData,
    setLoadingState,
    setUserData,
  } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://aqueous-hollows-02149.herokuapp.com/auth/login/success", {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoadingState(true);
        if (response.status === 200) return response.json();
        throw new Error("Failed to authenticate user");
      })
      .then((responseJson) => {
        setAuthData(true);
        setLoadingState(false);
        setUserData(responseJson.user);
      })
      .catch((error) => {
        setAuthData(false);
        setUserData(null);
        setLoadingState(true);
        console.error(error);
      });
  }, []);

  return (
    <>
      {isAuth ? (
        <>
          <Dashboard />
        </>
      ) : (
        <Welcome />
      )}
    </>
  );
};

export default Home;
