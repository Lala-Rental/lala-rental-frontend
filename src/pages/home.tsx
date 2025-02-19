/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import Hero from '../components/sections/home/hero.tsx';
import api from '../services/api.ts';
import AlertMessage from '../components/alerts/alert-message.tsx';
import MetaTags from '../components/MetaTags.tsx';
import ShortListings from '../components/sections/home/short-listings.tsx';

const Home: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [cars, setCars] = useState<any[]>([]);
   
    const params = {
        limit: 8,
        orderBy: 'createdAt',
        direction: 'desc',
    };

    /**
     * Fetches the cars
     * 
     * @param customParams 
     */
    const getCars = async (customParams: Axios.AxiosXHRConfigBase<unknown> | undefined = {}) => {
        setIsLoading(true);

        const formParams = {
            ...params,
            ...customParams,
        };
        
        try {
            api.get(`/cars/approved`, { params: formParams })
                .then((response: any) => {
                    setCars(response.data.data);
                    setIsLoading(false)
                }).catch((error: { response: { data: { message: string; }; }; }) => {
                    setAlertMessage('An error occurred. try again later');
                    setAlertType('error');
                    setIsLoading(false);
                });
        } catch (error) {
            setAlertMessage('An error occurred. Something went wrong');
            setAlertType('error');
            setIsLoading(false);
        }
    };

    /**
     * Fetches the cars
     * 
     * @returns void
     */
    useEffect(() => {
        const fetchData = async () => {
            getCars();
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* SEO */}
            <MetaTags 
                title="Lala Rental" 
                description="Discover a wide range of houses to suit every need and budget. Whether you're looking for the latest models, reliable used houses, or something in between, we have it all. Start your journey with us today and find the perfect house for you."
                keywords="Lala Rental, houses, house rental, house rental africa, house rental rwanda, house rental kenya, house rental nigeria, house rental ghana, house rental south africa, house rental tanzania, house rental uganda"
                canonical={`${process.env.PUBLIC_URL}/`}
                ogTitle="Lala Rental" 
                ogDescription="Find your dream house from our extensive collection. Quality houses for every budget." 
                ogImage={`${process.env.PUBLIC_URL}/images/logo.jpeg`}
                twitterCard="summary_large_image"
            />

            {/* Hero Component */}
            {/* <Hero onLoading={isLoading} onChange={getCars} /> */}

            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-26 lg:px-12 lg:py-12">
                {/* Short list of cars */}
                <ShortListings isLoading={isLoading} cars={cars} params={params}>
                    <h3 className="text-2xl font-bold text-slate-700 sm:text-3xl lg:text-4xl capitalize md:leading-loose">wide range of houses to <br /> suit every need and  <span className="inline-block text-primary">budget</span>.</h3>
                    <p className="max-w-xl text-base leading-relaxed text-gray-600 mt-6">
                        Find your dream house from our extensive collection. Quality houses for every budget.
                    </p>
                </ShortListings>
            </div>

            {/* Alert Message */}
            <AlertMessage message={alertMessage} type={alertType} />
        </div>
    );
};

export default Home;
