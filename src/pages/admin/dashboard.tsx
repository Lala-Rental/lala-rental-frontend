/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/admin/section-title.tsx';
import FormModal from '../../components/models/form-model.tsx';
import CarForm from '../../components/forms/car-form.tsx';
import ErrorBoundary from '../../utils/ErrorBoundary.tsx';
import api from '../../services/api.ts';
import AlertMessage from '../../components/alerts/alert-message.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import BaseTable from '../../components/table/base-table.tsx';
import FetchLoader from '../../components/loaders/fetching-loader.tsx';
import CarRow from '../../components/table/car-row.tsx';
import ConfirmModel from '../../components/models/confirm-model.tsx';

const AdminDashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [isLoading, setIsloading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [formValidation, setFormValidation] = useState('');

    const [cars, setCars] = useState<any[]>([]);
    const [carToUpdate, setCarToUpdate] = useState<any | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteCarId, setDeleteCarId] = useState<string | null>(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    
    const { token } = useAuth();
    
    const openDeleteModal = (id: string) => () => {
        setDeleteCarId(id);
        setIsDeleteOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
        setDeleteCarId(null);
    };

    /**
     * Update Car Form
     * 
     * @param car 
     */
    const handleUpdateCarForm = (car: any) => () => {
        setIsModalOpen(true);
        setCarToUpdate(car);
        setIsEditing(true);
    };

    /**
     *  Handle Callbacks
     * 
     * @param errors 
     */
    const handleFormError = (error: any) => setFormValidation(error);
    const handleCarSubmit = (response: any) => window.location.reload();

    /**
     * Fetch All Cars
     * 
     * @returns
     */
    const fetchAllCars = async () => {
        try {
            setIsFetching(true);

            api.get('/cars/registered', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    direction: 'desc',
                }
            }).then((response: any) => {
                setCars(response.data.data);
                setIsFetching(false);
            }).catch((error: { response: { data: { message: string; }; }; }) => {
                setAlertMessage('An error occurred. '+error.response.data.message);
                setAlertType('error');
                setIsFetching(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. Something went wrong');
            setAlertType('error');
            setIsFetching(false);
        }
    };

    /**
     * Confurm Delete Car
     * 
     * @param id 
     */
    const deleteSingleCar = async () => {
        if (!deleteCarId) return;
        
        setIsloading(true);

        try {
            await api.delete(`/cars/delete/${deleteCarId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAlertMessage('Car deleted successfully.');
            setAlertType('success');
            fetchAllCars();
        } catch (error) {
            setAlertMessage('An error occurred. ' + (error.response?.data?.message || 'Something went wrong'));
            setAlertType('error');
        } finally {
            setIsDeleteOpen(false);
            setDeleteCarId(null);
            setIsloading(false);
        }
    };

    /**
     * Handle Car Approval
     * 
     * @param car 
     */
    const handleCarApproval = (car: any) => () => {
        setIsloading(true);

        try {
            api.post(`/cars/approve/${car._id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            }).then(() => {
                setAlertMessage('Car approved successfully.');
                setAlertType('success');
                setIsloading(false);
                fetchAllCars();
            }).catch((error) => {
                setAlertMessage('An error occurred. Something went wrong');
                setAlertType('error');
                setIsloading(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. ' + (error.response?.data?.message || 'Something went wrong'));
            setAlertType('error');
            setIsloading(false);
        }
    }

    useEffect(() => {
        if (token) 
            fetchAllCars();
        
    }, [token]);

    return (
        <ErrorBoundary>
            <div className='section'>
                <div className='flex justify-between mb-5'>
                    {/* Section Title */}
                    <SectionTitle title='Manage All Cars' path='cars' />

                    <div className='flex items-center'>
                        {(isLoading || isFetching) && <div className='mr-3'> <FetchLoader /> </div>}
                        
                        <button onClick={handleOpenModal} className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded-full flex items-center text-sm">
                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 12h12M12 18V6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                            <span>Post New Car</span>
                        </button>
                    </div>
                </div>

                {/* Table Data */}
                <BaseTable title='All Posted Cars' data={cars} itemsPerPage={5} headers={[
                    { key: 'No', label: 'NO' },
                    { key: 'image', label: 'Image' },
                    { key: 'title', label: 'Title', sortable: true },
                    { key: 'seller', label: 'Seller' },
                    { key: 'make', label: 'Brand', sortable: true },
                    { key: 'model', label: 'Model', sortable: true },
                    { key: 'year', label: 'Year', sortable: true },
                    { key: 'transmission', label: 'Transmission' },
                    { key: 'verified', label: 'Verified' },
                    { key: 'price', label: 'Price', sortable: true },
                    { key: 'status', label: 'Status' },
                    { key: 'actions', label: 'Actions' },
                ]} renderRow={(index: number, car: any) => <CarRow index={index} car={car} deleteCar={openDeleteModal} updateCar={handleUpdateCarForm} approveCar={handleCarApproval} />} />

                {/* Form for Submitting Cars */}
                <FormModal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h2 className="text-xl font-semibold mb-4 text-slate-700 flex items-center">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.51 2.83H8.49C6 2.83 5.45 4.07 5.13 5.59L4 11h16l-1.13-5.41c-.32-1.52-.87-2.76-3.36-2.76ZM21.99 19.82c.11 1.17-.83 2.18-2.03 2.18h-1.88c-1.08 0-1.23-.46-1.42-1.03l-.2-.6c-.28-.82-.46-1.37-1.9-1.37H9.44c-1.44 0-1.65.62-1.9 1.37l-.2.6C7.15 21.54 7 22 5.92 22H4.04c-1.2 0-2.14-1.01-2.03-2.18l.56-6.09C2.71 12.23 3 11 5.62 11h12.76c2.62 0 2.91 1.23 3.05 2.73l.56 6.09ZM4 8H3M21 8h-1M12 3v2M10.5 5h3M6 15h3M15 15h3" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                        <span className='ml-2'>List Your Car in Minutes!</span>
                    </h2>
                    <p>Reach potential Buyers with an eye-catching Listing. Fill out the details below to get started</p>
                    
                    {formValidation && (<div className='bg-transparent my-5 flex items-center'>
                        <p className={`bg-teal-accent-400 inline-block rounded-full bg-red-100 border-red-200 text-red-900 px-3 py-1 border text-sm font-semibold tracking-wider`}>{formValidation}</p>
                    </div>)}

                    <hr className="my-5 border-gray-200" />
                    
                    <CarForm 
                        onCallback={handleCarSubmit} 
                        onFallback={handleFormError}
                        isEditing={isEditing} 
                        initialData={carToUpdate} 
                    />
                </FormModal>

                {/* Alert Message */}
                <AlertMessage message={alertMessage} type={alertType} />

                {/* Confirm Model */}
                <ConfirmModel isOpen={isDeleteOpen} onClose={closeDeleteModal} onConfirm={deleteSingleCar}  title='Delete Car' message='Are you sure you want to delete this car?' isLoading={isLoading} />
            </div>
        </ErrorBoundary>
    );
}

export default AdminDashboard;