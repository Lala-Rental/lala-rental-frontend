import React, { useState } from 'react';
import FetchLoader from '../../loaders/fetching-loader.tsx';

interface HeroProps {
    onLoading?: Boolean;
    onChange?: (query: any) => void;
}

const Hero: React.FC<HeroProps> = ({ onLoading, onChange }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onChange) onChange({ query: searchQuery });
    };

    const handleSearch = () => {
        if (onChange) onChange({ query: searchQuery });
    };

    return (
        <section className="relative bg-gradient-to-br bg-white text-white overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://wallpapers.com/images/hd/real-estate-tropical-mansion-20c9os156eqcqd4j.jpg)' }}></div>
            
            <div className="relative px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
                
                <div className="flex flex-col md:flex-row items-center justify-between md:px-10">
                    <div className="w-full sm:w-full mb-12 md:mb-0 bg-white rounded-3xl p-10">
                        <div className="mb-16 text-center lg:mb-0 lg:max-w-lg lg:text-left">
                            <div className="mb-6 max-w-xl">
                                <div>
                                    <p className="bg-teal-accent-400 mb-4 inline-block rounded-full bg-green-100 px-3 py-1 border border-gray-200 text-sm font-semibold tracking-wider text-green-900">Get started now with free account</p>
                                </div>
                                <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold text-slate-700 sm:text-5xl mt-5 leading-snug tracking-wide">
                                    Buy & Sell On <br /> #1 Marketplace for <span className="inline-block text-primary">Cars </span> in <span className="inline-block text-primary">Rwanda</span>
                                </h2>
                                <p className="text-base text-gray-700 md:text-lg">
                                    Discover a wide range of cars to suit every need and budget. Whether you're looking for the latest models, reliable used cars, or something in between, we have it all.
                                </p>
                            </div>

                            <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:justify-start">
                                <div className='border border-gray-300 rounded-full pl-4 pr-2 py-2 w-full text-sm focus:outline-none flex items-center bg-white'>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11 20a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M18.93 20.689c.53 1.6 1.74 1.76 2.67.36.85-1.28.29-2.33-1.25-2.33-1.14-.01-1.78.88-1.42 1.97Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search your desired car..."
                                        className="border-none font-bold outline-none focus:border-none focus:outline-none ml-3 bg-white w-full h-full text-slate-700"
                                    />
                                    <div className='hidden md:block'>
                                        {onLoading && <FetchLoader />}

                                        {!onLoading && <button onClick={handleSearch} className="inline-flex h-11 w-full items-center justify-center text-sm ml-10 rounded-full bg-primary px-5 font-medium tracking-wide text-white shadow-none outline-none transition duration-200 hover:bg-primary focus:ring sm:w-auto">
                                            <span className='uppercase'>Search</span>
                                        </button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
