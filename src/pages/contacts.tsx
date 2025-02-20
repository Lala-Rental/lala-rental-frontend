import React, { useState } from 'react';
import api from '../services/api.ts';
import AlertMessage from '../components/alerts/alert-message.tsx';
import FetchLoader from '../components/loaders/fetching-loader.tsx';
import MetaTags from '../components/MetaTags.tsx';

const Contacts: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    const handleSubmit = async () => {
        if (!name || !email || !message) {
            setAlertType('error');
            setAlertMessage('Please fill all fields!');
            return;
        }

        setIsLoading(true);

        try {
            api.post('/user/contacts', { name, email, message })
                .then(() => {
                    setAlertType('success');
                    setAlertMessage('Message sent successfully!');
                    setIsLoading(false);

                    setName('');
                    setEmail('');
                    setMessage('');
                }).catch(() => {
                    setAlertType('error');
                    setAlertMessage('An error occurred, please try again!');
                    setIsLoading(false);
                });
        } catch (error) {
            setAlertType('error');
            setAlertMessage('An error occurred, please try again!');
            setIsLoading(false);
        }
    }

    return (
        <>
            <MetaTags 
                title="Lala Rental" 
                description="Discover a wide range of properties to suit every need and budget. Whether you're looking for the latest listings, reliable used properties, or something in between, we have it all. Start your journey with us today and find the perfect property for you."
                keywords="Lala Rental, properties, property rental, property rental africa, property rental rwanda, property rental kenya, property rental nigeria, property rental ghana, property rental south africa, property rental tanzania, property rental uganda"
                canonical={`${process.env.PUBLIC_URL}/`}
                ogTitle="Lala Rental" 
                ogDescription="Find your dream property from our extensive collection. Quality properties for every budget." 
                ogImage={`${process.env.PUBLIC_URL}/images/logo.jpeg`}
                twitterCard="summary_large_image"
            />

            <section className="py-10 bg-white sm:py-16 lg:py-24">
                <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:items-stretch md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
                        <div className="flex flex-col justify-between lg:py-5">
                            <div>
                                <h2 className="text-3xl font-bold leading-tight text-slate-700 sm:text-4xl lg:leading-tight lg:text-5xl">It’s time to build something exciting!</h2>
                                
                                <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-slate-700">
                                    Partner with us to unlock the full potential of your business. Reach out today and let's turn your vision into reality. Your success story begins with a single step!
                                </p>

                                <img className="relative z-10 max-w-xs mx-auto -mb-16 md:hidden" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line-mobile.svg" alt="" />
                                <img className="hidden w-full translate-x-24 translate-y-8 md:block" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line.svg" alt="" />
                            </div>

                            <div className="hidden md:mt-auto md:block">
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                    <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                    <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                    <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                    <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                </div>

                                <blockquote className="mt-6">
                                    <p className="text-lg leading-relaxed text-slate-700">You made it so simple. This site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.</p>
                                </blockquote>

                                <div className="flex items-center mt-8">
                                    <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="/images/member1.jpeg" alt='Eric Niyongira at Lala Rental' />
                                    <div className="ml-4">
                                        <p className="text-base font-semibold text-slate-700">Eric NIYONGIRA</p>
                                        <p className="mt-px text-sm text-gray-400">Research Officer</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:pl-12">
                            <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
                                <div className="p-6 sm:p-10">
                                    <h3 className="text-3xl font-semibold text-black">Get a Free Quote Today!</h3>
                                    <p className="mt-4 text-base text-gray-600">
                                        Unlock the potential of your business with our expert solutions. Contact us now and take the first step towards success.
                                    </p>

                                    <div className="space-y-6 mt-10">
                                        <div>
                                            <label className="text-base font-medium text-gray-900"> Your name </label>
                                            <div className="mt-2.5 relative">
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Enter your full name"
                                                    className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-[#03783d] focus:border-[#03783d] caret-[#03783d]"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-base font-medium text-gray-900"> Email address </label>
                                            <div className="mt-2.5 relative">
                                                <input
                                                    type="text"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your full name"
                                                    className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-[#03783d] focus:border-[#03783d] caret-[#03783d]"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-base font-medium text-gray-900"> Short Message </label>
                                            <div className="mt-2.5 relative">
                                                <textarea
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    placeholder="Enter your message"
                                                    className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-[#03783d] focus:border-[#03783d] caret-[#03783d]"
                                                    rows={4}
                                                ></textarea>
                                            </div>
                                        </div>

                                        {!isLoading && <div>
                                            <button onClick={handleSubmit} type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-primary border border-transparent rounded-md focus:outline-none hover:bg-primary/90 focus:bg-primary/80">
                                                Get Free Quote
                                            </button>
                                        </div>}

                                        {isLoading && <div className='mr-3'> <FetchLoader /> </div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:hidden">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    />
                                </svg>
                                <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    />
                                </svg>
                                <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    />
                                </svg>
                                <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    />
                                </svg>
                                <svg className="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                    />
                                </svg>
                            </div>

                            <blockquote className="mt-6">
                                <p className="text-lg leading-relaxed text-white">You made it so simple. This site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.</p>
                            </blockquote>

                            <div className="flex items-center mt-8">
                                <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="/images/member1.jpeg" alt='Eric Niyongira at Lala Rental' />
                                <div className="ml-4">
                                    <p className="text-base font-semibold text-white">Eric NIYONGIRA</p>
                                    <p className="mt-px text-sm text-gray-400">Research Officer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alert Message */}
                <AlertMessage message={alertMessage} type={alertType} />
            </section>
        </>
    );
};

export default Contacts;
