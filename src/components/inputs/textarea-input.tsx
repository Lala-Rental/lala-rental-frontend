import React from 'react';

interface TextAreaInputProps {
    label: string;
    placeholder: string;
    value: string;
    errorMessage?: string;
    onChange: (value: string) => void;
    children?: React.ReactNode;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, placeholder, value, onChange, errorMessage, children }) => {
    return (
        <div className='mt-3'>
            <label className="text-base font-medium text-slate-700 capitalize">{label}</label>
            <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`block w-full py-4 pl-10 pr-4 transition-all duration-200 border rounded-md focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errorMessage ? 'text-red-700 placeholder-red-500 border-red-200 bg-red-50' : 'text-black placeholder-gray-500 border-gray-200 bg-gray-50'}`}
                    rows={4}
                />
            </div>
            {errorMessage && <small className={`text-red-500 font-semibold mt-2 flex items-center`}>
                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10.75 2.45c.7-.59 1.83-.59 2.51 0l1.58 1.35c.3.25.87.46 1.27.46h1.7c1.06 0 1.93.87 1.93 1.93v1.7c0 .4.21.96.46 1.26l1.35 1.58c.59.7.59 1.83 0 2.51l-1.35 1.58c-.25.3-.46.86-.46 1.26v1.7c0 1.06-.87 1.93-1.93 1.93h-1.7c-.4 0-.96.21-1.26.46l-1.58 1.35c-.7.59-1.83.59-2.51 0l-1.58-1.35c-.3-.25-.87-.46-1.26-.46H6.17c-1.06 0-1.93-.87-1.93-1.93v-1.71c0-.39-.2-.96-.45-1.25l-1.35-1.59c-.58-.69-.58-1.81 0-2.5l1.35-1.59c.25-.3.45-.86.45-1.25V6.2c0-1.06.87-1.93 1.93-1.93H7.9c.4 0 .96-.21 1.26-.46l1.59-1.36Z" stroke="#f47373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#f47373" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8.129v4.83" strokeWidth="1.5"></path><path d="M11.994 16h.01" strokeWidth="2"></path></g></svg></span>
                <span className='ml-2'>{ errorMessage }</span>
            </small>}
        </div>
    );
};

export default TextAreaInput;