import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "./Slider";

interface ICard {
    id: string;
    title: string;
    description: string;
    price:string;
    location: string;
    status: string;
    images: string[];
}

interface CardProps {
    data: ICard;
}

const Card: React.FC<CardProps> = ({ data }) => {
    const [page, setPage] = useState(1);

    return (
        <div className="overflow-hidden transition-shadow duration-300 rounded">
            <div className="overflow-hidden transition-shadow duration-300 rounded-xl relative">
                {/* Card images */}
                <div className="relative">
                    <Slider className="" page={page} setPage={setPage}>
                        {data?.images && data?.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={data.title}
                                className="w-full object-cover h-60 rounded-xl"
                            />
                        ))}
                    </Slider>
                    {data?.images?.length > 0 && <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-x-[5px]">
                        {[...Array(data?.images.length).keys()].map((key, index) => (
                            <span
                                key={index}
                                data-selected={page === key + 1}
                                className="w-[6px] h-[6px] bg-white opacity-[.6] data-[selected=true]:opacity-100 rounded-full"
                            />
                        ))}
                    </div>}
                </div>
                
                {/* Card Details */}
                <div className="py-5">
                    <Link to={`/properties/${data?.id}`} aria-label="Article">
                        <div>
                            <div className="mb-2 text-xs text-slate-200 font-semibold uppercase line-clamp-1">{ data?.location }</div>   
                            <div className='text-white font-bold text-lg capitalize line-clamp-2'>{data?.title}</div> 
                            <p className="my-2 text-slate-200 line-clamp-2">{data?.description}</p>   
                        </div>         
                    
                        <p className="text-lg font-bold leading-5 text-white">
                            {new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(Number(data?.price))} / Night
                        </p>                        
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;