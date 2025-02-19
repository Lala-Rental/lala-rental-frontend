import React from 'react';
import TextInput from '../../inputs/text-input.tsx';

interface StepOneProps {
    name: string;
    setName: (value: string) => void;
    model: string;
    setModel: (value: string) => void;
    year: number;
    setYear: (value: number) => void;
    color: string;
    setColor: (value: string) => void;
    getErrorField: (field: string) => string;
}

const StepOne: React.FC<StepOneProps> = ({ name, setName, model, setModel, year, setYear, color, setColor, getErrorField }) => {
    return (
        <div>
            <TextInput
                label="Post Title"
                placeholder="Eg: Tesla 2021 Model X"
                value={name}
                onChange={setName}
                errorMessage={getErrorField('title')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
            <TextInput
                label="Car Model"
                placeholder="Eg: Model S"
                value={model}
                onChange={setModel}
                errorMessage={getErrorField('model')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
            <TextInput
                label="Year of Manufacture"
                placeholder="2021"
                value={year.toString()}
                onChange={(value) => setYear(value ? Number(value) : 0)}
                type="number"
                errorMessage={getErrorField('year')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
            <TextInput
                label="Car Color"
                placeholder="Eg: Sliver Black"
                value={color}
                onChange={setColor}
                type="text"
                errorMessage={getErrorField('color')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
        </div>
    );
};

export default StepOne;