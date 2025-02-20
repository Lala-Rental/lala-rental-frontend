import React, { useEffect, useState } from 'react';

// Steps
import Stepper from '../stepper/stepper.tsx';
import BasicInformation from '../stepper/basic-information.tsx';
import ImageInformation from '../stepper/image-information.tsx';

import api from '../../services/api.ts';
import AlertMessage from '../alerts/alert-message.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import AuthModal from '../auth/auth-modal.tsx';
import HosterFormModal from './hoster-form.tsx';
import { IProperty } from '../../types/property.type.ts';
import FormButton from '../buttons/form-button.tsx';
import { HosterForm } from '../../types/hoster.type.ts';

interface PropertyFormProps {
    onCallback: (data: IProperty) => void;
    onFallback?: (data: IProperty, id: string) => void;
    isEditing: boolean;
    initialData?: any
}

const propertyApiUrl = "/properties";

const PropertyForm: React.FC<PropertyFormProps> = ({ onCallback, onFallback, isEditing, initialData, }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('available');
    const [images, setImages] = useState<File[]>([]);

    const [currentStep, setCurrentStep] = useState(0);
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [isLoading, setIsloading] = useState(false);
    
    const [propertyDetails, setPropertyDetails] = useState<IProperty | null>(null);
    const [host, setHost] = useState<HosterForm | null>(null);
    
    const [hostModal, setHostModal] = useState(false);
    const [authModal, setAuthModal] = useState(false);
    
    const openHostModal = () => setHostModal(true);
    const openAuthModal = () => setAuthModal(true);

    const closeHosterModal = () => setHostModal(false);
    const closeAuthModal = () => setAuthModal(false);

    const { token, isAuthenticated, user } = useAuth();

    /**
     * When All input filled and let apply validation and submit
     * 
     * @param e 
     * @returns 
     */
    const handleValidations = (e: React.FormEvent) => {
        e.preventDefault();

        const missing: string[] = [];
        
        if (!title) missing.push('title');
        if (!location) missing.push('location');
        if (!price) missing.push('price');
        if (!description) missing.push('description');
        if (images.length === 0) missing.push('images');

        if (missing.length > 0) {
            setMissingFields(missing);
            setAlertMessage("There are missing fields. Please fill all fields");
            setAlertType('error');
            return;
        }

        const payload = { title, description, location, price: Number(price), images, status };

        setPropertyDetails(payload);
        openHostModal();
    };

    /**
     * Handle Seller Information
     * 
     * @param response 
     */
    const handleHosterData = (response: any) => {
        setHost(response);
        closeHosterModal();

        return (isAuthenticated && user) 
            ? handleUserProperty({ access_token: token as string }) : openAuthModal();
    }

    /**
     * handle auth and submit form 
     * 
     * @param response
     */
    const handleUserProperty = (response: { access_token: string }) => {
        const { access_token } = response;
        return isEditing ? handleUpdateForm(access_token) : handleFormSubmision(access_token);
    }

    /**
     * Submit form
     */
    const handleFormSubmision = (access_token: string) => {        
        const missing: string[] = [];

        if (!propertyDetails) {
            setAlertMessage('Some Property details are missing.');
            setAlertType('error');
            return;
        }

        if (missing.length > 0) {
            setMissingFields(missing);
            setAlertMessage("Seller Information must be filled");
            setAlertType('error');
            return;
        }

        try {
            setIsloading(true);

            const formData = new FormData();
            
            formData.append('title', propertyDetails.title);
            formData.append('description', propertyDetails.description);
            formData.append('location', propertyDetails.location);
            formData.append('price', propertyDetails.price.toString());
            formData.append('status', propertyDetails.status);
            formData.append('hoster', JSON.stringify(host));

            // Append images array
            if (propertyDetails.images && propertyDetails.images.length > 0) {
                propertyDetails.images.forEach((image: File) => {
                    formData.append("images", image);
                });
            }

            api.post(propertyApiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${access_token}`
                }
            }).then((response: any) => {
                closeHosterModal();
                resetForm();

                setAlertMessage('Your request successfully submitted!.');
                setAlertType('success');
                setIsloading(false);   
                
                onCallback(response);
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
    };

     /**
     * Submit update form 
     */
    const handleUpdateForm = (access_token: string) => {
        const missing: string[] = [];

        if (!propertyDetails) {
            setAlertMessage('Some Property details are missing.');
            setAlertType('error');
            return;
        }

        if (missing.length > 0) {
            setMissingFields(missing);
            setAlertMessage("Some Information are missing");
            setAlertType('error');
            return;
        }

        try {
            setIsloading(true);

            const formData = new FormData();
            
            formData.append('title', propertyDetails.title);
            formData.append('description', propertyDetails.description);
            formData.append('location', propertyDetails.location);
            formData.append('price', propertyDetails.price.toString());
            formData.append('status', propertyDetails.status);
            formData.append('hoster', JSON.stringify(host));

            if (propertyDetails.images && propertyDetails.images.length > 0) {
                propertyDetails.images.forEach((image: File) => {
                    formData.append("images", image);
                });
            }

            api.put(`/properties/${initialData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access_token}`,
                    'Accept': 'application/json'
                }
            }).then((response: any) => {
                setAlertMessage('Property Updated Successfully.');
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

    /**
     * Reset form
     */
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setLocation('');
        setPrice('');
        setImages([]);
        setStatus('');
    };

    const getErrorField = (field: string) => {
        return missingFields.includes(field) ? `${field} is required` : '';
    };

    // Steps
    const steps = [
        <BasicInformation key="step-1" getErrorField={getErrorField} title={title} setTitle={setTitle} description={description} location={location} status={status} setDescription={setDescription} setLocation={setLocation} setStatus={setStatus} price={price} setPrice={setPrice} inEditMode={initialData ? true : false} />,
        <ImageInformation key="step-2" images={images} setImages={setImages} currentImages={initialData ? (initialData.images ?? []) : []} />,
    ];

    useEffect(() => {
        if (isAuthenticated && user) {
            setHost({
                fullname: user.name,
                email: user.email,
                id: user.id
            });
        };

        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setLocation(initialData.location);
            setPrice(initialData.price);
            setStatus(initialData.status || '');
        }
    }, [initialData, isAuthenticated, user]);

    return (
        <div>
            <form onSubmit={handleValidations}>
                <Stepper steps={steps} currentStep={currentStep} onNext={() => setCurrentStep((prevStep) => prevStep + 1)} onPrevious={() => setCurrentStep((prevStep) => prevStep - 1)} />

                {currentStep === steps.length - 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <FormButton text={initialData ? 'Save Changes' : 'Submit'} isLoading={isLoading} type="submit" className="mt-5" />
                    </div>
                )}
            </form>

            {/* Hoster Form */}
            <HosterFormModal isOpen={hostModal} hoster={host} onClose={closeHosterModal} callback={handleHosterData} getErrorField={getErrorField} />

            {/* Auth Form */}
            <AuthModal isOpen={authModal} onClose={closeAuthModal} callback={handleUserProperty} fallback={() => {}} />

            {/* Alert Message */}
            <AlertMessage message={alertMessage} type={alertType} />
        </div>
    );
};

export default PropertyForm;