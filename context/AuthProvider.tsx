// // AuthProvider.tsx

import React, { createContext, useContext, useState } from 'react';

type AuthData = {
    token: string | null;
    role: string | null;
};

type AuthContextType = {
    authData: AuthData;
    setAuthData: (data: AuthData) => void;
    clearAuthData: () => void;
};

export const AuthContext = createContext<AuthContextType>({ 
    authData: { token: null, role: null },
    setAuthData: () => {},
    clearAuthData: () => {},});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }: any) => {

    const [authData, setAuthDataState] = useState<AuthData>({ token: null, role: null });

    const setAuthData = (data: AuthData) => {
        setAuthDataState(data);
    };

    const clearAuthData = () => {
        setAuthDataState({ token: null, role: null });
    };

    const value = { authData, setAuthData, clearAuthData };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>;
};
