/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import api from '../services/api.ts';
import AlertMessage from '../components/alerts/alert-message.tsx';
import { BRAND_OPTIONS, CONDITION_OPTIONS, FUELTYPE_OPTIONS, TRANSMISSION_OPTIONS, TYPE_OPTIONS } from '../services/constants.ts';   
import PriceRangeInput from '../components/inputs/PriceRangeInput.tsx';
import MetaTags from '../components/MetaTags.tsx';
import CardListingSkeleton from '../components/sections/listings/card-listing-skeleton.tsx';
import Card from '../components/cards/card.tsx';
import CardListing from '../components/sections/listings/card-listing.tsx';

const Listings: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingNewCar, setIsFetchingNewCar] = useState(false);
    const [isFetchingAutoCar, setIsFetchingAutoCar] = useState(false);

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    
    const [cars, setCars] = useState<any[]>([]);
    const [newCars, setNewCars] = useState<any[]>([]);
    const [autoCars, setAutoCars] = useState<any[]>([]);

    const [priceFilter, setPriceFilter] = useState<number[]>([1000000, 100000000]);
    const [typeFilter, setTypeFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [conditionFilter, setConditionFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [transmissionFilter, setTransmissionFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [fuelFilter, setFuelFilter] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') getCars();
    };

    const clearFilter = () => {
        setPriceFilter([1000000, 100000000]);
        setTypeFilter('');
        setBrandFilter('');
        setConditionFilter('');
        setSearchQuery('');
        setTransmissionFilter('');
        setLocationFilter('');
        setFuelFilter('');
        getCars(9);
    }

    /**
     * Fetches the cars
     * 
     * @returns void
     */
    const getCars = async (limit = 50) => {
        const params: any = {
            direction: 'desc',
            limit: limit,
            price: JSON.stringify(priceFilter),
        };

        if (typeFilter !== '') params.type = typeFilter;
        if (brandFilter !== '') params.make = brandFilter;
        if (conditionFilter !== '') params.condition = conditionFilter;
        if (searchQuery !== '') params.query = searchQuery;
        if (locationFilter !== '') params.location = locationFilter;
        if (transmissionFilter !== '') params.transmission = transmissionFilter;
        if (fuelFilter !== '') params.fuel_type = fuelFilter;

        setIsLoading(true);
        
        try {
            api.get(`/cars/approved`, { params })
                .then((response: any) => {
                    setCars(response.data.data);
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

    /**
     * Fetches the newly arrival cars
     * @returns void
     */
    const getNewCars = async () => {
        const params: any = {
            condition: 'new',
            direction: 'desc',
            limit: 8,
        };

        setIsFetchingNewCar(true);
        
        try {
            api.get('/cars/approved', { params }).then((response: any) => {
                setNewCars(response.data.data);
                setIsFetchingNewCar(false);
            }).catch((error: { response: { data: { message: string; }; }; }) => {
                setAlertMessage('An error occurred. ' + error.response.data.message);
                setAlertType('error');
                setIsFetchingNewCar(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. Something went wrong');
            setAlertType('error');
            setIsFetchingNewCar(false);
        }
    };

    /**
     * Fetches the automatic cars
     * @returns void
     */
    const getAutoCars = async () => {
        const params: any = {
            transmission: 'automatic',
            direction: 'desc',
            limit: 8,
        };

        setIsFetchingAutoCar(true);
        
        try {
            api.get('/cars/approved', { params }).then((response: any) => {
                setAutoCars(response.data.data);
                setIsFetchingAutoCar(false);
            }).catch((error: { response: { data: { message: string; }; }; }) => {
                setAlertMessage('An error occurred. ' + error.response.data.message);
                setAlertType('error');
                setIsFetchingAutoCar(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. Something went wrong');
            setAlertType('error');
            setIsFetchingAutoCar(false);
        }
    };

    /**
     * Fetches the cars
     * @returns void
     */
    useEffect(() => {
        getCars(9);
        getNewCars();
        getAutoCars();
    }, []);
    
    return (
        <div>
            <MetaTags 
                title="Car Listings - Lala Rental" 
                description="Explore our extensive car listings to find the perfect vehicle for you. From the latest models to reliable used cars, we have something for everyone. Start your journey with Lala Rental today!"
                keywords="Lala Rental, car listings, cars, new cars, used cars, car trader, car trader africa, car trader rwanda, car trader kenya, car trader nigeria, car trader ghana, car trader south africa, car trader tanzania, car trader uganda"
                canonical={`${process.env.PUBLIC_URL}/listings`}
                ogTitle="Car Listings - Lala Rental" 
                ogDescription="Discover your dream car from our extensive listings. Quality cars for every budget and need."
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
                            <span className='text-slate-700 text-2xl font-bold text-center'>Find Your Dream Car Across the City</span>
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
                                        placeholder="Search different cars... (press enter to search)"
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
                    {/* Side Filters */}
                    <div className='md:max-w-80'>
                        {/* Filters */}
                        <div className="bg-white p-4 rounded-lg flex flex-wrap gap-4 items-center justify-between border border-gray-200">
                            {/* Filter by Price */}
                            <PriceRangeInput price={priceFilter} setPrice={setPriceFilter} />

                            {/* Filter by Type */}
                            <div className="flex items-center">
                                <label className="text-sm font-semibold text-gray-600 mr-2">Type:</label>
                                <div className='border rounded-md px-4 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none flex items-center'>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5.4 2.102h13.2c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3l-4.3 3.8c-.6.5-1 1.5-1 2.3v4.3c0 .6-.4 1.4-.9 1.7l-1.4.9c-1.3.8-3.1-.1-3.1-1.7v-5.3c0-.7-.4-1.6-.8-2.1l-3.8-4c-.5-.5-.9-1.4-.9-2v-2.3c0-1.2.9-2.1 2-2.1Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M10.93 2.102 6 10.002" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                    <select id="type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border-none outline-none focus:border-none focus:outline-none ml-2 bg-white">
                                        {TYPE_OPTIONS.map((item, index) => (
                                            <option key={index} value={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Filter by Brand */}
                            <div className="flex items-center">
                                <label className="text-sm font-semibold text-gray-600 mr-2">Brand:</label>
                                <div className='border rounded-md px-4 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none flex items-center'>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5.4 2.102h13.2c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3l-4.3 3.8c-.6.5-1 1.5-1 2.3v4.3c0 .6-.4 1.4-.9 1.7l-1.4.9c-1.3.8-3.1-.1-3.1-1.7v-5.3c0-.7-.4-1.6-.8-2.1l-3.8-4c-.5-.5-.9-1.4-.9-2v-2.3c0-1.2.9-2.1 2-2.1Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M10.93 2.102 6 10.002" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                    <select id="type" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="border-none outline-none focus:border-none focus:outline-none ml-2 bg-white">
                                        {BRAND_OPTIONS.map((item, index) => (
                                            <option key={index} value={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Filter by Condition */}
                            <div className="flex items-center">
                                <label className="text-sm font-semibold text-gray-600 mr-2">Condition:</label>
                                <div className='border rounded-md px-4 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none flex items-center'>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5.4 2.102h13.2c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3l-4.3 3.8c-.6.5-1 1.5-1 2.3v4.3c0 .6-.4 1.4-.9 1.7l-1.4.9c-1.3.8-3.1-.1-3.1-1.7v-5.3c0-.7-.4-1.6-.8-2.1l-3.8-4c-.5-.5-.9-1.4-.9-2v-2.3c0-1.2.9-2.1 2-2.1Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M10.93 2.102 6 10.002" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                    
                                    <select id="model" className="border-none outline-none focus:border-none focus:outline-none ml-2 bg-white" value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)}>
                                        {CONDITION_OPTIONS.map((item, index) => (
                                            <option key={index} value={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Filter by Transmission */}
                            <div className="flex items-center">
                                <label className="text-sm font-semibold text-gray-600 mr-2">Trans:</label>
                                <div className='border rounded-md px-4 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none flex items-center'>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5.4 2.102h13.2c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3l-4.3 3.8c-.6.5-1 1.5-1 2.3v4.3c0 .6-.4 1.4-.9 1.7l-1.4.9c-1.3.8-3.1-.1-3.1-1.7v-5.3c0-.7-.4-1.6-.8-2.1l-3.8-4c-.5-.5-.9-1.4-.9-2v-2.3c0-1.2.9-2.1 2-2.1Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M10.93 2.102 6 10.002" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                    
                                    <select id="model" className="border-none outline-none focus:border-none focus:outline-none ml-2 bg-white" value={transmissionFilter} onChange={(e) => setTransmissionFilter(e.target.value)}>
                                        {TRANSMISSION_OPTIONS.map((item, index) => (
                                            <option key={index} value={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Filter by Fuel */}
                            <div className="flex items-center">
                                <label className="text-sm font-semibold text-gray-600 mr-2">Fuel:</label>
                                <div className='border rounded-md px-4 py-2 text-sm focus:ring focus:ring-blue-300 focus:outline-none flex items-center'>
                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5.4 2.102h13.2c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3l-4.3 3.8c-.6.5-1 1.5-1 2.3v4.3c0 .6-.4 1.4-.9 1.7l-1.4.9c-1.3.8-3.1-.1-3.1-1.7v-5.3c0-.7-.4-1.6-.8-2.1l-3.8-4c-.5-.5-.9-1.4-.9-2v-2.3c0-1.2.9-2.1 2-2.1Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M10.93 2.102 6 10.002" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                    
                                    <select id="model" className="border-none outline-none focus:border-none focus:outline-none ml-2 bg-white" value={fuelFilter} onChange={(e) => setFuelFilter(e.target.value)}>
                                        {FUELTYPE_OPTIONS.map((item, index) => (
                                            <option key={index} value={item.value}>{item.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Apply Filter */}
                            <div>
                                <button onClick={() => getCars(9)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm focus:outline-none">
                                    Apply Filter
                                </button>
                                <button onClick={clearFilter} className="bg-white text-primary px-4 py-2 rounded-lg text-sm focus:outline-none ml-2 border border-gray-200">
                                    Clear Filter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Listing */}
                    <div className="md:ml-5 w-full mt-5 md:mt-0">
                        {/* Skeleton */}
                        {isLoading && <CardListingSkeleton numberOfCards={6} numberOfColumns={3} />}

                        {/* Listing */}
                        {(!isLoading && cars.length > 0) && <div className=''>
                            <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">                                
                                {!isLoading && cars.map((item, index) => (
                                    <Card key={index} car={item} />
                                ))}
                            </div>
                        </div>}

                        {(!isLoading && cars.length === 0) && <div className='flex items-center justify-center mt-10'>
                            <div className='flex flex-col items-center justify-center'>
                                <img src="/images/empty-pana.svg" alt="" className='w-80' />
                                <span className='font-bold text-slate-400'>No Search Result Found.</span>
                            </div>
                        </div>}
                    </div>
                </div>

                {/* Fresh Arrivals */}
                <CardListing 
                    title="Hot Off the Lot: Fresh Arrivals" 
                    description="Be the first to explore our latest collection of cars. Discover cutting-edge models with top-notch features and unbeatable performance."
                    cars={newCars}
                    isLoading={isFetchingNewCar}
                />

                {/* Automatic Cars */}
                <CardListing 
                    title="Automatic Cars" 
                    description="Automatic cars designed for a seamless and enjoyable driving experience. Ideal for both city commutes and long-distance travels, That offer unmatched convenience and comfort."
                    cars={autoCars}
                    isLoading={isFetchingAutoCar}
                />
            </section>

            {/* Alert Message */}
            <AlertMessage message={alertMessage} type={alertType} />
        </div>
    );
};

export default Listings;
