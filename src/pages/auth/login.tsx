import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Utilities
import { useAuth } from '../../contexts/AuthContext.tsx';
import OAuth from '../../components/oauth/oauth.tsx';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const handleSuccess = (response: any) => window.location.reload();

    useEffect(() => {
        if (isAuthenticated) navigate('/user/dashboard');
    }, [isAuthenticated, navigate]);

    return (
        <section className="bg-primary min-h-screen flex items-center justify-center">
            <div className="flex items-center justify-center w-full px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                <div className="w-full max-w-2xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold leading-tight text-black sm:text-5xl lg:text-6xl bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent">Welcome Back!</h2>
                    </div>

                    {/* Continue with oauth */}
                    <div className="mt-8">
                        <OAuth data={{ role: 'RENTER' }} onSuccess={handleSuccess} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
