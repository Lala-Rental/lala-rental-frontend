import React from 'react';
import MetaTags from '../components/MetaTags.tsx';

const About: React.FC = () => {
    return (
        <>
            <MetaTags
                title="About Us - Lala Rental" 
                description="Learn more about Lala Rental, our mission, and our commitment to providing the best car trading experience. Discover how we can help you find your dream car and support you every step of the way."
                keywords="Lala Rental, about us, car trading, car trader, car trader africa, car trader rwanda, car trader kenya, car trader nigeria, car trader ghana, car trader south africa, car trader tanzania, car trader uganda"
                canonical={`${process.env.PUBLIC_URL}/about-us`}
                ogTitle="About Us - Lala Rental" 
                ogDescription="Discover more about Lala Rental, our mission, and our dedication to providing the best car trading experience. Learn how we can help you find your dream car."
                ogImage={`${process.env.PUBLIC_URL}/images/logo.jpeg`}
                twitterCard="summary_large_image"
            />

            <section className="py-10 bg-white sm:py-16 lg:py-24">
                <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="grid items-center grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-20">
                        <div className="">
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Elevate Your Experience with Us</h2>
                            <p className="text-base leading-relaxed text-gray-600 mt-10">
                                Join us on a way to transform your experience. Our innovative solutions and dedicated team are here to help you achieve new heights. Experience unparalleled growth and success with our expert guidance and support.
                            </p>
                        </div>

                        <div className="relative pl-20 pr-6 sm:pl-6 md:px-0">
                            <div className="relative w-[500px] mt-4 mb-10 ml-auto">
                                <img className="ml-auto" src="https://i.etsystatic.com/20513864/r/il/09922b/4068615937/il_fullxfull.4068615937_f2cr.jpg" alt="Happy clients at Consult Solution" />

                                <img className="absolute -top-4 -left-12" src="https://cdn.rareblocks.xyz/collection/celebration/images/features/1/wavey-lines.svg" alt="" />

                                <div className="absolute -bottom-10 -left-16">
                                    <div className="bg-yellow-300">
                                        <div className="px-8 py-10">
                                            <span className="block text-4xl font-bold text-black lg:text-5xl"> 50% </span>
                                            <span className="block mt-2 text-base leading-tight text-black"> Low Price Rate <br />On Everything </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
