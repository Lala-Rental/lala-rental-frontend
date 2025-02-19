/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SelectInput from '../../inputs/select-input.tsx';
import TextAreaInput from '../../inputs/textarea-input.tsx';
import TextInput from '../../inputs/text-input.tsx';
import api from '../../../services/api.ts';
import { useAuth } from '../../../contexts/AuthContext.tsx';
import AlertMessage from '../../alerts/alert-message.tsx';
import { CAR_STATUS_OPTIONS } from '../../../services/constants.ts';

interface StepTwoProps {
    category: string;
    setCategory: (value: string) => void;
    location: string;
    setLocation: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    getErrorField: (field: string) => string;
    inEditMode?: boolean;
}

const StepTwo: React.FC<StepTwoProps> = ({ category, description, location, status, setCategory, setDescription, setLocation, setStatus, getErrorField, inEditMode }) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const getCategories = () => {
        try {
            setLoading(true);
    
            api.get('/categories', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                const categories = [
                    { value: '', label: 'Select Type' },
                    ...(response.data as { categories: { name: string; _id: string }[] }).categories.map((category: { name: string; _id: string }) => ({
                        value: category._id,
                        label: category.name
                    }))
                ];
    
                setCategories(categories);
                setLoading(false);
            }).catch((error) => {
                setAlertMessage('An error occurred. ' + error.response.data.message);
                setAlertType('error');
                setLoading(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. Pls try again');
            setAlertType('error');
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>
            {loading ? (<>Fetching Categories...</>) : (
                <SelectInput
                    label="Car Type"
                    value={category}
                    options={categories}
                    onChange={setCategory}
                    errorMessage={getErrorField('type')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </SelectInput>
            )}

            <TextInput
                label="Current Location"
                placeholder="Eg: Kigali, Rwanda"
                value={location}
                onChange={setLocation}
                errorMessage={getErrorField('location')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>

            {inEditMode && <SelectInput
                label="Car Status"
                value={status}
                options={CAR_STATUS_OPTIONS}
                onChange={setStatus}
                errorMessage={getErrorField('status')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </SelectInput>}

            <TextAreaInput
                label="Description"
                placeholder="Write a short description about your car"
                value={description}
                onChange={setDescription}
                errorMessage={getErrorField('description')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 12h12" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 4h-4c-2 0-3 1-3 3v10c0 2 1 3 3 3h4" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextAreaInput>

            {/* Alert Message */}
            <AlertMessage message={alertMessage} type={alertType} />
        </div>
    );
};

export default StepTwo;