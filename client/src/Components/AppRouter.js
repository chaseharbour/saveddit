import React, { useState, useEffect } from "react";
import Welcome from "./Home";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Login from "./Login";

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
