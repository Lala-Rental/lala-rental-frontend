/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BaseTable from "../table/base-table.tsx";
import api from '../../services/api.ts';
import { useAuth } from '../../contexts/AuthContext.tsx';
import TableRow from "../table/table-row.tsx";
import AlertMessage from "../alerts/alert-message.tsx";
import CircleSpinner from "../loaders/circle-spinner.tsx";


const PropertyListing: React.FC<{ onPreview: (data: any) => void, onEditing: (data: any) => void, onDelete: (id: string) => void }> = ({ onPreview, onEditing, onDelete }) => {
    const { token } = useAuth();
    const [isLoading, setIsloading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [data, setData] = useState<any[]>([]);

    const fetchProperties = async () => {
        
        setIsloading(true);

        try {
            api.get('/properties/user/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    direction: 'desc',
                }
            }).then((response: any) => {
                setData(response.data.data);
                setIsloading(false);
            }).catch((error: { response: { data: { message: string; }; }; }) => {
                setAlertMessage('An error occurred. '+error.response.data.message);
                setAlertType('error');
                setIsloading(false);
            });
        } catch (error) {
            setAlertMessage('An error occurred. Something went wrong');
            setAlertType('error');
            setIsloading(false);
        }
    };

    useEffect(() => {
        if (token) fetchProperties();
    }, [token]);

    return (<>
        {/*  */}
        {isLoading && <CircleSpinner />}

        {/* Table Data */}
        <BaseTable 
            title='' 
            data={data} 
            itemsPerPage={5} 
            headers={[
                { key: 'No', label: 'NO' },
                { key: 'image', label: 'Image' },
                { key: 'title', label: 'Title', sortable: true },
                { key: 'hoster', label: 'Hoster' },
                { key: 'price', label: 'Price Per Night', sortable: true },
                { key: 'status', label: 'Status' },
                { key: 'actions', label: 'Actions' },
            ]} 
            renderRow={(index: number, data: any) => (
                <TableRow 
                    index={index} 
                    data={data} 
                    onDelete={onDelete} 
                    onUpdate={onEditing}
                    onPreview={onPreview}
                />
            )} 
        />

        {/* Alert Message */}
        <AlertMessage message={alertMessage} type={alertType} />
    </>);
}

export default PropertyListing;
