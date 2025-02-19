import React from 'react';
import TextInput from './text-input.tsx';

interface InputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

const UsernameInput: React.FC<InputProps> = ({ label, placeholder, value, onChange }) => {
    return (
        <TextInput
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </TextInput>
    );
};

export default UsernameInput;