/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/admin/section-title.tsx';
import BaseTable from '../../components/table/base-table.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import api from '../../services/api.ts';
import AlertMessage from '../../components/alerts/alert-message.tsx';
import FetchLoader from '../../components/loaders/fetching-loader.tsx';

const Users: React.FC = () => {
    const [isLoading, setIsloading] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');

    const { token } = useAuth();

    /**
     * Fetch All Cars
     * 
     * @returns
     */
    const fetchAllUsers = async () => {
        try {
            setIsloading(true);

            api.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    direction: 'desc',
                }
            }).then((response: any) => {
                setUsers(response.data.data);
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

    /**
     * Delete User
     * 
     * @param userId 
     * @returns 
     */
    const deleteUser = (userId: string) => async () => {}

    useEffect(() => {
        if (token) 
            fetchAllUsers();
        
    }, [token]);

    return (
        <div className='section'>
            <div className='flex justify-between mb-5'>
                {/* Section Title */}
                <SectionTitle title='Manage Users' path='users' />

                <div className='flex items-center'>
                    {isLoading && <div className='mr-3'> <FetchLoader /> </div>}
                </div>
            </div>

            {/* Table Data */}
            <BaseTable title='All Signed Users' data={users} itemsPerPage={5} headers={[
                { key: 'No', label: 'NO' },
                { key: 'image', label: 'Image' },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone', sortable: true },
                { key: 'isVerified', label: 'Is Verified', sortable: true },
                { key: 'roles', label: 'Roles', sortable: true },
                { key: 'actions', label: 'Actions' },
                ]} renderRow={(index: number, user: any) => (
                    <>
                        <td className="p-2 whitespace-nowrap">
                            <div className="font-medium text-gray-800 truncate">{index}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                            <img className="rounded-lg object-cover w-10 h-10" src={user.picture} alt={user.name} />
                        </td>
                        <td className="p-2 whitespace-nowrap max-w-24">
                            <div className="font-medium text-gray-800 truncate">{user.name}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{user.email}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">{user?.phone}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                            <div className="text-left flex items-center">
                                {user.isVerified ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path opacity=".34" d="m8.38 11.998 2.41 2.42 4.83-4.84" stroke="#37d67a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M10.75 2.45c.69-.59 1.82-.59 2.52 0l1.58 1.36c.3.26.86.47 1.26.47h1.7c1.06 0 1.93.87 1.93 1.93v1.7c0 .39.21.96.47 1.26l1.36 1.58c.59.69.59 1.82 0 2.52l-1.36 1.58c-.26.3-.47.86-.47 1.26v1.7c0 1.06-.87 1.93-1.93 1.93h-1.7c-.39 0-.96.21-1.26.47l-1.58 1.36c-.69.59-1.82.59-2.52 0l-1.58-1.36c-.3-.26-.86-.47-1.26-.47H6.18c-1.06 0-1.93-.87-1.93-1.93V16.1c0-.39-.21-.95-.46-1.25l-1.35-1.59c-.58-.69-.58-1.81 0-2.5l1.35-1.59c.25-.3.46-.86.46-1.25V6.2c0-1.06.87-1.93 1.93-1.93h1.73c.39 0 .96-.21 1.26-.47l1.58-1.35Z" stroke="#37d67a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        <span className='ml-1'>Verified</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path opacity=".34" d="m8.38 11.998 2.41 2.42 4.83-4.84" stroke="#f47373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M10.75 2.45c.69-.59 1.82-.59 2.52 0l1.58 1.36c.3.26.86.47 1.26.47h1.7c1.06 0 1.93.87 1.93 1.93v1.7c0 .39.21.96.47 1.26l1.36 1.58c.59.69.59 1.82 0 2.52l-1.36 1.58c-.26.3-.47.86-.47 1.26v1.7c0 1.06-.87 1.93-1.93 1.93h-1.7c-.39 0-.96.21-1.26.47l-1.58 1.36c-.69.59-1.82.59-2.52 0l-1.58-1.36c-.3-.26-.86-.47-1.26-.47H6.18c-1.06 0-1.93-.87-1.93-1.93V16.1c0-.39-.21-.95-.46-1.25l-1.35-1.59c-.58-.69-.58-1.81 0-2.5l1.35-1.59c.25-.3.46-.86.46-1.25V6.2c0-1.06.87-1.93 1.93-1.93h1.73c.39 0 .96-.21 1.26-.47l1.58-1.35Z" stroke="#f47373" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        <span className='ml-1'>Not Verified</span>
                                    </>
                                )}
                            </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">{user.roles.map((role: { name: any; }) => role.name)}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                            <div className='flex items-center space-x-2'>
                                <div onClick={deleteUser(user._id)} className='border border-red-200 rounded-lg p-1 cursor-pointer bg-red-200'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".34" d="m8.5 4.97.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="m18.85 9.14-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".34" d="M10.33 16.5h3.33M9.5 12.5h5" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </div>
                            </div>
                        </td>
                    </>
                )} />

            {/* Alert Message */}
            <AlertMessage message={alertMessage} type={alertType} />
        </div>
    );
}

export default Users;