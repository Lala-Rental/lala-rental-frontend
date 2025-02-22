import React from 'react';

interface TableRowProps {
    index: number;
    data: any;
    onPreview: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (data: any) => void;
    approve?: (data: any) => void;
}

const TableRow: React.FC<TableRowProps> = ({ index, data, onPreview, onDelete, onUpdate, approve }) => {
    return (
        <>
            <td className="p-2 whitespace-nowrap">
                <div className="font-medium text-gray-800 truncate">{index}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <img className="rounded-lg object-cover w-10 h-10" src={data.images ? `${data.images[0]}` : 'https://cdn.bestsuppliers.com/seo_products_img/biuloo/23798d3c6f853ade868f0f64491471bf.jpg!/rotate/180'} alt={data.title} />
            </td>
            <td className="p-2 whitespace-nowrap max-w-24">
                <div className="font-medium text-gray-800 truncate">{data.title}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-left">{data.hoster ? data.hoster.fullname : 'Own'}</div>
            </td>
            
            <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium text-green-500">
                    {new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(Number(data.price))}
                </div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className="text-slate-700 text-left px-2 text-sm">{data.status ?? "Unknown"}</div>
            </td>
            <td className="p-2 whitespace-nowrap">
                <div className='flex items-center space-x-2'>
                    <div onClick={() => onPreview(data.id)} className='border border-gray-200 rounded-lg p-1 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path opacity=".4" d="M22 10v5c0 5-2 7-7 7H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h5" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22 10h-4c-3 0-4-1-4-4V2l8 8Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </div>
                    <div onClick={() => onUpdate(data)} className='border border-indigo-200 rounded-lg p-1 cursor-pointer bg-indigo-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1.996 8.5h9.5" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M5.996 16.5h2M10.496 16.5h4" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21.996 12.03v4.08c0 3.51-.89 4.39-4.44 4.39H6.436c-3.55 0-4.44-.88-4.44-4.39V7.89c0-3.51.89-4.39 4.44-4.39h8.06" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"><path d="m19.076 4.131-3.71 3.71c-.14.14-.28.42-.31.62l-.2 1.42c-.07.51.29.87.8.8l1.42-.2c.2-.03.48-.17.62-.31l3.71-3.71c.64-.64.94-1.38 0-2.32-.95-.95-1.69-.65-2.33-.01Z"></path><path d="M18.547 4.66c.32 1.13 1.2 2.01 2.32 2.32"></path></g></svg> 
                    </div>
                    <div onClick={() => onDelete(data.id)} className='border border-red-200 rounded-lg p-1 cursor-pointer bg-red-200'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".34" d="m8.5 4.97.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="m18.85 9.14-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".34" d="M10.33 16.5h3.33M9.5 12.5h5" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </div>
                </div>
            </td>
        </>
    );
}

export default TableRow;