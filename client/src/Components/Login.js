import React from "react";

const Login = (props) => {
  return (
    <React.Fragment>
      <section className="login">
        <h2 className="login-header">Log In</h2>
        <p className="login-description">
          Click the link to sign in through Reddit.
        </p>
        <a
          className="high-contrast-btn login-link"
          href="http://165.232.156.48:8081/auth/reddit"
        >
          Login
        </a>
      </section>
    </React.Fragment>
  );
};

export default Login;
