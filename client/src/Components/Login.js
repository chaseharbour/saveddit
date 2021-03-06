import React from 'react';

const Login = (props) => {
    return (
        <React.Fragment>
            <section id='login'>
                <h2>Log In</h2>
                <p>Click the link to sign in through Reddit.</p>
                <a href='http://localhost:8081/auth/reddit'>Send me to Reddit!</a>
            </section>
        </React.Fragment>
    )
};

export default Login;