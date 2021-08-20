import React from "react";

const Login = (props) => {
  return (
    <React.Fragment>
      <section className="login">
        <a
          className="high-contrast-btn login-link"
          href="http://localhost:8081/auth/reddit"
          // href="https://aqueous-hollows-02149.herokuapp.com/auth/reddit"
        >
          Login
        </a>
      </section>
    </React.Fragment>
  );
};

export default Login;
