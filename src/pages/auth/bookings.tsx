/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import SectionTitle from '../../components/admin/section-title.tsx';
import ErrorBoundary from '../../utils/ErrorBoundary.tsx';
import BookingListing from '../../components/auth/booking-listing.tsx';

const UserBookings: React.FC = () => {
    return (
        <ErrorBoundary>
            <div className='section'>
                <div className='flex justify-between mb-5'>
                    {/* Section Title */}
                    <SectionTitle title='Manage Bookings' path='Bookings' />
                </div>

                {/* Booking listing */}
                <BookingListing />
            </div>
        </ErrorBoundary>
    );
}

export default UserBookings;