/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import MainContents from '../components/admin/main-content.tsx';
import SideBar from '../components/admin/side-bar.tsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';

const AuthUserLayout: React.FC = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, setUser } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, user, navigate, setUser]);

    return (
        <div className='bg-slate-50'>
            <div className="flex overflow-hidden px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Side Base */}
                <SideBar />

                {/* Main Content */}
                <MainContents>
                    <Outlet />
                </MainContents>
            </div>
        </div>
    );
};

export default AuthUserLayout;