/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.ts';
import { useGlobalAlert } from './AlertContext.tsx';

interface AuthContextProps {
    user: any;
    isAuthenticated: boolean;
    loading: boolean;
    setUser: (user: any) => void;
    token: string | null;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const { setGlobalAlert } = useGlobalAlert();
    const [loading, setLoading] = useState(true);

    const fetchUserProfile = (accessToken: string) => {
        try {
            api.get('/user/profile', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json',
                },
            }).then((response) => {
                setToken(accessToken);
                setUser((response.data as { data: any }).data);
                setIsAuthenticated(true);
                setLoading(false);
            }).catch((error) => {
                setGlobalAlert("Your session has expired. Please log in again.", 'error');
                setLoading(false);
            });
        } catch (error) {
            setGlobalAlert("Unable to fetch User profile", 'error');
            setLoading(false);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            fetchUserProfile(accessToken);
            return;
        } else {
            setLoading(false);
            return;
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, token, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) 
        throw new Error('useAuth must be used within an AuthProvider');
    
    return context;
};