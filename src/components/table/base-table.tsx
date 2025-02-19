import React, { useState } from 'react';

interface BaseTableProps {
    title: string;
    headers: { key: string; label: string; sortable?: boolean }[];
    data: any[];
    itemsPerPage: number;
    renderRow: (index: number, item: any) => React.ReactNode;
}

const BaseTable: React.FC<BaseTableProps> = ({ title, headers, data, itemsPerPage, renderRow }) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = itemsPerPage ?? 10;

    const sortedData = React.useMemo(() => {
        if (sortConfig !== null) {
            return [...data].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) 
                    return sortConfig.direction === 'asc' ? -1 : 1;
                
                if (a[sortConfig.key] > b[sortConfig.key]) 
                    return sortConfig.direction === 'asc' ? 1 : -1;
                
                return 0;
            });
        }

        return data;
    }, [data, sortConfig]);

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') 
            direction = 'desc';
        
        setSortConfig({ key, direction });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    return (
        <div className="w-full bg-white border rounded-lg border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">{title}</h2>
            </header>

            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                {headers.map((header) => (
                                    <th key={header.key} className={`p-2 whitespace-nowrap ${header.sortable ? 'cursor-pointer' : ''}`} onClick={() => header.sortable && requestSort(header.key)}>
                                        <div className="font-semibold text-left flex items-center">
                                            {header.label}
                                            
                                            {header.sortable && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`ml-1 h-4 w-4 ${sortConfig?.key === header.key ? sortConfig.direction === 'asc' ? 'transform rotate-180' : '' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {paginatedData.map((item, index) => (
                                <tr key={index} className='cursor-pointer'>{renderRow((currentPage - 1) * itemsPerPage + index + 1, item)}</tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(paginatedData.length === 0) && <div className='flex flex-col items-center justify-center my-10'>
                    <img src="/images/empty-cuate.svg" alt="" className='w-80' />
                    <span className='font-bold text-slate-400'>No Records posted Yet.</span>
                </div>}
                
                {/* Paginations */}
                {data && <div className="flex justify-between items-center mt-4">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300  disabled:opacity-50 rounded-lg text-sm flex items-center">
                        <span className='mr-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M9.57 5.93L3.5 12l6.07 6.07"></path><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M20.5 12H3.67" opacity=".4"></path></svg></span>
                        <span>Previous</span>
                    </button>
                    <span className='text-sm text-slate-700'>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 cursor-pointer bg-primary text-gray-100 rounded-lg text-sm disabled:opacity-50 flex items-center">
                        <span>Next</span>
                        <span className='ml-2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M14.43 5.93L20.5 12l-6.07 6.07"></path><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M3.5 12h16.83" opacity=".4"></path></svg></span>
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default BaseTable;