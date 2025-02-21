import React from 'react';
import Logo from './logo.tsx';

const SplashScreen: React.FC = () => {
    return (<div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-primary to-[#08201D]">
        <div className="flex items-center space-x-2">
            <Logo />
            <span className='font-bold uppercase leading-10 text-2xl bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent'>Lala Rental</span>
        </div>
    </div>);
}

export default SplashScreen;