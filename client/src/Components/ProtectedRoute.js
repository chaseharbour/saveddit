import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

 

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuth, isLoading } = useContext(AuthContext);
   
    return (
    <Route {...rest} render={() => 
        isAuth ? (
            <Component />
            ) : isLoading ? (
                <> Loading... </>
            ) : (
            <Redirect to='/login' /> 
            )
    } />

    // return authenticated ? (    
    //     <Component />
    // ) : (
    //     <Redirect to={{ pathname: '/login'}} />
    // );
)
}

export default ProtectedRoute
