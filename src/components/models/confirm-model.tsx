// Modal.tsx
import React from 'react';
import FetchLoader from '../loaders/fetching-loader.tsx';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isLoading: boolean;
}

const ConfirmModel: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                {isLoading && <FetchLoader />}
                {!isLoading && <>
                    <h2 className="text-xl font-semibold mb-4">{title}</h2>
                    <p className="mb-6">{message}</p>
                    <div className="flex justify-end space-x-4">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
                            Cancel
                        </button>
                        <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                            Confirm
                        </button>
                    </div>
                </>}
            </div>
        </div>
    );
};

export default ConfirmModel;