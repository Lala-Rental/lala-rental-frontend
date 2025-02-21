import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Utils
import ProtectedRoute from '../utils/ProtectedRoute.tsx';

// Layouts
import AppLayout from '../layouts/app.tsx';
import AuthUserLayout from '../layouts/user.tsx';
import SplashScreen from "../components/splash-screen.tsx";
import RoleProtectedRoute from "../utils/RoleProtectedRoute.tsx";

// Pages
const Home = lazy(() => import('../pages/home.tsx'));
const Login = lazy(() => import('../pages/auth/login.tsx'));
const UserDashboard = lazy(() => import('../pages/auth/dashboard.tsx'));
const UserBookings = lazy(() => import('../pages/auth/bookings.tsx'));
const NotFound = lazy(() => import('../pages/not-found.tsx'));
const CustomSupport = lazy(() => import('../pages/privacy/custom-support.tsx'));
const PrivacyPolicy = lazy(() => import('../pages/privacy/privacy-policy.tsx'));
const TermsAndConditions = lazy(() => import('../pages/privacy/terms-and-conditions.tsx'));
const Listings = lazy(() => import('../pages/listings.tsx'));
const BecomeHost = lazy(() => import('../pages/become-host.tsx'));
const CardDetails = lazy(() => import('../pages/card-details.tsx'));

// Fallback Loader Component
const Loading = () => {
    return (<SplashScreen />);
};

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Router>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="listings" element={<Listings />} />
                        <Route path='properties/:id' element={<CardDetails />} />

                        {/* Become Host */}
                        <Route element={<RoleProtectedRoute allowedRoles={['GUEST', 'HOST']} />}>
                            <Route path='become-host' element={<BecomeHost />} />
                        </Route>

                        {/* Authentication Routes */}
                        <Route path="login" element={<Login />} />

                        {/* Dashboard Routes */}
                        <Route path="/" element={<ProtectedRoute />}>
                            {/* User Dashboard */}
                            <Route path="/user" element={<AuthUserLayout />}>
                                <Route element={<RoleProtectedRoute allowedRoles={['HOST']} />}>
                                    <Route path="dashboard" element={<UserDashboard />} />
                                </Route>

                                <Route element={<RoleProtectedRoute allowedRoles={['RENTER', 'HOST']} />}>
                                    <Route path="bookings" element={<UserBookings />} />
                                </Route>
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