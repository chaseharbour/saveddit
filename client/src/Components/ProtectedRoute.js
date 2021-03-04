import React, { useEffect, useState, createContext } from 'react'
import { Redirect } from 'react-router-dom';
import Dashbaord from './Dashbaord';
import Navigation from './Navigation';
import axios from 'axios';

const ProtectedRoute = ({ component, authenticated }) => {
    const Component = component;
    console.log(component);

    return authenticated ? (    
        <Component />
    ) : (
        <Redirect to={{ pathname: '/login'}} />
    );
}

export default ProtectedRoute
