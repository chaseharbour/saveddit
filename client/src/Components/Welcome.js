import React from "react";
import Login from "./Login";

//TODO: Create routing
//Fetch data from backend

const Welcome = (props) => {
  const envUrl = process.env.REACT_APP_LOGIN;
  console.log(envUrl);
  return (
    <React.Fragment>
      <section className="welcome">
        <h1 className="welcome-header_text">All of your saved images</h1>
        <h2 className="welcome-subhead">in one convenient place</h2>
        <p className="welcome-description_text">
          Log in through Reddit and we’ll take care of the rest. You will be
          able to scroll through all images saved to your Reddit account to your
          heart’s content.
        </p>
        <Login url={envUrl} />
      </section>
    </React.Fragment>
  );
};

export default Welcome;
