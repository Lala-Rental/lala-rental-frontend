import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Utilities
import { useAuth } from '../../contexts/AuthContext.tsx';
import OAuth from '../../components/oauth/oauth.tsx';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const handleSuccess = (response: any) => navigate('/user/dashboard');

    useEffect(() => {
        if (isAuthenticated) navigate('/user/dashboard');
    }, [isAuthenticated, navigate]);

    return (
        <section className="bg-primary min-h-[50vh]">
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                    <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-2xl lg:text-3xl bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent">Welcome Back!</h2>
                            <p className="max-w-xl mx-auto mt-4 leading-relaxed text-white">Login to your account</p>
                        </div>

                        {/* Continue with oauth */}
                        <OAuth data={{ role: 'RENTER' }} onSuccess={handleSuccess} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
