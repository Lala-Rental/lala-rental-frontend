import React from "react";
import CardListingSkeleton from "../listings/card-listing-skeleton.tsx";
import { Link } from "react-router-dom";
import Card from "../../cards/card.tsx";

interface ShortListingsProps {
    isLoading: boolean;
    datas: any;
    params: any;
}

const ShortListings: React.FC<ShortListingsProps> = ({ isLoading, datas, params }) => {
    return (
        <section className="mb-5">
            {/* Skeleton */}
            {isLoading && <CardListingSkeleton numberOfCards={params.limit} />}

            {/* No Listings */}
            {(!isLoading && (!datas || datas.length === 0)) && (
                <div className="flex flex-col justify-center mt-10 items-center">
                    <img src="/images/svgs/closed-store.svg" className="w-80" alt="No Listings" /> <br />
                    <div className="text-slate-700 font-bold">No Listings Founds.</div>
                </div>
            )}

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