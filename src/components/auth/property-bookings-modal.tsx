import React from "react";
import BaseTable from "../table/base-table.tsx";
import FormModal from "../models/form-model.tsx";

const PropertyBookingsModal: React.FC<{ data: any, isOpen: boolean, onClose: () => void }> = ({ data, isOpen, onClose }) => {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    return (<>
        <FormModal isOpen={isOpen} onClose={onClose}>
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
                        <div className="text-left">{formatDate(data.checkIn)}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{formatDate(data.checkOut)}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                        <div className="text-slate-700 text-left px-2 text-sm">{data.status ?? "Unknown"}</div>
                    </td>
                </>)} 
            />
        </FormModal>
    </>);
}

export default PropertyBookingsModal;