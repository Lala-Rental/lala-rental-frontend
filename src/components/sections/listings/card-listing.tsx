/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import CarPostingCard from '../../cards/card.tsx';
import CardListingSkeleton from './card-listing-skeleton.tsx';

interface CardListingProps {
    title: string;
    description: string;
    cars: any[];
    isLoading?: boolean;
}

const CardListing: React.FC<CardListingProps> = ({ title, description, cars, isLoading }) => {
    return (
        <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
            <div className="text-left mb-5">
                <h3 className="text-xl font-bold leading-tight text-slate-700 sm:text-2xl lg:text-3xl">{title}</h3>
                <p className="max-w-xl mt-4 text-base leading-relaxed text-gray-600">{description}</p>
            </div>

            <div className='mt-10'>
                {/* Skeleton */}
                {isLoading && <CardListingSkeleton numberOfCards={8} numberOfColumns={4} />}

                <div className="grid gap-5 lg:grid-cols-4 sm:max-w-sm sm:mx-auto lg:max-w-full">                    
                    {cars && cars.map((item, index) => (
                        <CarPostingCard key={index} car={item} />
                    ))}
                </div>

                {(!cars || cars.length === 0) && <div className='flex items-center justify-center mt-10'>
                    <div className='flex flex-col items-center justify-center'>
                        <img src="/images/empty-pana.svg" alt="" className='w-80' />
                        <span className='font-bold text-slate-400'>No Cars Result Found.</span>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default CardListing;
