import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import Dashboard from './Dashboard';
import Welcome from './Welcome'


const Home = (props) => {
    const { isAuth, userName, setAuthData, setLoadingState, setUserData } = useContext(AuthContext);

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
            setLoadingState(true);
            if (response.status === 200) return response.json();
            throw new Error("Failed to authenticate user");
         })
         .then(responseJson => {
            setAuthData(true);
            setLoadingState(false);
            setUserData(responseJson.user);
         })
         .catch(error => {
            setAuthData(false);
            setUserData(null);
            setLoadingState(true);
            console.error(error);
         })
    }, []);
    
    return (
        <>
           {isAuth ? (
            <>
                <Dashboard />
            </>
           ) : (<Welcome />)}
        </>
    )
}

export default Home