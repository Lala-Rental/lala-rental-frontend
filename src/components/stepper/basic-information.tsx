/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

import TextAreaInput from '../inputs/textarea-input.tsx';
import TextInput from '../inputs/text-input.tsx';

interface BasicInformProps {
    title: string;
    setTitle: (value: string) => void;
    location: string;
    setLocation: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    status: string;
    setStatus: (value: string) => void;
    price: string;
    setPrice: (value: string) => void;
    getErrorField: (field: string) => string;
    inEditMode?: boolean;
}

const BasicInformation: React.FC<BasicInformProps> = ({ title, setTitle, location, setLocation, status, setStatus, description, setDescription, price, setPrice, getErrorField, inEditMode }) => {
    const [formattedPrice, setFormattedPrice] = useState<string>(price);

    const handlePriceChange = (value: string) => {
        const numericValue = value.replace(/,/g, '');
        const numberValue = Number(numericValue);
        setPrice(numberValue.toString());
        setFormattedPrice(new Intl.NumberFormat().format(numberValue));
    };

    return (
        <div>
            <TextInput
                label="Title"
                placeholder="Eg: Best Sport in area"
                value={title}
                onChange={setTitle}
                errorMessage={getErrorField('title')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
            
            <TextInput
                label="Location"
                placeholder="Eg: Kigali, Rwanda"
                value={location}
                onChange={setLocation}
                errorMessage={getErrorField('location')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>

            <TextAreaInput
                label="Description"
                placeholder="Write a short description"
                value={description}
                onChange={setDescription}
                errorMessage={getErrorField('description')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 12h12" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 4h-4c-2 0-3 1-3 3v10c0 2 1 3 3 3h4" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextAreaInput>

            {/* {inEditMode && <SelectInput
                label="Status"
                value={status}
                options={STATUS_OPTIONS}
                onChange={setStatus}
                errorMessage={getErrorField('status')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </SelectInput>} */}

            <TextInput
                label="Price Per Night"
                placeholder="Eg: 20,000"
                value={formattedPrice}
                onChange={(value) => handlePriceChange(value)}
                errorMessage={getErrorField('price')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
        </div>
    );
};

export default BasicInformation;