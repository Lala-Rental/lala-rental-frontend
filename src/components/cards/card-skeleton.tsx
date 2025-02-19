import React from 'react';

const CardSkeleton: React.FC = () => {
    return (
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded animate-pulse">
            <div className="overflow-hidden transition-shadow duration-300 bg-white rounded">
                <div className="relative">
                    <div className="object-cover w-full h-64 rounded-lg bg-gray-300"></div>
                    <div className="inline-flex absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest rounded-full text-gray-100 bg-gray-400 mt-1"></div>
                    <div className="inline-flex absolute top-3 right-3 px-2 py-1 text-xs font-semibold tracking-widest rounded-lg text-gray-100 bg-gray-400 mt-1"></div>
                    <div className="inline-flex absolute bottom-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest rounded-lg text-gray-100 bg-gray-400 mt-1"></div>
                    <div className="inline-flex absolute bottom-3 right-3 px-2 py-2 text-xs font-semibold tracking-widest rounded-full text-gray-100 bg-gray-400 mt-1"></div>
                </div>
                <div className="py-5">
                    <div className="mb-2 h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="mb-3 mt-2 h-6 bg-gray-300 rounded w-1/3"></div>
                    <div className="mb-4 h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-xs font-semibold mb-3 text-gray-600 uppercase flex items-center">
                                <div className="flex items-center mr-2">
                                    <span className="h-4 w-4 bg-gray-300 rounded-full"></span>
                                    <span className="ml-2 h-4 bg-gray-300 rounded w-12"></span>
                                </div>
                                <span>|</span>
                                <div>
                                    <span className="ml-2 h-4 bg-gray-300 rounded w-12"></span>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                                    <div className="mr-2 h-4 w-4 bg-gray-300 rounded-full"></div>
                                    <p className="font-semibold text-sm text-slate-700 h-4 bg-gray-300 rounded w-12"></p>
                                </div>
                                <div className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                                    <div className="mr-2 h-4 w-4 bg-gray-300 rounded-full"></div>
                                    <p className="font-semibold text-sm text-slate-700 uppercase h-4 bg-gray-300 rounded w-12"></p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="inline-flex items-center justify-center rounded bg-gray-300 px-3 py-1 font-medium text-sm tracking-wide text-white shadow-none outline-none transition duration-200 w-24 h-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;