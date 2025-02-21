import React, { useState } from 'react';
import FormModal from '../models/form-model.tsx';
import TextInput from '../inputs/text-input.tsx';
import FormButton from '../buttons/form-button.tsx';
import AlertMessage from '../alerts/alert-message.tsx';
import api from '../../services/api.ts';
import { useAuth } from '../../contexts/AuthContext.tsx';
import AuthModal from '../auth/auth-modal.tsx';

interface BookingFormProps {
    propertyId: string;
    isOpen: boolean;
    onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ propertyId, isOpen, onClose }) => {
    const { token, isAuthenticated, user } = useAuth();
    const [checkinDate, setCheckinDate] = useState<string>('');
    const [checkoutDate, setCheckoutDate] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [isLoading, setIsloading] = useState(false);
    const [authModal, setAuthModal] = useState(false);

    const openAuthModal = () => setAuthModal(true);
    const closeAuthModal = () => setAuthModal(false);

    const handleCheckinDateChange = (value: string) => {
        const selectedDate = value;
        const today = new Date();
        const tomorrow = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];

        if (selectedDate < tomorrow) {
            setAlertMessage('Check-in date must be greater than today.');
            setAlertType('error');
        } else {
            setAlertMessage('');
            setCheckinDate(selectedDate);
        }
    };

    const handleCheckoutDateChange = (value: string) => {
        const selectedDate = value;

        if (selectedDate <= checkinDate) {
            setAlertMessage('Check-out date must be greater than the check-in date.');
            setAlertType('error');
        } else {
            setAlertMessage('');
            setCheckoutDate(selectedDate);
        }
    };

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();

        if (!checkinDate || !checkoutDate) {
            setAlertMessage('all inputs are required');
            setAlertType('error');
            return;
        }

        return (isAuthenticated && user) 
            ? handleBookingForm(token as string) : openAuthModal();
    }

    const handleAuthCallback = (response: { access_token: string }) => {
        const { access_token } = response;
        return handleBookingForm(access_token);
    }

    const handleBookingForm = (access_token: string) => {
        if (propertyId) {

            try {
                setIsloading(true);
    
                api.post('/bookings', { 
                    checkIn: checkinDate,
                    checkOut: checkoutDate,
                    propertyId: propertyId
                }, {
                    headers: { 
                        'Accept': 'application/json',
                        Authorization: `Bearer ${access_token}`
                    }
                }).then((response: any) => {
                    setAlertMessage(response.data.message);
                    setAlertType('success');
                    setIsloading(false);
                    onClose();
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
        } else {
            setAlertMessage('An error occurred. Please try again or Reflesh the page.');
            setAlertType('error');
            setIsloading(false);
        }
    }

    return (<>
        <FormModal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4 text-slate-700 flex items-center">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8.5 19H8c-4 0-6-1-6-6V8c0-4 2-6 6-6h8c4 0 6 2 6 6v5c0 4-2 6-6 6h-.5c-.31 0-.61.15-.8.4l-1.5 2c-.66.88-1.74.88-2.4 0l-1.5-2c-.16-.22-.53-.4-.8-.4Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M15.995 11h.008M11.995 11h.009M7.995 11h.008" stroke="#697689" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                <span className='ml-2'>Send Your Booking Now!</span>
            </h2>
            <p>Interested in this property? Send us your booking and we'll get back to you as soon as possible. Fill out the details below to get started.</p>

            <hr className="my-5 border-gray-200" />

            <form onSubmit={handleBooking}>
                <TextInput
                    label="Checkin Date"
                    placeholder="Eg: 21st July 2025"
                    type="date"
                    value={checkinDate}
                    onChange={handleCheckinDateChange}
                    min={new Date().toISOString().split('T')[0]}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </TextInput>
                <TextInput
                    label="Checkout Date"
                    placeholder="Eg: 29st July 2025"
                    value={checkoutDate}
                    type="date"
                    onChange={handleCheckoutDateChange}
                    min={checkinDate}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </TextInput>

                <div className="flex items-center justify-between mt-4">
                    <FormButton text="Send Now" isLoading={isLoading} type="submit" className="mt-5" />
                </div>
            </form>
        </FormModal>

        {/* Auth Form */}
        <AuthModal isOpen={authModal} onClose={closeAuthModal} callback={handleAuthCallback} fallback={() => {}} />
        
        {/* Alert Message */}
        <AlertMessage message={alertMessage} type={alertType} />
    </>);
}

export default BookingForm;