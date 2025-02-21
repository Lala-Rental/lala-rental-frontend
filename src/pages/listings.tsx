/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import api from '../services/api.ts';
import AlertMessage from '../components/alerts/alert-message.tsx';
import MetaTags from '../components/MetaTags.tsx';
import CardListingSkeleton from '../components/sections/listings/card-listing-skeleton.tsx';
import Card from '../components/cards/card.tsx';

const Listings: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState<any[]>([]);

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') fetchProperties();
    };

    /**
     * Fetch approved properties
     * 
     * @returns void
     */
    const fetchProperties = async (limit = 50) => {
        const params: any = {
            direction: 'desc',
            limit: limit,
        };

        if (searchQuery !== '') params.query = searchQuery;
        if (locationFilter !== '') params.location = locationFilter;

        setIsLoading(true);
        
        try {
            api.get(`/properties`, { params })
                .then((response: any) => {
                    setProperties(response.data.data);
                    setIsLoading(false);
                }).catch((error: { response: { data: { message: string; }; }; }) => {
                    setAlertMessage('An error occurred. ' + error.response.data.message);
                    setAlertType('error');
                    setIsLoading(false);
                });
        } catch (error) {
            setAlertMessage('An error occurred. Something went wrong');
            setAlertType('error');
            setIsLoading(false);
        }
    }

    useEffect(() => {fetchProperties(9)}, []);
    
    return (
        <div>
            <MetaTags 
                title="Lala Rental" 
                description="Discover a wide range of properties to suit every need and budget. Whether you're looking for the latest listings, reliable used properties, or something in between, we have it all. Start your journey with us today and find the perfect property for you."
                keywords="Lala Rental, properties, property rental, property rental africa, property rental rwanda, property rental kenya, property rental nigeria, property rental ghana, property rental south africa, property rental tanzania, property rental uganda"
                canonical={`${process.env.PUBLIC_URL}/`}
                ogTitle="Lala Rental" 
                ogDescription="Find your dream property from our extensive collection. Quality properties for every budget." 
                ogImage={`${process.env.PUBLIC_URL}/images/logo.jpeg`}
                twitterCard="summary_large_image"
            />

            <section className=''>
                {/* Filter */}
                <div className='py-10 md:py-19 relative px-4 md:px-28 lg:px-28 bg-center bg-cover bg-no-repeat' style={{ backgroundImage: 'url(https://visitrwanda.com/wp-content/uploads/fly-images/1210/Visit-Rwanda-Kigali-Centre-Roads-1920x1281.jpg)' }}>
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    
                    <div className="px-4 py-2 mx-auto relative z-40 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-2 lg:px-8 lg:py-7 bg-white bg-opacity-90 rounded-lg">
                        {/* Title */}
                        <div className='flex flex-wrap gap-4 items-center justify-center mb-5'>
                            <span className='text-slate-700 text-2xl font-bold text-center'>Find Your Dream Property Across the City</span>
                        </div>
                        
                        {/* Search Query */}
                        <div className="bg-transparent mb-4 rounded-lg flex flex-wrap gap-4 items-center justify-center">
                            <div className="flex items-center w-full md:w-auto">
                                <div className='border rounded-full px-4 py-3 w-full md:w-[500px] text-sm focus:outline-none flex items-center bg-white'>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11 20a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M18.93 20.689c.53 1.6 1.74 1.76 2.67.36.85-1.28.29-2.33-1.25-2.33-1.14-.01-1.78.88-1.42 1.97Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                    
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search different Properties... (press enter to search)"
                                        className="border-none outline-none focus:border-none focus:outline-none ml-3 bg-white w-full h-full"
                                    />
                                </div>
                                <div className='border rounded-full px-4 py-3 w-full md:w-[200px] text-sm focus:outline-none flex items-center bg-white ml-2'>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path stroke="#697689" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M22 9v6c0 2.5-.5 4.25-1.62 5.38L14 14l7.73-7.73c.18.79.27 1.69.27 2.73z"></path><path stroke="#697689" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.73 6.27L6.27 21.73C3.26 21.04 2 18.96 2 15V9c0-5 2-7 7-7h6c3.96 0 6.04 1.26 6.73 4.27z"></path><path stroke="#697689" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.38 20.38C19.25 21.5 17.5 22 15 22H9c-1.04 0-1.94-.09-2.73-.27L14 14l6.38 6.38z"></path><path stroke="#697689" strokeWidth="1.5" d="M6.24 7.98c.68-2.93 5.08-2.93 5.76 0 .39 1.72-.69 3.18-1.64 4.08a1.8 1.8 0 01-2.48 0c-.95-.9-2.04-2.36-1.64-4.08z" opacity=".4"></path><path stroke="#697689" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.094 8.7h.01" opacity=".4"></path></svg></span>
                                    
                                    <input
                                        type="text"
                                        value={locationFilter}
                                        onChange={(e) => setLocationFilter(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Location"
                                        className="border-none outline-none focus:border-none focus:outline-none ml-3 bg-white w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='md:flex px-4 py-2 mt-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-5'>
                    {/* Listing */}
                    <div className="md:ml-5 w-full mt-5 md:mt-0">
                        {/* Skeleton */}
                        {isLoading && <CardListingSkeleton numberOfCards={6} numberOfColumns={4} />}

                        {/* Listing */}
                        {(!isLoading && properties.length > 0) && <div className=''>
                            <div className="grid gap-5 lg:grid-cols-4 sm:max-w-sm sm:mx-auto lg:max-w-full">                                
                                {!isLoading && properties.map((item, index) => (
                                    <Card key={index} data={item} />
                                ))}
                            </div>
                        </div>}

                        {(!isLoading && properties.length === 0) && <div className='flex items-center justify-center mt-10'>
                            <div className='flex flex-col items-center justify-center'>
                                <img src="/images/svgs/closed-store.svg" alt="" className='w-80' />
                                <span className='font-bold text-slate-400'>No Search Result Found.</span>
                            </div>
                        </div>}
                    </div>
                </div>
            </section>

            {/* Alert Message */}
            <AlertMessage message={alertMessage} type={alertType} />
        </div>
    );
};

export default Listings;
