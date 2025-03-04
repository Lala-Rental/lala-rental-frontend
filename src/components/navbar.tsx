import React, { lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import { NavLink } from 'react-router-dom';
import LogoutModal from './auth/logout-modal.tsx';

const Logo = lazy(() => import("./logo.tsx"));

const NavBar: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const [responsiveNavOpen, setResponsiveNavOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const openResponsiveNav = () => setResponsiveNavOpen(!responsiveNavOpen);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-primary lg:pb-0">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link to="/" title="" className="flex items-center space-x-2">
                            <Logo />
                            <span className="font-bold text-xl capitalize leading-10 bg-gradient-to-r from-green-300 to-white bg-clip-text text-transparent">Lala Rental</span>
                        </Link>
                    </div>

                    <button onClick={openResponsiveNav} type="button" className="inline-flex p-2 text-black my-4 transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                        <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                        </svg>
                        <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10 overflow-hidden h-15 lg:h-20">
                        <NavLink to="/" className={({ isActive }) => `text-base relative font-medium text-white transition-all duration-200 hover:text-white focus:text-white flex items-center`}>
                            {({ isActive }) => (
                                <>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path opacity=".34" d="M12 18v-3" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M10.07 2.82 3.14 8.37c-.78.62-1.28 1.93-1.11 2.91l1.33 7.96c.24 1.42 1.6 2.57 3.04 2.57h11.2c1.43 0 2.8-1.16 3.04-2.57l1.33-7.96c.16-.98-.34-2.29-1.11-2.91l-6.93-5.54c-1.07-.86-2.8-.86-3.86-.01Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </span>
                                    <span className="ml-2 capitalize font-bold">Home</span>
                                    {isActive && <div className="absolute w-full bg-primary h-10 -bottom-[63px] rounded-[10px] right-0 left-0" />}
                                </>
                            )}
                        </NavLink>

                        {!isAuthenticated && ( 
                            <NavLink to="/login" className={({ isActive }) => `text-base relative font-medium text-white transition-all duration-200 hover:text-white focus:text-white flex items-center`}>{({ isActive }) => (
                                <>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </span>
                                    <span className='ml-2 capitalize font-bold'>Login</span>
                                    {isActive && <div className="absolute w-full bg-primary h-10 -bottom-[63px] rounded-[10px] right-0 left-0" />}
                                </>)}
                            </NavLink> 
                        )}
                    </div>

                    <div className='hidden md:block ml-7'>
                        <div className='flex items-center'>
                            <Link to="/listings" className="inline-flex h-11 text-white w-full items-center justify-center text-sm rounded-full bg-transparent ring-slate-400 ring-1 px-5 font-medium tracking-wide shadow-none outline-none transition duration-200 hover:bg-secondary/80 focus:ring sm:w-auto">
                                <span className='mr-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M2 22h20" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.95 22.001 3 9.971c0-.61.29-1.19.77-1.57l7-5.45c.72-.56 1.73-.56 2.46 0l7 5.44c.49.38.77.96.77 1.58v12.03" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" stroke-linejoin="round"></path><path opacity=".4" d="M15.5 11h-7c-.83 0-1.5.67-1.5 1.5V22h10v-9.5c0-.83-.67-1.5-1.5-1.5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 16.25v1.5" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path opacity=".4" d="M10.5 7.5h3" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                                <span className='capitalize font-bold'>Rent Now</span>
                            </Link>

                            {!isAuthenticated && (
                                <Link to="/become-host" className="inline-flex h-11 w-full items-center justify-center text-sm ml-2 rounded-full bg-white px-5 font-medium tracking-wide text-slate-700 shadow-none outline-none transition duration-200 hover:bg-secondary focus:ring sm:w-auto">
                                    <span className='capitalize font-bold'>Host Now</span>
                                    <span className='ml-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path stroke="#03783d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.43 5.93L20.5 12l-6.07 6.07"></path><path stroke="#03783d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.5 12h16.83" opacity=".4"></path></svg></span>
                                </Link>
                            )}
                            {isAuthenticated && user?.role === 'HOST' && (
                                <Link to="/become-host" className="inline-flex h-11 w-full items-center justify-center text-sm ml-2 rounded-full bg-white px-5 font-medium tracking-wide text-slate-700 shadow-none outline-none transition duration-200 hover:bg-secondary focus:ring sm:w-auto">
                                    <span className='capitalize font-bold'>Host Now</span>
                                    <span className='ml-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path stroke="#03783d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.43 5.93L20.5 12l-6.07 6.07"></path><path stroke="#03783d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.5 12h16.83" opacity=".4"></path></svg></span>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className='ml-3 hidden md:block'>
                        {(isAuthenticated && user) && (
                            <nav className="relative cursor-pointer">
                                <div className="text-base font-medium text-black transition-all duration-200 hover:text-white focus:text-white flex items-center">
                                    <div className="flex items-center gap-4 border border-gray-200 h-11 w-full justify-center text-sm ml-2 rounded-full bg-secondary px-5 font-medium tracking-wide text-slate-700 shadow-none outline-none transition duration-200 hover:bg-secondary focus:ring sm:w-auto">
                                        <Link to={user.role === 'RENTER' ? "/user/bookings" : "/user/dashboard"} title=""> <img className="w-8 h-8 rounded-full object-cover" src={user.avatar ? user.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt={user.name} /></Link>
                                        <span onClick={toggleDropdown}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path stroke="#697689" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path stroke="#697689" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.47 10.74L12 14.26l3.53-3.52" opacity=".4"></path></svg></span>
                                    </div>
                                </div>
                    
                                {isDropdownOpen && (
                                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-auto">
                                        <div className="flex items-center gap-4 px-3 py-4">
                                            <img className="w-10 h-10 rounded-full object-cover" src={user.avatar ? user.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt={user.name} />
                                            <div className="font-medium dark:text-white">
                                                <div className='text-slate-700 capitalize'>{user.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                        <Link to={user.role === 'RENTER' ? "/user/bookings" : "/user/dashboard"} title="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                                        <LogoutModal />
                                    </div>
                                )}
                            </nav>
                        )}
                    </div>
                </nav>

                {responsiveNavOpen && <nav className="pt-4 pb-6 mb-5 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
                    <div className="flow-root">
                        <div className="flex flex-col px-6 -my-2 space-y-1">
                            <NavLink to="/" title="" className="inline-flex py-2 relative text-base font-medium text-black transition-all duration-200 hover:text-white focus:text-white">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>

                                </span>
                                <span className='ml-2 capitalize font-bold'>
                                    Home
                                </span>
                            </NavLink>
                            
                            {!isAuthenticated && (
                                <NavLink to="/login" title="" className="text-base mt-20 relative font-medium text-black transition-all duration-200 hover:text-white focus:text-white flex items-center">
                                    {({ isActive }) => (
                                        <>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path stroke="#697689" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.9 7.56c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99"></path><g opacity=".4"><path stroke="#697689" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2 12h12.88M12.65 8.65L16 12l-3.35 3.35"></path></g></svg>
                                            </span>
                                            <span className='ml-2 capitalize font-bold'>Login</span>
                                            {isActive && <div className="absolute w-full bg-primary h-10 -bottom-[63px] rounded-[10px] right-0 left-0" />}
                                        </>)}
                                </NavLink>
                            )}

                            {isAuthenticated && user && (<LogoutModal />)}

                            {isAuthenticated && user && (
                                <Link to="/user/dashboard" title="" className="text-base font-medium mt-10 text-black transition-all duration-200 hover:text-white focus:text-white flex items-center">
                                    <div className="flex items-center gap-4">
                                        <img className="w-10 h-10 rounded-full object-cover" src={user.avatar ? user.avatar : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt={user.name} />
                                        <div className="font-medium dark:text-white">
                                            <div className='text-slate-700 capitalize'>{user.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>

                        <div className='flex items-center px-3 mt-10'>
                            <Link to="/listings" className="inline-flex border border-gray-200 h-11 w-full items-center justify-center text-sm rounded-full bg-secondary px-5 font-medium tracking-wide text-slate-700 shadow-none outline-none transition duration-200 hover:bg-secondary/80 focus:ring sm:w-auto">
                                <span className='mr-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15.51 2.828H8.49c-2.49 0-3.04 1.24-3.36 2.76L4 10.998h16l-1.13-5.41c-.32-1.52-.87-2.76-3.36-2.76ZM21.989 19.82c.11 1.17-.83 2.18-2.03 2.18h-1.88c-1.08 0-1.23-.46-1.42-1.03l-.2-.6c-.28-.82-.46-1.37-1.9-1.37h-5.12c-1.44 0-1.65.62-1.9 1.37l-.2.6c-.19.57-.34 1.03-1.42 1.03h-1.88c-1.2 0-2.14-1.01-2.03-2.18l.56-6.09c.14-1.5.43-2.73 3.05-2.73h12.76c2.62 0 2.91 1.23 3.05 2.73l.56 6.09ZM4 8H3M21 8h-1" stroke="#03783d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#03783d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v2M10.5 5h3"></path></g><path opacity=".4" d="M6 15h3M15 15h3" stroke="#03783d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                <span className='uppercase'>Book Now</span>
                            </Link>
                            <Link to="/become-host" className="inline-flex h-11 w-full items-center justify-center text-sm ml-2 rounded-full bg-primary px-5 font-medium tracking-wide text-white shadow-none outline-none transition duration-200 hover:bg-primary focus:ring sm:w-auto">
                                <span className='uppercase'>Rent Now</span>
                                <span className='ml-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M14.43 5.93L20.5 12l-6.07 6.07"></path><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M3.5 12h16.83" opacity=".4"></path></svg></span>
                            </Link>
                        </div>
                    </div>
                </nav>}
            </div>
        </header>
    );
};

export default NavBar;
