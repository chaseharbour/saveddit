import React, { useState, useEffect, createContext } from 'react'
import Navigation from './Navigation';
import Post from './Post';

//TODO: Create routing 
//Fetch data from backend

const Welcome = (props) => {
    const [user, setUser] = useState([]);
    const [authError, setAuthError] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

     useEffect(() => {
         
         fetch("http://localhost:8081/auth/login/success", {
             method: "GET",
             credentials: "include",
             headers: {
                 Accept: "application/json",
                 "Content-type": "application/json",
                 "Access-Control-Allow-Credentials": true
             }
         }).then(response => {
             console.log(response);
             if (response.status === 200) return response.json();
             throw new Error("Failed to authenticate user");
         })
         .then(responseJson => {
             setAuthenticated(true);
             setUser(responseJson.user);
         })
         .catch(error => {
             setAuthenticated(false);
             setAuthError('Failed to authenticate user');
             console.error(error);
         })
     }, [])


    return (
        <div>
            <Navigation 
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
            />
            {!authenticated ? (
                <h1>Welcome!</h1>
            ) : (
                <div>
                    <h1>You have logged in successfully!</h1>
                    <h2>Welcome {user}</h2>
                </div>
            )}
        </div>
    )
}

export default Welcome
