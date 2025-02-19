import React, { useState } from 'react';
import TextInput from '../../inputs/text-input.tsx';

interface StepThreeProps {
    make: string;
    setMake: (value: string) => void;
    mileage: number;
    setMileage: (value: number) => void;
    price: number;
    setPrice: (value: number) => void;
    autonomy: string;
    setAutonomy: (value: string) => void;
    getErrorField: (field: string) => string;
}

const StepThree: React.FC<StepThreeProps> = ({ make, setMake, mileage, setMileage, price, setPrice, autonomy, setAutonomy, getErrorField }) => {
    const [formattedPrice, setFormattedPrice] = useState<string>(price.toString());

    const handlePriceChange = (value: string) => {
        const numericValue = value.replace(/,/g, '');
        const numberValue = Number(numericValue);
        setPrice(numberValue);
        setFormattedPrice(new Intl.NumberFormat().format(numberValue));
    };

    return (
        <div>
            <TextInput
                label="Car Brand | Make"
                placeholder="eg: Toyota"
                value={make}
                onChange={setMake}
                errorMessage={getErrorField('make')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
            <TextInput
                label="Car Mileage"
                placeholder="Eg: 2345"
                value={mileage.toString()}
                onChange={(value) => setMileage(value ? Number(value) : 0)}
                type="number"
                errorMessage={getErrorField('mileage')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
            <TextInput
                label="Car Price"
                placeholder="Eg: 20,000,000"
                value={formattedPrice}
                onChange={(value) => handlePriceChange(value)}
                type="text"
                errorMessage={getErrorField('price')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
        </div>
    );
};

export default StepThree;