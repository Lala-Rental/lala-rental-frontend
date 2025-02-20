/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CarPostingSection from '../components/sections/listings/card-listing.tsx';
import api from '../services/api.ts';
import { useParams } from 'react-router-dom';
import FetchLoader from '../components/loaders/fetching-loader.tsx';
import AlertMessage from '../components/alerts/alert-message.tsx';
import MetaTags from '../components/MetaTags.tsx';
import FormModal from '../components/models/form-model.tsx';
import TextInput from '../components/inputs/text-input.tsx';
import TextAreaInput from '../components/inputs/textarea-input.tsx';
import FormButton from '../components/buttons/form-button.tsx';

interface Car {
    title: string;
    images: string[];
    price: string;
    make: string;
    car_model: string;
    transmission: string;
    fuel_type: string;
    description: string;
    mileage: string;
    category: { name: string };
    condition: string;
    seller: { fullname: string, email: string, phone: string };
    features: any[];
    autonomy: string;
    seats: string;
    color: string;
}

const CardDetails: React.FC = () => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    const [car, setCar] = useState<Car | null>(null);
    const [relatedCars, setRelatedCars] = useState<any[]>([]);
    const { id } = useParams<{ id: string }>();
    const contactNumber = process.env.REACT_APP_ADMIN_PHONE;
    
    const [defaultImage, setDefaultImage] = useState<string>('https://cdn.bestsuppliers.com/seo_products_img/biuloo/23798d3c6f853ade868f0f64491471bf.jpg!/rotate/180');
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    
    // Form
    const [fullname, setFullname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleContactClick = () => {
        const whatsappUrl = `https://wa.me/${contactNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleSubmitInquiry = () => {
        if (!fullname || !email || !message) {
            setAlertMessage('all inputs are required');
            setAlertType('error');
            return;
        }

        try {
            setIsloading(true);

            api.post('/user/inquiries', { 
                name: fullname, 
                email, 
                message,
                carId: id
            }, {
                headers: { 'Accept': 'application/json' }
            }).then((response: any) => {
                handleCloseModal();

                // clear form
                setFullname('');
                setEmail('');
                setMessage('');

                setAlertMessage(response.data.message);
                setAlertType('success');
                setIsloading(false);
            }).catch((error: { response: { data: { message: string; }; }; }) => {
                setAlertMessage('An error occurred. '+error.response.data.message);
                setAlertType('error');
                setIsloading(false);
            })
        } catch (error) {
            setAlertMessage('An error occurred. Please try again.');
            setAlertType('error');
            setIsloading(false);
        }
    }

    const fetchCardDetails = async () => {
        
        setIsloading(true);

        try {
            api.get(`/cars/show/${id}`).then((response: any) => {
                setCar(response.data.data);
                setIsloading(false);
            }).catch(() => {
                setAlertMessage('An error occurred. Unable to fetch car details.');
                setAlertType('error');
                setIsloading(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. Something went wrong');
            setAlertType('error');
            setIsloading(false);
        }
    }

    const fetchRelatedCars = async () => {
        try {
            api.get(`/cars/related/${id}`).then((response: any) => {
                setRelatedCars(response.data.data);
                setIsloading(false);
            }).catch(() => {
                setAlertMessage('An error occurred. Unable to fetch related cars.');
                setAlertType('error');
                setIsloading(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. Something went wrong');
            setAlertType('error');
            setIsloading(false);
        }
    }

    useEffect(() => {
        if (car && car.images && car.images.length > 0) {
            setDefaultImage(car.images[0]);
        }
    }, [car]);

    useEffect(() => {
        fetchCardDetails();
        fetchRelatedCars();
    }, [id]);

    return (
        <div>
            <MetaTags
                title={`${car?.title} - Lala Rental`} 
                description={car ? car.description : 'Discover your dream car from our extensive listings. Quality cars for every budget and need.'}
                keywords="Lala Rental, car listings, cars, new cars, used cars, car trader, car trader africa, car trader rwanda, car trader kenya, car trader nigeria, car trader ghana, car trader south africa, car trader tanzania, car trader uganda"
                canonical={`${process.env.PUBLIC_URL}/cars/${id}`}
                ogTitle={`${car?.title} - Lala Rental`} 
                ogDescription={car ? car.description : 'Discover your dream car from our extensive listings. Quality cars for every budget and need.'}
                ogImage={car ? car.images[0] : 'https://cdn.bestsuppliers.com/seo_products_img/biuloo/23798d3c6f853ade868f0f64491471bf.jpg!/rotate/180'}
                twitterCard="summary_large_image"
            />

            {isLoading && (<div className='h-96 flex items-center justify-center'><FetchLoader /></div>)}

            {/* Car Details */}
            {(!isLoading && car) && <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div>
                            <div className="relative overflow-hidden">
                                <div>
                                    <div className="gallery mb-6">
                                        <div className="swiper-container swiper-initialized swiper-horizontal swiper-pointer-events">
                                            <div className="swiper-wrapper" id="swiper-wrapper-5b26c8f3eb7d9756 rounded-lg" aria-live="polite">
                                                <div className="swiper-slide swiper-slide-active w-[559px] h-[400px] border border-gray-200 rounded-lg" role="group" aria-label="1 / 5">
                                                    <img src={selectedImage ? selectedImage : defaultImage} alt={car ? car.title : 'Lala Rental Image'} className='rounded-lg h-full w-full object-cover transform transition-transform duration-300 hover:scale-105' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="gallery-nav relative">
                                        <div className="swiper-container swiper-initialized swiper-horizontal swiper-pointer-events swiper-thumbs">
                                            <div className="swiper-wrapper flex items-center overflow-auto" id="swiper-wrapper-ba56aeabc563cf4d" aria-live="polite">
                                                {car && car.images.length > 1 && car.images.map((image: string, index: number) => (
                                                    <div key={index} className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next w-[133.75px] mr-[8px] cursor-pointer" data-swiper-slide-index="1" role="group" aria-label="2 / 5">
                                                        <div onClick={(e) => { e.preventDefault(); handleImageClick(image); }} className="swiper-slide w-[133.75px] h-[80px] mr-[8px]" data-swiper-slide-index={index} role="group" aria-label={`${index + 1} / ${car.images.length}`}>
                                                            <img src={image} alt={car.title} className='rounded-lg h-full w-full object-cover transform transition-transform duration-300 hover:scale-105' />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold capitalize text-slate-700">{car && car.title}</h3>
                            <h2 className="font-bold flex items-center text-md leading-none text-orange my-3 text-2xl text-green-700">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g opacity=".4" stroke="#37d67a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.752 16.86v2.03c0 1.72-1.6 3.11-3.57 3.11-1.97 0-3.58-1.39-3.58-3.11v-2.03c0 1.72 1.6 2.94 3.58 2.94 1.97 0 3.57-1.23 3.57-2.94Z"></path><path d="M10.75 14.112c0 .5-.14.96-.38 1.36-.59.97-1.8 1.58-3.2 1.58-1.4 0-2.61-.62-3.2-1.58-.24-.4-.38-.86-.38-1.36 0-.86.4-1.63 1.04-2.19.65-.57 1.54-.91 2.53-.91.99 0 1.88.35 2.53.91.66.55 1.06 1.33 1.06 2.19Z"></path><path d="M10.752 14.11v2.75c0 1.72-1.6 2.94-3.57 2.94-1.97 0-3.58-1.23-3.58-2.94v-2.75c0-1.72 1.6-3.11 3.58-3.11.99 0 1.88.35 2.53.91.64.56 1.04 1.34 1.04 2.2Z"></path></g><path d="M22 10.97v2.06c0 .55-.44 1-1 1.02h-1.96c-1.08 0-2.07-.79-2.16-1.87-.06-.63.18-1.22.6-1.63.37-.38.88-.6 1.44-.6H21c.56.02 1 .47 1 1.02Z" stroke="#37d67a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 10.5v-2c0-2.72 1.64-4.62 4.19-4.94.26-.04.53-.06.81-.06h9c.26 0 .51.01.75.05C19.33 3.85 21 5.76 21 8.5v1.45h-2.08c-.56 0-1.07.22-1.44.6-.42.41-.66 1-.6 1.63.09 1.08 1.08 1.87 2.16 1.87H21v1.45c0 3-2 5-5 5h-2.5" stroke="#37d67a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                <span className='ml-3'>{new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(Number(car && car.price))}</span>
                            </h2>

                            <div className='p-3 bg-primary/20 rounded-lg border border-[#03783d]/50 mt-10 mb-5'>
                                <div className="mb-3 font-bold">{car && car.make} - {car && car.car_model}</div>
                                <div className="font-bold">{car && car.transmission} - {car && car.fuel_type}</div>
                            </div>

                            <div className="mb-3"><span>Dealler:</span> <span className="font-semibold">{ car.seller?.fullname }</span></div>
                            <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                            <p className="mb-8">{car && car.description}</p>

                            <div>
                                <div className="mb-8">
                                    <div className="flex flex-wrap items-center mt-8">
                                        <div className="flex items-center">
                                            <button onClick={handleContactClick} className="bg-primary/90 flex items-center rounded-lg leading-none py-4 px-5 md:px-8 font-normal text-sm h-11 text-white transition-all hover:bg-primary/80">
                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6.94 20.63C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l4.94-1.37Z" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M17 15.17c0 .18-.04.37-.13.55a2.279 2.279 0 0 1-1.16 1.1c-.3.13-.63.19-.98.19-.51 0-1.06-.12-1.63-.37-.58-.25-1.15-.58-1.72-.99-.58-.42-1.12-.89-1.64-1.4-.52-.52-.98-1.07-1.4-1.64-.41-.57-.74-1.14-.98-1.71C7.12 10.33 7 9.78 7 9.26c0-.34.06-.67.18-.97.12-.31.31-.59.58-.84.32-.32.67-.47 1.04-.47.14 0 .28.03.41.09.13.06.25.15.34.28l1.16 1.64c.09.13.16.24.2.35.05.11.07.21.07.31 0 .12-.04.24-.11.36s-.16.24-.28.36l-.38.4c-.06.06-.08.12-.08.2 0 .04.01.08.02.12.02.04.03.07.04.1.09.17.25.38.47.64a13.48 13.48 0 0 0 1.53 1.53c.26.22.48.37.65.46.03.01.06.03.09.04.04.02.08.02.13.02.09 0 .15-.03.21-.09l.38-.38c.13-.13.25-.22.36-.28.12-.07.23-.11.36-.11.1 0 .2.02.31.07.11.05.23.11.35.2l1.66 1.18c.13.09.22.2.28.32 0 .12.03.24.03.38Z" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10"></path></svg></span>
                                                <span className='ml-3'>Contact Us</span>
                                            </button>
                                            
                                            <button onClick={handleOpenModal} className="bg-indigo-700 flex items-center rounded-lg leading-none py-4 px-5 md:px-8 font-normal text-sm h-11 text-white transition-all hover:bg-indigo-700/90 ml-2">
                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 5.25v3.9c0 1.49-.76 2.61-2 3.05-.38.13-.8.2-1.25.2h-2.6l-2.89 1.93c-.43.28-1.01-.03-1.01-.54V12.4c-.97 0-1.79-.32-2.36-.89-.57-.57-.89-1.39-.89-2.36v-3.9c0-.45.07-.87.2-1.25.44-1.24 1.56-2 3.05-2h6.5C20.7 2 22 3.3 22 5.25Z" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12.2v1.7c0 3.15-1.8 4.5-4.5 4.5h-9c-2.7 0-4.5-1.35-4.5-4.5V8.5C2 5.35 3.8 4 6.5 4h2.7c-.13.38-.2.8-.2 1.25v3.9c0 .97.32 1.79.89 2.36.57.57 1.39.89 2.36.89v1.39c0 .51.58.82 1.01.54l2.89-1.93h2.6c.45 0 .87-.07 1.25-.2ZM7.398 22h7.2M11 18.398v3.6"></path></g><path d="M18.495 7.25h.01M15.695 7.25h.009M12.894 7.25h.009" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                                <span className='ml-3'>Send Inquiry</span>
                                            </button>

                                            {/* Form for Submitting Cars */}
                                            <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
                                                <h2 className="text-xl font-semibold mb-4 text-slate-700 flex items-center">
                                                    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8.5 19H8c-4 0-6-1-6-6V8c0-4 2-6 6-6h8c4 0 6 2 6 6v5c0 4-2 6-6 6h-.5c-.31 0-.61.15-.8.4l-1.5 2c-.66.88-1.74.88-2.4 0l-1.5-2c-.16-.22-.53-.4-.8-.4Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M15.995 11h.008M11.995 11h.009M7.995 11h.008" stroke="#697689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                                    <span className='ml-2'>Send Your Inquiry Now!</span>
                                                </h2>
                                                <p>Interested in this car? Send us your inquiry and we'll get back to you as soon as possible. Fill out the details below to get started.</p>

                                                <hr className="my-5 border-gray-200" />

                                                <form onSubmit={handleSubmitInquiry}>

                                                    <TextInput
                                                        label="Your Fullname"
                                                        placeholder="Eg: John Doe"
                                                        value={fullname}
                                                        onChange={setFullname}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                    </TextInput>

                                                    <TextInput
                                                        label="Your Email Address"
                                                        placeholder="example@example.com"
                                                        value={email}
                                                        onChange={setEmail}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                    </TextInput>

                                                    <TextAreaInput
                                                        label="Message"
                                                        placeholder="Write a short Message...."
                                                        value={message}
                                                        onChange={setMessage}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 12h12" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 4h-4c-2 0-3 1-3 3v10c0 2 1 3 3 3h4" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                                    </TextAreaInput>

                                                    <div className="flex items-center justify-between mt-4">
                                                        <FormButton text="Send Now" isLoading={isLoading} type="submit" className="mt-5" />
                                                    </div>
                                                </form>
                                            </FormModal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">

                        {/* Car Overview */}
                        <div className="">
                            <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                            <div className="mt-2 w-20 h-1 bg-primary rounded-lg"></div>

                            <div className="grid grid-cols-5 gap-4 mt-8">
                                <div className="text-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200 capitalize">
                                    <span className="text-gray-600">Mileage</span>
                                    <p className="text-gray-800 font-bold text-lg mt-2">{ car.mileage }</p>
                                </div>
                                <div className="text-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200 capitalize">
                                    <span className="text-gray-600">Fuel Type</span>
                                    <p className="text-gray-800 font-bold text-lg mt-2">{ car.fuel_type }</p>
                                </div>
                                <div className="text-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200 capitalize">
                                    <span className="text-gray-600">Transmission</span>
                                    <p className="text-gray-800 font-bold text-lg mt-2">{ car.transmission }</p>
                                </div>
                                <div className="text-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200 capitalize">
                                    <span className="text-gray-600">Autonomy</span>
                                    <p className="text-gray-800 font-bold text-sm mt-2">{ car.autonomy ?? 'N/A' }</p>
                                </div>
                                <div className="text-center bg-gray-50 px-3 py-3 rounded-lg border border-gray-200 capitalize">
                                    <span className="text-gray-600">Seats</span>
                                    <p className="text-gray-800 font-bold text-lg mt-2">{ car.seats }</p>
                                </div>
                            </div>
                        </div>

                        {/* Car Summary */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-800">Summary</h2>
                            <div className="mt-2 w-20 h-1 bg-primary rounded-lg"></div>

                            <div className="grid grid-cols-2 gap-6 mt-8">
                                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <span className="flex items-center gap-2 text-gray-600">
                                        <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                        </svg>
                                        Body Type
                                    </span>
                                    <span className="text-gray-800 font-bold capitalize">{ car.category.name }</span>
                                </div>

                                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <span className="flex items-center gap-2 text-gray-600">
                                        <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16.5v-9m0 0a3.5 3.5 0 013.5-3.5h11a3.5 3.5 0 013.5 3.5v9a3.5 3.5 0 01-3.5 3.5h-11a3.5 3.5 0 01-3.5-3.5zm16.5 0h-15" />
                                        </svg>
                                        Number of Keys
                                    </span>
                                    <span className="text-gray-800 font-bold capitalize">N/A</span>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <span className="flex items-center gap-2 text-gray-600">
                                        <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 12l-7.5 7.5m0 0l-7.5-7.5m7.5 7.5V4.5" />
                                        </svg>
                                        Main Color
                                    </span>
                                    <span className="text-gray-800 font-bold capitalize">{ car.color }</span>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <span className="flex items-center gap-2 text-gray-600">
                                        <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19h6M12 15v4m-4-4h8" />
                                        </svg>
                                        Condition
                                    </span>
                                    <span className="text-gray-800 font-bold capitalize">{ car.condition }</span>
                                </div>
                            </div>
                        </div>

                        {/* Car Features */}
                        <div className="bg-white mt-12">
                            <h2 className="text-2xl font-bold mb-6">Features</h2>
                            <div className="mt-2 w-20 h-1 bg-primary rounded-lg"></div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
                                {car.features && car.features.map((feature, index) => (
                                    <div key={index} className="flex items-center p-4 border rounded-lg justify-between">
                                        <span className="mr-2">{feature}</span>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path opacity=".34" d="m8.38 11.998 2.41 2.42 4.83-4.84" stroke="#37d67a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                <path d="M10.75 2.45c.69-.59 1.82-.59 2.52 0l1.58 1.36c.3.26.86.47 1.26.47h1.7c1.06 0 1.93.87 1.93 1.93v1.7c0 .39.21.96.47 1.26l1.36 1.58c.59.69.59 1.82 0 2.52l-1.36 1.58c-.26.3-.47.86-.47 1.26v1.7c0 1.06-.87 1.93-1.93 1.93h-1.7c-.39 0-.96.21-1.26.47l-1.58 1.36c-.69.59-1.82.59-2.52 0l-1.58-1.36c-.3-.26-.86-.47-1.26-.47H6.18c-1.06 0-1.93-.87-1.93-1.93V16.1c0-.39-.21-.95-.46-1.25l-1.35-1.59c-.58-.69-.58-1.81 0-2.5l1.35-1.59c.25-.3.46-.86.46-1.25V6.2c0-1.06.87-1.93 1.93-1.93h1.73c.39 0 .96-.21 1.26-.47l1.58-1.35Z" stroke="#37d67a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {/* Car Posting Section */}
            {relatedCars.length > 1 && <section className='py-4 lg:py-4'>
                {/* related cars */}
                <CarPostingSection
                    title="Cars you might be interested In"
                    description="Other listings that might interest you based on your current selection."
                    cars={relatedCars}
                    isLoading={isLoading}
                />
            </section>}

            {/* Alert Message */}
            <AlertMessage message={alertMessage} type={alertType} />
        </div>
    );
};

export default CardDetails;
