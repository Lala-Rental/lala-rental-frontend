/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Hero from '../components/sections/home/hero.tsx';
import api from '../services/api.ts';
import AlertMessage from '../components/alerts/alert-message.tsx';
import MetaTags from '../components/MetaTags.tsx';
import ShortListings from '../components/sections/home/short-listings.tsx';

const Home: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [data, setData] = useState<any[]>([]);
   
    const params = {
        limit: 8,
        orderBy: 'createdAt',
        direction: 'desc',
    };

    const PROPERTIES_API = `/properties`;

    /**
     * Fetches All properties
     * 
     * @param customParams 
     */
    const fetchAllProperties = async (customParams: Axios.AxiosXHRConfigBase<unknown> | undefined = {}) => {
        setIsLoading(true);

        const formParams = {
            ...params,
            ...customParams,
        };
        
        try {
            api.get(PROPERTIES_API, { params: formParams })
                .then((response: any) => {                    
                    setData(response.data.data);
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
     * Fetches the properties
     * 
     * @returns void
     */
    useEffect(() => {
        const fetchData = async () => {
            fetchAllProperties();
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
            <Hero onLoading={isLoading} onChange={fetchAllProperties} />

            <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-26 lg:px-12 lg:py-12">
                {/* Short list of properties */}
                <ShortListings isLoading={isLoading} datas={data} params={params} />
            </div>

            {/* Alert Message */}
            <AlertMessage message={alertMessage} type={alertType} />
        </div>
    );
};

export default Home;
