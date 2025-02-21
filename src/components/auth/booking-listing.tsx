/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BaseTable from "../table/base-table.tsx";
import api from '../../services/api.ts';
import { useAuth } from '../../contexts/AuthContext.tsx';
import TableRow from "../table/table-row.tsx";


const BookingListing: React.FC = () => {
    const { token } = useAuth();
    const [isLoading, setIsloading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [data, setData] = useState<any[]>([]);

    const fetchBookings = async () => {
        
        setIsloading(true);

        try {
            api.get('/bookings', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    direction: 'desc',
                }
            }).then((response: any) => {
                console.log(response.data.data);
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
        if (token) fetchBookings();
    }, [token]);

    return (<>
        {/* Table Data */}
        <BaseTable 
            title='' 
            data={data} 
            itemsPerPage={5} 
            headers={[
                { key: 'No', label: 'NO' },
                { key: 'property', label: 'Property Image' },
                { key: 'title', label: 'Property Title', sortable: true },
                { key: 'price', label: 'Price per Night', sortable: true },
                { key: 'checkin', label: 'Check In' },
                { key: 'checkout', label: 'Check Out', sortable: true },
                { key: 'status', label: 'Status' },
                { key: 'actions', label: 'Actions' },
            ]} 
            renderRow={(index: number, data: any) => (<>
                <td className="p-2 whitespace-nowrap">
                    <div className="font-medium text-gray-800 truncate">#{index}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <img className="rounded-lg object-cover w-10 h-10" src={data.property.images ? `${data.property.images[0]}` : 'https://cdn.bestsuppliers.com/seo_products_img/biuloo/23798d3c6f853ade868f0f64491471bf.jpg!/rotate/180'} alt={data.property.title} />
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="font-medium text-gray-800 truncate">{data.property.title}</div>
                </td>
                <td className="p-2 whitespace-nowrap max-w-24">
                    <div className="font-medium text-gray-800 truncate">
                        {data.property.price ? new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(Number(data.property.price)) : 0}
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{data.checkIn}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">{data.checkOut}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="text-slate-700 text-left px-2 text-sm">{data.status ?? "Unknown"}</div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className='flex items-center space-x-2'>
                        <div onClick={() => {}} className='border border-red-200 rounded-lg p-1 cursor-pointer bg-red-200'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".34" d="m8.5 4.97.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="m18.85 9.14-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".34" d="M10.33 16.5h3.33M9.5 12.5h5" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </div>
                    </div>
                </td>
            </>)} 
        />
    </>);
}

export default BookingListing;
