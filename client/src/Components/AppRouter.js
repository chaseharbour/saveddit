import React, { useState, useEffect } from 'react';
import Welcome from './Welcome';
import Dashbaord from './Dashbaord';
import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from './Navigation';
import Login from './Login';

const AppRouter = () => {
    return (
        <Router>
            <Navigation />           
            <Switch>
                <ProtectedRoute path="/dashboard" component={Dashbaord} />
                <Route exact path="/" component={Welcome} />

                <Route exact path="/login" component={Login} />
            </Switch>
        </Router>
    )
}

export default AppRouter
