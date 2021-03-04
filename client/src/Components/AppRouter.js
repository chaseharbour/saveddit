import React, { useState, useEffect } from 'react';
import Welcome from './Welcome';
import Dashboard from './Dashbaord';
import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from 'axios';
import Navigation from './Navigation';

const AppRouter = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // const getAuthState = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8081/auth/login/success')
    //         console.log(response);
    //         setAuthenticated(true);
    //         setUser(response.user);
    //         return response;
    //     } catch (error) {
    //         console.log(error);
    //         setAuthenticated(false);
    //         setUser(null);
    //         throw new Error('User not authenticated.');
    //     }
    // }

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
             if (response.status === 200) return response.json();
             throw new Error("Failed to authenticate user");
         })
         .then(responseJson => {
             setAuthenticated(true);
             setUser(responseJson.user);
         })
         .catch(error => {
             setAuthenticated(false);
             console.error(error);
         })
    }, []);

    return (
        <Router>
            <Navigation authenticated={authenticated} setAuthenticated={setAuthenticated}/>
            <Switch>
                <Route exact path="/login" component={Welcome}/>
                <ProtectedRoute path="/" component={Dashboard} authenticated={authenticated}/>
            </Switch>
        </Router>
    )
}

export default AppRouter
