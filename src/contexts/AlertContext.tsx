import React, { createContext, useContext, useState } from 'react';

interface AlertContextProps {
    alertMessage: string;
    alertType: 'success' | 'error';
    setGlobalAlert: (message: string, type: 'success' | 'error') => void;
}

interface AlertProviderProps {
    children: React.ReactNode;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    const setGlobalAlert = (message: string, type: 'success' | 'error') => {
        setAlertMessage(message);
        setAlertType(type);
        
        setTimeout(() => {
            setAlertMessage('');
        }, 5000);
    };

    return (
        <AlertContext.Provider value={{ alertMessage, alertType, setGlobalAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useGlobalAlert = () => {
    const context = useContext(AlertContext);

    if (!context) 
        throw new Error('useGlobalAlert must be used within an AlertProvider');
    
    return context;
};