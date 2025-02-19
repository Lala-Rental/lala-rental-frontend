import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Utils
import ProtectedRoute from '../utils/ProtectedRoute.tsx';

// Layouts
import AppLayout from '../layouts/app.tsx';
import AuthUserLayout from '../layouts/user.tsx';
import AuthAdminLayout from '../layouts/admin.tsx';
import Logo from "../components/logo.tsx";

// Pages
const Home = lazy(() => import('../pages/home.tsx'));
const Login = lazy(() => import('../pages/auth/login.tsx'));
const UserDashboard = lazy(() => import('../pages/user/dashboard.tsx'));
const Users = lazy(() => import('../pages/admin/users.tsx'));
const NotFound = lazy(() => import('../pages/not-found.tsx'));
const CustomSupport = lazy(() => import('../pages/privacy/custom-support.tsx'));
const PrivacyPolicy = lazy(() => import('../pages/privacy/privacy-policy.tsx'));
const TermsAndConditions = lazy(() => import('../pages/privacy/terms-and-conditions.tsx'));
const Listings = lazy(() => import('../pages/listings.tsx'));
const AdminDashboard = lazy(() => import('../pages/admin/dashboard.tsx'));
const QuickPost = lazy(() => import('../pages/quick-post.tsx'));
const CardDetails = lazy(() => import('../pages/card-details.tsx'));

// Fallback Loader Component
const Loading = () => {
    return (<div className="h-screen w-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
            <Logo />
            <span className='font-bold capitalize leading-10 text-xl'>Lala Rental</span>
        </div>
    </div>);
};

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Router>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />

                        <Route path='become-host' element={<QuickPost />} />
                        <Route path="listings" element={<Listings />} />
                        <Route path='cars/:id' element={<CardDetails />} />

                        {/* Authentication Routes */}
                        <Route path="login" element={<Login />} />

                        {/* Dashboard Routes */}
                        <Route path="/" element={<ProtectedRoute />}>
                            {/* User Dashboard */}
                            <Route path="/user" element={<AuthUserLayout />}>
                                <Route path="dashboard" element={<UserDashboard />} />
                            </Route>

                            {/* Administration Dashboard */}
                            <Route path="/admin" element={<AuthAdminLayout />}>
                                <Route path="dashboard" element={<AdminDashboard />} />
                                <Route path="users" element={<Users />} />
                            </Route>
                        </Route>

                        {/* Privacy Policy Pages */}
                        <Route path="privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="custom-support" element={<CustomSupport />} />
                        <Route path="terms-and-conditions" element={<TermsAndConditions />} />

                        {/* NotFound Route */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </Suspense>
    );
}

export default AppRoutes;