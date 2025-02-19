import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "./Slider";

interface Car {
    _id: string;
    title: string;
    transmission: string;
    price:string;
    description: string;
    make: string;
    car_model: string;
    eco_friendly: boolean;
    status: string;
    images: string[];
    year: string;
    mileage: string;
    fuel_type: string;
    condition: string;
    category: { name: string };
}

interface CardProps {
    car: Car;
}

const Card: React.FC<CardProps> = ({ car }) => {
    const [page, setPage] = useState(1);

    return (
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded">
            <div className="overflow-hidden transition-shadow duration-300 bg-white rounded relative">
                <Slider className="" page={page} setPage={setPage}>
                    {car.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={car.title}
                            className="w-full object-cover h-64 rounded-lg"
                        />
                    ))}
                </Slider>
                {<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-x-[5px]">
                    {[...Array(5).keys()].map((key, index) => (
                        <span
                            key={index}
                            data-selected={page === key + 1}
                            className="w-[6px] h-[6px] bg-white opacity-[.6] data-[selected=true]:opacity-100 rounded-full"
                        />
                    ))}
                </div>}
                
                <div className="inline-flex absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest rounded-full text-gray-100 bg-primary/90 mt-1">{car.category ? car.category.name : 'Vehicle'}</div>
                
                <Link to={`/cars/${car._id}`} aria-label="Article" className='relative'>  
                    {car.status === 'sold' && (<div className="inline-flex absolute top-3 right-3 px-2 py-1 text-xs font-semibold tracking-widest rounded-lg text-gray-100 bg-red-400 mt-1"> Sold </div>)}
                    {car.condition === 'new' && (<div className="inline-flex absolute bottom-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest rounded-lg text-gray-100 bg-primary/90 mt-1"> New </div>)}
                    
                    {car.eco_friendly && (<div className="inline-flex absolute bottom-3 right-3 px-2 py-2 text-xs font-semibold tracking-widest rounded-full text-gray-100 bg-primary/90 mt-1"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>  
                    </div>)}
                </Link>
                <div className="py-5">
                    <p className="mb-2 text-xs font-semibold text-gray-600 uppercase">
                        {car.make}, {car.car_model} - {car.year}
                    </p>                
                    
                    <div>
                        <Link to={`/cars/${car._id}`} aria-label="Article" className="inline-block mb-3 mt-2 text-black transition-colors duration-200 hover:text-deep-purple-accent-700">
                            <p className="text-xl font-bold leading-5 text-slate-700">
                                {new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(Number(car.price))}
                            </p>                        
                        </Link>
                    </div>

                    <p className="mb-4 text-slate-700 line-clamp-2">
                        {car.description}
                    </p>

                    <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                    <div className='flex justify-between items-center'>
                        <div>
                            <div className="text-xs font-semibold mb-3 text-gray-600 uppercase flex items-center">
                                <div className='flex items-center mr-2'>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#555555" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"><path d="M15.57 18.502v-3.9M15.57 7.45V5.5M15.569 12.65a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2ZM8.43 18.5v-1.95M8.43 9.4V5.5M8.43 16.552a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z"></path></g></svg>
                                    </span>
                                    <span className='ml-2'>{car.transmission}</span>
                                </div>
                                <span>|</span>
                                <div>
                                    <span className='ml-2'>{car.fuel_type}</span>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <Link to={`/cars/${car._id}`} aria-label="Likes" className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                                    <div className="mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15.51 2.828H8.49c-2.49 0-3.04 1.24-3.36 2.76L4 10.998h16l-1.13-5.41c-.32-1.52-.87-2.76-3.36-2.76ZM21.989 19.82c.11 1.17-.83 2.18-2.03 2.18h-1.88c-1.08 0-1.23-.46-1.42-1.03l-.2-.6c-.28-.82-.46-1.37-1.9-1.37h-5.12c-1.44 0-1.65.62-1.9 1.37l-.2.6c-.19.57-.34 1.03-1.42 1.03h-1.88c-1.2 0-2.14-1.01-2.03-2.18l.56-6.09c.14-1.5.43-2.73 3.05-2.73h12.76c2.62 0 2.91 1.23 3.05 2.73l.56 6.09ZM4 8H3M21 8h-1" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v2M10.5 5h3"></path></g><path opacity=".4" d="M6 15h3M15 15h3" stroke="#555555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </div>
                                    <p className="font-semibold text-sm text-slate-700">{car.mileage}</p>
                                </Link>
                                <Link to={`/cars/${car._id}`} aria-label="Comments" className="flex items-start text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 group">
                                    <div className="mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5.15 2v20" stroke="#555555" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".34" d="M5.15 4h11.2c2.7 0 3.3 1.5 1.4 3.4l-1.2 1.2c-.8.8-.8 2.1 0 2.8l1.2 1.2c1.9 1.9 1.2 3.4-1.4 3.4H5.15" stroke="#555555" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    </div>
                                    <p className="font-semibold text-sm text-slate-700 uppercase">{car.condition}</p>
                                </Link>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <Link to={`/cars/${car._id}`} className="inline-flex items-center justify-center rounded bg-primary px-3 py-1 font-medium text-sm tracking-wide text-white shadow-none outline-none transition duration-200 hover:bg-primary focus:ring sm:w-auto">
                                <span>Read More</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;