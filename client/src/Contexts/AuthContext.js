import React, { useState, createContext } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [userName, setUserName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const setAuthData = (bool) => {
        setIsAuth(bool);
    };

    const setLoadingState = (bool) => {
        setIsLoading(bool);
    };

    const setUserData = (data) => {
        setUserName(data);
    };

    return (
        <AuthContext.Provider value={{ isAuth, userName, isLoading, setAuthData, setLoadingState, setUserData }}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;