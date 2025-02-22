import React from 'react';

const CardSkeleton: React.FC = () => {
    return (
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-xl animate-pulse mt-5">
            <div className="overflow-hidden transition-shadow duration-300 bg-white rounded-xl p-2">
                <div className="relative">
                    <div className="object-cover w-full h-60 sm:h-64 rounded-lg bg-gray-300"></div>
                    <div className="inline-flex absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest rounded-full text-gray-100 bg-gray-400 mt-1"></div>
                    <div className="inline-flex absolute top-3 right-3 px-2 py-1 text-xs font-semibold tracking-widest rounded-lg text-gray-100 bg-gray-400 mt-1"></div>
                    <div className="inline-flex absolute bottom-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest rounded-lg text-gray-100 bg-gray-400 mt-1"></div>
                    <div className="inline-flex absolute bottom-3 right-3 px-2 py-2 text-xs font-semibold tracking-widest rounded-full text-gray-100 bg-gray-400 mt-1"></div>
                </div>
                <div className="py-5">
                    <div className="mb-2 h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="mb-3 mt-2 h-6 bg-gray-300 rounded w-1/3"></div>
                    <div className="mb-4 h-4 bg-gray-300 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;