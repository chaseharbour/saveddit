import React from "react";
import Login from "./Login";

//TODO: Create routing
//Fetch data from backend

const Welcome = (props) => {
  return (
    <React.Fragment>
      <header className="welcome">
        <h1 className="welcome-header_text">Welcome!</h1>
        <p className="welcome-description_text">
          This app uses the Reddit API to quickly consolidate and display all
          images saved to your account. To begin using this app, log in through
          Reddit below. Don't worry, we wont have access to your Reddit
          password.
        </p>
      </header>
      <Login />
    </React.Fragment>
  );
};

export default Welcome;
