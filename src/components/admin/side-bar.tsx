import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar() {
    return (
        <aside id="sidebar font-sans" className="flex flex-col flex-shrink-0 w-64 h-full font-normal duration-75 lg:flex transition-width" aria-label="Sidebar">
            <div className="relative flex flex-col flex-1 min-h-0 pt-0 border border-gray-200 rounded-lg my-6 bg-white">
                <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200">
                        <ul className="pb-2 space-y-2 pt-3">
                            <li>
                                <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center p-2 text-base font-bold text-slate-700 rounded-lg hover:bg-primary/50 hover:text-gray-100 group ${isActive ? 'text-slate-700 border border-gray-200 bg-primary/10' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="m9.02 2.838-5.39 4.2c-.9.7-1.63 2.19-1.63 3.32v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21v-7.28c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path opacity=".34" d="M12 17.988v-3" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="ml-3">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/users" className={({ isActive }) => `flex items-center p-2 text-base font-bold text-slate-700 rounded-lg hover:bg-primary/50 hover:text-gray-100 group ${isActive ? 'text-slate-700 border border-gray-200 bg-primary/10' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9.159 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43c0-2.45 1.98-4.44 4.44-4.44a4.435 4.435 0 0 1 .16 8.87Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M16.411 4c1.94 0 3.5 1.57 3.5 3.5 0 1.89-1.5 3.43-3.37 3.5a1.13 1.13 0 0 0-.26 0" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.159 14.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M18.34 20c.72-.15 1.4-.44 1.96-.87 1.56-1.17 1.56-3.1 0-4.27-.55-.42-1.22-.7-1.93-.86" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    <span className="ml-3">Users Management</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}