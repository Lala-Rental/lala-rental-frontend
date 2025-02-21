import React from "react";
import CardListingSkeleton from "../listings/card-listing-skeleton.tsx";
import { Link } from "react-router-dom";
import Card from "../../cards/card.tsx";

interface ShortListingsProps {
    isLoading: boolean;
    datas: any;
    params: any;
    children: React.ReactNode;
}

const ShortListings: React.FC<ShortListingsProps> = ({ children, isLoading, datas, params }) => {
    return (
        <section className="mb-5">
            <div className="text-left">
                {children}
            </div>

            {/* Skeleton */}
            {isLoading && <CardListingSkeleton numberOfCards={params.limit} />}

            {/* Car Postings */}
            {!isLoading && <div className='mt-10'>
                <div className="grid gap-5 lg:grid-cols-4 sm:max-w-sm sm:mx-auto lg:max-w-full">                        
                    {datas.map((item, index) => (
                        <Card key={index} data={item} />
                    ))}
                </div>
            </div>}

            <div className="flex justify-center mt-10">
                <Link to={'/listings'} className="px-6 py-2 bg-primary text-white rounded-full text-md flex items-center">
                    <span>View our Listings</span>
                    <span className='ml-2'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M14.43 5.93L20.5 12l-6.07 6.07"></path><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M3.5 12h16.83" opacity=".4"></path></svg></span>
                </Link>
            </div>
        </section>
    );
}

export default ShortListings;