import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';

interface RoleProtectedRouteProps {
    allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user && allowedRoles.includes('GUEST')) {
        return <Outlet />;
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default RoleProtectedRoute;