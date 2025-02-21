import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../components/forms/property-form.tsx';

const QuickPost: React.FC = () => {
    const navigate = useNavigate();
    const [formValidation, setFormValidation] = useState('');

    /**
     *  Handle Callbacks
     * 
     * @param errors 
     */
    const handleFormError = (error: any) => setFormValidation(error);
    const handleFormSubmit = (response: any) => navigate('/listings');

    return (
        <section className="bg-primary">
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center px-2 py-10 sm:px-6 lg:px-10 sm:py-16 lg:py-10">
                    
                    <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 lg:p-12 xl:p-16 w-full max-w-2xl">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">List Your House in Minutes!</h2>
                        <p className="mt-2 text-base text-gray-600">Reach potential renters with an eye-catching listing. Fill out the details below to get started</p>

                        {formValidation && (<div className='bg-transparent my-5 flex items-center'>
                            <p className={`bg-teal-accent-400 inline-block rounded-full bg-red-100 border-red-200 text-red-900 px-3 py-1 border text-sm font-semibold tracking-wider`}>{formValidation}</p>
                        </div>)}

                        <PropertyForm 
                            onCallback={handleFormSubmit} 
                            onFallback={handleFormError}
                            isEditing={false} 
                            initialData={null} 
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

export default QuickPost;