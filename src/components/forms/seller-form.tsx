import React, { useState } from 'react';
import FormModal from '../models/form-model.tsx';
import TextInput from '../inputs/text-input.tsx';
import AuthButton from '../buttons/auth-button.tsx';

interface SellerModalProps {
    isOpen: boolean;
    onClose: () => void;
    callback: (reponse: any) => void;
    getErrorField: (field: string) => any
}

const SellerModal: React.FC<SellerModalProps> = ({ isOpen, onClose, getErrorField, callback }) => {
    const [sellerFullname, setSellerFullname] = useState('');
    const [sellerEmail, setSellerEmail] = useState('');
    const [sellerPhonenumber, setSellerPhonenumber] = useState('');

    const handleSeller = () => {
        callback({
            fullname: sellerFullname,
            email: sellerEmail,
            phone: sellerPhonenumber
        });
    }

    return (<>
        <FormModal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4 text-slate-700 flex items-center">
                <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 18.86h-.76c-.8 0-1.56.31-2.12.87l-1.71 1.69c-.78.77-2.05.77-2.83 0l-1.71-1.69c-.56-.56-1.33-.87-2.12-.87H6c-1.66 0-3-1.33-3-2.97V4.97C3 3.33 4.34 2 6 2h12c1.66 0 3 1.33 3 2.97v10.91c0 1.64-1.34 2.98-3 2.98Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M12.07 8.95h-.15A1.945 1.945 0 0 1 10.04 7c0-1.08.87-1.95 1.95-1.95s1.95.88 1.95 1.95c.01 1.06-.82 1.92-1.87 1.95ZM9.251 11.96c-1.33.89-1.33 2.34 0 3.23 1.51 1.01 3.99 1.01 5.5 0 1.33-.89 1.33-2.34 0-3.23-1.51-1-3.98-1-5.5 0Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                <span className='ml-2'>Seller Information</span>
            </h2>
            <p>Reach potential Buyers with an eye-catching Listing. Fill out the details below to get started</p>

            <hr className="my-5 border-gray-200" />

            <TextInput
                label="Full Name"
                placeholder="Eg: John Doe"
                value={sellerFullname}
                onChange={setSellerFullname}
                errorMessage={getErrorField('fullname')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
            <TextInput
                label="Email Address"
                placeholder="example@example.com"
                value={sellerEmail}
                onChange={setSellerEmail}
                errorMessage={getErrorField('email')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>
            <TextInput
                label="Your Contact Number"
                placeholder="eg: +250..."
                value={sellerPhonenumber}
                onChange={setSellerPhonenumber}
                type="number"
                errorMessage={getErrorField('phonenumber')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </TextInput>

            <div className="flex items-center justify-between mt-4">
                <AuthButton onClick={handleSeller} text={"Confirm & Submit"} isLoading={false} type="submit" className="mt-5" />
            </div>
        </FormModal>
    </>);
}

export default SellerModal;
