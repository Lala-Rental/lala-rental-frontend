import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Utilities
import { useAuth } from '../../contexts/AuthContext.tsx';
import { Link } from 'react-router-dom';
import OAuth from '../../components/oauth/oauth.tsx';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) navigate('/user/dashboard');
    }, [isAuthenticated, navigate]);

    return (
        <section className="bg-white">
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Access Your Bookings In one click and experience more.</h2>
                        <p className="mt-2 text-base text-gray-600">Don’t have an account? <Link to="/signup" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">Create a free account</Link></p>

                        {/* Continue with oauth */}
                        <OAuth data={{ role: 'RENTER' }} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
