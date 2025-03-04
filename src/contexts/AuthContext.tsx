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

    const fetchUserProfile = async (accessToken: string) => {
        try {
            const response = await api.get('/auth/user', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json',
                },
            });

            const userData = response?.data as { data: any };
            
            setToken(accessToken);
            setUser(userData.data);
            setIsAuthenticated(true);
        } catch (error) {
            setGlobalAlert("Your session has expired. Please log in again.", 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('lala-rental-token');
        
        if (accessToken) {
            fetchUserProfile(accessToken);
        } else {
            setLoading(false);
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