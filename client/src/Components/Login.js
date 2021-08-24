import React from "react";

const Login = ({ url }) => {
  return (
    <React.Fragment>
      <section className="login">
        <a
          className="high-contrast-btn login-link"
          href={url}
          // href="https://aqueous-hollows-02149.herokuapp.com/auth/reddit"
        >
          Login
        </a>
      </section>
    </React.Fragment>
  );
};

export default Login;
