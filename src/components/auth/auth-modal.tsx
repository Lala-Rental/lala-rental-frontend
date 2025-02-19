import React from 'react';
import FormModal from '../models/form-model.tsx';
import OAuth from '../oauth/oauth.tsx';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    callback: (reponse: any) => void;
    fallback: (error: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    return (<>
        <FormModal isOpen={isOpen} onClose={onClose}> 
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign In to Lala Rental</h2>
            <p className="mt-2 text-base text-gray-600 flex">Don’t have an account?</p>

            {/* Continue with oauth */}
            <OAuth onLoading={() => {}} />
        </FormModal>
    </>);
}

export default AuthModal;
