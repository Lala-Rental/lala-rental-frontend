import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ConfirmModel from "../models/confirm-model.tsx";
import { useGlobalAlert } from "../../contexts/AlertContext.tsx";
import { useAuth } from "../../contexts/AuthContext.tsx";
import api from "../../services/api.ts";
import AlertMessage from "../alerts/alert-message.tsx";

const LogoutModal: React.FC = () => {
    const { setUser } = useAuth();
    
    const { setGlobalAlert } = useGlobalAlert();
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [alertMessage, setAlertMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const confirmLogout = () => {
        try {
            const token = localStorage.getItem('accessToken');
            setIsLoading(true);

            api.post('/auth/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            }).then((response) => {
                localStorage.removeItem('lala-rental-token');

                setUser(null);
                setGlobalAlert("You have been logged out successfully", 'success');
                
                setIsLoading(false);
                closeModal();

                window.location.href = '/';
            }).catch((error) => {
                setAlertMessage('An error occurred. ' + error.response.data.message);
                setAlertType('error');
                setIsLoading(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. Please try again later.');
            setAlertType('error');
            setIsLoading(false);
        }
    };

    return (<>
        <NavLink to="#" onClick={openModal} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</NavLink>

        <ConfirmModel
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={confirmLogout}
            title="Logout Now"
            message="Are you sure you want to log out?"
            isLoading={isLoading}
        />

        {/* Alert Message */}
        <AlertMessage message={alertMessage} type={alertType} />
    </>);
}

export default LogoutModal;