import React from 'react';
import SelectInput from '../../inputs/select-input.tsx';
import { CONDITION_OPTIONS, TRANSMISSION_OPTIONS, FUELTYPE_OPTIONS } from '../../../services/constants.ts';
import TextInput from '../../inputs/text-input.tsx';

interface StepFourProps {
    condition: string;
    setCondition: (value: string) => void;
    transmission: string;
    setTransmission: (value: string) => void;
    fuelType: string;
    setFuelType: (value: string) => void;
    seats: number;
    setSeats: (value: number) => void;
    getErrorField: (field: string) => string;
}

const StepFour: React.FC<StepFourProps> = ({ condition, setCondition, transmission, setTransmission, fuelType, setFuelType, seats, setSeats, getErrorField }) => {
    return (
        <div>
            <SelectInput
                label="Car Condition"
                value={condition}
                options={CONDITION_OPTIONS}
                onChange={setCondition}
                errorMessage={getErrorField('condition')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </SelectInput>
            <SelectInput
                label="Car Transmission"
                value={transmission}
                options={TRANSMISSION_OPTIONS}
                onChange={setTransmission}
                errorMessage={getErrorField('transmission')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </SelectInput>
            <SelectInput
                label="Car Fuel Type"
                value={fuelType}
                options={FUELTYPE_OPTIONS}
                onChange={setFuelType}
                errorMessage={getErrorField('fuel_type')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </SelectInput>
            <TextInput
                label="Number of Seats"
                placeholder="Eg: 5"
                value={seats.toString()}
                onChange={(value) => setSeats(value ? Number(value) : 0)}
                type="number"
                errorMessage={getErrorField('seats')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
        </div>
    );
};

export default StepFour;