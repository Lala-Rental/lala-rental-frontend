/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import SectionTitle from '../../components/admin/section-title.tsx';
import FormModal from '../../components/models/form-model.tsx';
import ErrorBoundary from '../../utils/ErrorBoundary.tsx';

import PropertyListing from '../../components/auth/property-listing.tsx';
import PropertyForm from '../../components/forms/property-form.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import api from '../../services/api.ts';
import CircleSpinner from '../../components/loaders/circle-spinner.tsx';
import AlertMessage from '../../components/alerts/alert-message.tsx';
import PropertyBookingsModal from '../../components/auth/property-bookings-modal.tsx';

const UserDashboard: React.FC = () => {
    const { token } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValidation, setFormValidation] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [initialData, setInitialData] = useState<any>({});
    const [isLoading, setIsloading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
    const [bookingsData, setBookingsData] = useState<any>([]);

    /**
     *  Handle Callbacks
     * 
     * @param errors 
     */
    const handleFormError = (error: any) => setFormValidation(error);
    const handleFormSubmit = (response: any) => window.location.reload();
    
    const handleFormEditing = (data: any) => {
        setIsEditing(true);
        setInitialData(data);
        handleOpenModal();
    };

    const handleFormDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            setIsloading(true);

            try {
                api.delete(`/properties/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }).then((response: any) => {
                    setAlertMessage('Property deleted successfully');
                    setAlertType('success');
                    setIsloading(false);
                }).catch((error: { response: { data: { message: string; }; }; }) => {
                    setAlertMessage('An error occurred. '+error.response.data.message);
                    setAlertType('error');
                    setIsloading(false);
                });
            } catch (error) {
                setAlertMessage('An error occurred. Something went wrong');
                setAlertType('error');
                setIsloading(false);
            }
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
   
    const handleOpenBookingsModal = (propertyId: string) => {
        fetchBookings(propertyId);
        setIsBookingsModalOpen(true);
    };

    const handleCloseBookingsModal = () => setIsBookingsModalOpen(false);

    const fetchBookings = async (id: string) => {
        setIsloading(true);

        try {
            api.get(`/bookings/property/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    direction: 'desc',
                }
            }).then((response: any) => {
                setBookingsData(response.data.data);
                setIsloading(false);
            }).catch((error: { response: { data: { message: string; }; }; }) => {
                setAlertMessage('An error occurred. '+error.response.data.message);
                setAlertType('error');
                setIsloading(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. Something went wrong');
            setAlertType('error');
            setIsloading(false);
        }
    }
    
    return (
        <ErrorBoundary>
            <div className='section min-h-screen'>
                <div className='flex justify-between mb-5'>
                    {/* Section Title */}
                    <SectionTitle title='Manage Properties' path='Properties' />

                    <div className='flex items-center'>                        
                        <button onClick={handleOpenModal} className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded-full flex items-center text-sm">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 12h12M12 18V6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                            <span>New Property</span>
                        </button>
                    </div>
                </div>

                {/* is Loading */}
                {isLoading && <CircleSpinner />}

                {/* property listing */}
                <PropertyListing onPreview={handleOpenBookingsModal} onEditing={handleFormEditing} onDelete={handleFormDelete} />

                {/* Bookings Modal */}
                <PropertyBookingsModal data={bookingsData} isOpen={isBookingsModalOpen} onClose={handleCloseBookingsModal} />

                {/* Form for Submitting */}
                <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h2 className="text-xl font-semibold mb-4 text-slate-700 flex items-center">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.51 2.83H8.49C6 2.83 5.45 4.07 5.13 5.59L4 11h16l-1.13-5.41c-.32-1.52-.87-2.76-3.36-2.76ZM21.99 19.82c.11 1.17-.83 2.18-2.03 2.18h-1.88c-1.08 0-1.23-.46-1.42-1.03l-.2-.6c-.28-.82-.46-1.37-1.9-1.37H9.44c-1.44 0-1.65.62-1.9 1.37l-.2.6C7.15 21.54 7 22 5.92 22H4.04c-1.2 0-2.14-1.01-2.03-2.18l.56-6.09C2.71 12.23 3 11 5.62 11h12.76c2.62 0 2.91 1.23 3.05 2.73l.56 6.09ZM4 8H3M21 8h-1M12 3v2M10.5 5h3M6 15h3M15 15h3" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                        <span className='ml-2'>Create New Property!</span>
                    </h2>

                    <p>Reach potential Buyers with an eye-catching Listing. Fill out the details below to get started</p>
                    
                    {formValidation && (<div className='bg-transparent my-5 flex items-center'>
                        <p className={`bg-teal-accent-400 inline-block rounded-full bg-red-100 border-red-200 text-red-900 px-3 py-1 border text-sm font-semibold tracking-wider`}>{formValidation}</p>
                    </div>)}

                    <hr className="my-5 border-gray-200" />
                    
                    <PropertyForm 
                        onCallback={handleFormSubmit} 
                        onFallback={handleFormError}
                        isEditing={isEditing} 
                        initialData={initialData} 
                    />
                </FormModal>

                {/* Alert Message */}
                <AlertMessage message={alertMessage} type={alertType} />
            </div>
        </ErrorBoundary>
    );
}

export default UserDashboard;