/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MainContents from '../components/admin/main-content.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import api from '../services/api.ts';
import { useGlobalAlert } from '../contexts/AlertContext.tsx';
import AlertMessage from '../components/alerts/alert-message.tsx';

const AuthUserLayout: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, setUser } = useAuth();
    const { setGlobalAlert } = useGlobalAlert();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    const handleLogout = () => {
        try {
            const token = localStorage.getItem('accessToken');

            api.post('/auth/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            }).then((response) => {
                localStorage.removeItem('accessToken');

                setUser(null);
                setGlobalAlert("You have been logged out successfully", 'success');

                window.location.href = '/';
            }).catch((error) => {
                setAlertMessage('An error occurred. ' + error.response.data.message);
                setAlertType('error');
            });
        } catch (error) {
            setAlertMessage('An error occurred. Please try again later.');
            setAlertType('error');
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else if (user && !user.roles.includes('user')) {
            handleLogout();
        }
    }, [isAuthenticated, user, navigate, setUser]);

    return (
        <div className='bg-slate-50'>
            <div className="flex overflow-hidden px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Main Content */}
                <MainContents>
                    <Outlet />
                </MainContents>

                {/* Alert Message */}
                <AlertMessage message={alertMessage} type={alertType} />
            </div>
        </div>
    );
};

export default AuthUserLayout;