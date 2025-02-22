/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import api from '../services/api.ts';
import { useParams } from 'react-router-dom';
import AlertMessage from '../components/alerts/alert-message.tsx';
import MetaTags from '../components/MetaTags.tsx';
import CardListing from '../components/sections/listings/card-listing.tsx';
import { IPropertyDetails } from '../types/property.type.ts';
import BookingForm from '../components/forms/booking-form.tsx';
import CircleSpinner from '../components/loaders/circle-spinner.tsx';

const CardDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const contactNumber = process.env.REACT_APP_ADMIN_PHONE;

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [propertyDetails, setPropertyDetails] = useState<IPropertyDetails | null>(null);
    const [relatedProperties, setRelatedProperties] = useState<any[]>([]);
    
    const [defaultImage, setDefaultImage] = useState<string>('https://cdn.bestsuppliers.com/seo_products_img/biuloo/23798d3c6f853ade868f0f64491471bf.jpg!/rotate/180');
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsloading] = useState(false);
  
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleContactClick = () => {
        const whatsappUrl = `https://wa.me/${contactNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    const fetchCardDetails = async () => {
        
        setIsloading(true);

        try {
            api.get(`/properties/${id}`).then((response: any) => {
                setPropertyDetails(response.data.data);
                setIsloading(false);
            }).catch(() => {
                setAlertMessage('An error occurred. Unable to fetch details.');
                setAlertType('error');
                setIsloading(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. Something went wrong');
            setAlertType('error');
            setIsloading(false);
        }
    }

    const fetchRelatedProperties = async () => {
        try {
            api.get(`/properties/${id}/related`).then((response: any) => {
                setRelatedProperties(response.data.data);
                setIsloading(false);
            }).catch(() => {
                setAlertMessage('An error occurred. Unable to fetch related data.');
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
        if (propertyDetails && propertyDetails.images && propertyDetails.images.length > 0) {
            setDefaultImage((propertyDetails.images[0] as unknown as string));
        }
    }, [propertyDetails]);

    useEffect(() => {
        fetchCardDetails();
        fetchRelatedProperties();
    }, [id]);

    return (
        <div>
            <MetaTags
                title={`${propertyDetails?.title} - Lala Rental`} 
                description={propertyDetails ? propertyDetails.description : 'Discover your dream property from our extensive listings. Quality properties for every budget and need.'}
                keywords="Lala Rental, property listings, properties, new properties, used properties, property trader, property trader africa, property trader rwanda, property trader kenya, property trader nigeria, property trader ghana, property trader south africa, property trader tanzania, property trader uganda"
                canonical={`${process.env.PUBLIC_URL}/properties/${id}`}
                ogTitle={`${propertyDetails?.title} - Lala Rental`} 
                ogDescription={propertyDetails ? propertyDetails.description : 'Discover your dream property from our extensive listings. Quality properties for every budget and need.'}
                ogImage={propertyDetails ? propertyDetails.images[0] : 'https://cdn.bestsuppliers.com/seo_products_img/biuloo/23798d3c6f853ade868f0f64491471bf.jpg!/rotate/180'}
                twitterCard="summary_large_image"
            />

            {isLoading && (<div className='h-96 flex items-center justify-center'><CircleSpinner /></div>)}

            {/* Car Details */}
            {(!isLoading && propertyDetails) && <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div>
                            <div className="relative overflow-hidden">
                                <div>
                                    <div className="gallery mb-6">
                                        <div className="swiper-container swiper-initialized swiper-horizontal swiper-pointer-events">
                                            <div className="swiper-wrapper" id="swiper-wrapper-5b26c8f3eb7d9756 rounded-lg" aria-live="polite">
                                                <div className="swiper-slide swiper-slide-active w-[559px] h-[400px] rounded-lg" role="group" aria-label="1 / 5">
                                                    <img src={selectedImage ? selectedImage : defaultImage} alt={propertyDetails ? propertyDetails.title : 'Lala Rental Image'} className='rounded-lg h-full w-full object-cover transform transition-transform duration-300 hover:scale-105' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="gallery-nav relative">
                                        <div className="swiper-container swiper-initialized swiper-horizontal swiper-pointer-events swiper-thumbs">
                                            <div className="swiper-wrapper flex items-center overflow-auto" id="swiper-wrapper-ba56aeabc563cf4d" aria-live="polite">
                                                {propertyDetails && propertyDetails.images.length > 1 && propertyDetails.images.map((image: string, index: number) => (
                                                    <div key={index} className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next w-[133.75px] mr-[8px] cursor-pointer" data-swiper-slide-index="1" role="group" aria-label="2 / 5">
                                                        <div onClick={(e) => { e.preventDefault(); handleImageClick(image); }} className="swiper-slide w-[133.75px] h-[80px] mr-[8px]" data-swiper-slide-index={index} role="group" aria-label={`${index + 1} / ${propertyDetails.images.length}`}>
                                                            <img src={image} alt={propertyDetails.title} className='rounded-lg h-full w-full object-cover transform transition-transform duration-300 hover:scale-105' />
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
                            <h3 className="text-2xl font-bold capitalize text-white">{propertyDetails && propertyDetails.title}</h3>
                            
                            <h2 className="font-bold flex items-center text-md leading-none text-orange my-3 text-2xl text-slate-100">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g opacity=".4" stroke="#37d67a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.752 16.86v2.03c0 1.72-1.6 3.11-3.57 3.11-1.97 0-3.58-1.39-3.58-3.11v-2.03c0 1.72 1.6 2.94 3.58 2.94 1.97 0 3.57-1.23 3.57-2.94Z"></path><path d="M10.75 14.112c0 .5-.14.96-.38 1.36-.59.97-1.8 1.58-3.2 1.58-1.4 0-2.61-.62-3.2-1.58-.24-.4-.38-.86-.38-1.36 0-.86.4-1.63 1.04-2.19.65-.57 1.54-.91 2.53-.91.99 0 1.88.35 2.53.91.66.55 1.06 1.33 1.06 2.19Z"></path><path d="M10.752 14.11v2.75c0 1.72-1.6 2.94-3.57 2.94-1.97 0-3.58-1.23-3.58-2.94v-2.75c0-1.72 1.6-3.11 3.58-3.11.99 0 1.88.35 2.53.91.64.56 1.04 1.34 1.04 2.2Z"></path></g><path d="M22 10.97v2.06c0 .55-.44 1-1 1.02h-1.96c-1.08 0-2.07-.79-2.16-1.87-.06-.63.18-1.22.6-1.63.37-.38.88-.6 1.44-.6H21c.56.02 1 .47 1 1.02Z" stroke="#37d67a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 10.5v-2c0-2.72 1.64-4.62 4.19-4.94.26-.04.53-.06.81-.06h9c.26 0 .51.01.75.05C19.33 3.85 21 5.76 21 8.5v1.45h-2.08c-.56 0-1.07.22-1.44.6-.42.41-.66 1-.6 1.63.09 1.08 1.08 1.87 2.16 1.87H21v1.45c0 3-2 5-5 5h-2.5" stroke="#37d67a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                <span className='ml-3'>{new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(Number(propertyDetails && propertyDetails.price))}</span>
                            </h2>

                            <div className="mb-3  text-white"><span>Hoster:</span> <span className="font-semibold text-white">{ propertyDetails.hoster?.fullname }</span></div>
                            <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                            <p className="mb-8 text-white">{propertyDetails && propertyDetails.description}</p>

                            <div>
                                <div className="mb-8">
                                    <div className="flex flex-wrap items-center mt-8">
                                        <div className="flex items-center">
                                            <button onClick={handleContactClick} className="ring-1 ring-gray-200 flex items-center rounded-lg leading-none py-4 px-5 md:px-8 font-normal text-sm h-11 text-white transition-all hover:bg-primary/80">
                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6.94 20.63C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l4.94-1.37Z" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M17 15.17c0 .18-.04.37-.13.55a2.279 2.279 0 0 1-1.16 1.1c-.3.13-.63.19-.98.19-.51 0-1.06-.12-1.63-.37-.58-.25-1.15-.58-1.72-.99-.58-.42-1.12-.89-1.64-1.4-.52-.52-.98-1.07-1.4-1.64-.41-.57-.74-1.14-.98-1.71C7.12 10.33 7 9.78 7 9.26c0-.34.06-.67.18-.97.12-.31.31-.59.58-.84.32-.32.67-.47 1.04-.47.14 0 .28.03.41.09.13.06.25.15.34.28l1.16 1.64c.09.13.16.24.2.35.05.11.07.21.07.31 0 .12-.04.24-.11.36s-.16.24-.28.36l-.38.4c-.06.06-.08.12-.08.2 0 .04.01.08.02.12.02.04.03.07.04.1.09.17.25.38.47.64a13.48 13.48 0 0 0 1.53 1.53c.26.22.48.37.65.46.03.01.06.03.09.04.04.02.08.02.13.02.09 0 .15-.03.21-.09l.38-.38c.13-.13.25-.22.36-.28.12-.07.23-.11.36-.11.1 0 .2.02.31.07.11.05.23.11.35.2l1.66 1.18c.13.09.22.2.28.32 0 .12.03.24.03.38Z" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10"></path></svg></span>
                                                <span className='ml-3'>Contact Us</span>
                                            </button>
                                            
                                            <button onClick={handleOpenModal} className="bg-indigo-700 flex items-center rounded-lg leading-none py-4 px-5 md:px-8 font-normal text-sm h-11 text-white transition-all hover:bg-indigo-700/90 ml-2">
                                                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 5.25v3.9c0 1.49-.76 2.61-2 3.05-.38.13-.8.2-1.25.2h-2.6l-2.89 1.93c-.43.28-1.01-.03-1.01-.54V12.4c-.97 0-1.79-.32-2.36-.89-.57-.57-.89-1.39-.89-2.36v-3.9c0-.45.07-.87.2-1.25.44-1.24 1.56-2 3.05-2h6.5C20.7 2 22 3.3 22 5.25Z" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12.2v1.7c0 3.15-1.8 4.5-4.5 4.5h-9c-2.7 0-4.5-1.35-4.5-4.5V8.5C2 5.35 3.8 4 6.5 4h2.7c-.13.38-.2.8-.2 1.25v3.9c0 .97.32 1.79.89 2.36.57.57 1.39.89 2.36.89v1.39c0 .51.58.82 1.01.54l2.89-1.93h2.6c.45 0 .87-.07 1.25-.2ZM7.398 22h7.2M11 18.398v3.6"></path></g><path d="M18.495 7.25h.01M15.695 7.25h.009M12.894 7.25h.009" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                                                <span className='ml-3'>Book Now</span>
                                            </button>

                                            {/* Form for Submitting data */}
                                            <BookingForm propertyId={id as string} isOpen={isModalOpen} onClose={handleCloseModal}  />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {/* Related Properities Section */}
            {relatedProperties.length > 1 && <section className='py-4 lg:py-4'>
                {/* related Properties */}
                <CardListing
                    title="Properties you might be interested In"
                    description="Other listings that might interest you based on your current selection."
                    datas={relatedProperties}
                    isLoading={isLoading}
                />
            </section>}

            {/* Alert Message */}
            <AlertMessage message={alertMessage} type={alertType} />
        </div>
    );
};

export default CardDetails;
