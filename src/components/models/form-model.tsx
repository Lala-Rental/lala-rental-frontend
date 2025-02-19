import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const FormModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 max-h-[100vh] overflow-y-auto py-10">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] relative">
                <button onClick={onClose} className="absolute top-2 right-4 text-gray-600 hover:text-gray-900">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default FormModal;