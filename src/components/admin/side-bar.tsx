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
                                <NavLink to="/admin/reports" className={({ isActive }) => `flex items-center p-2 text-base font-bold text-slate-700 rounded-lg hover:bg-primary/50 hover:text-gray-100 group ${isActive ? 'text-slate-700 border border-gray-200 bg-primary/10' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="m9.02 2.838-5.39 4.2c-.9.7-1.63 2.19-1.63 3.32v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21v-7.28c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path opacity=".34" d="M12 17.988v-3" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="ml-3">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/dashboard" className={({ isActive }) => `flex items-center p-2 text-base font-bold text-slate-700 rounded-lg hover:bg-primary/50 hover:text-gray-100 group ${isActive ? 'text-slate-700 border border-gray-200 bg-primary/10' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15.51 2.828H8.49c-2.49 0-3.04 1.24-3.36 2.76L4 10.998h16l-1.13-5.41c-.32-1.52-.87-2.76-3.36-2.76ZM21.989 19.82c.11 1.17-.83 2.18-2.03 2.18h-1.88c-1.08 0-1.23-.46-1.42-1.03l-.2-.6c-.28-.82-.46-1.37-1.9-1.37h-5.12c-1.44 0-1.65.62-1.9 1.37l-.2.6c-.19.57-.34 1.03-1.42 1.03h-1.88c-1.2 0-2.14-1.01-2.03-2.18l.56-6.09c.14-1.5.43-2.73 3.05-2.73h12.76c2.62 0 2.91 1.23 3.05 2.73l.56 6.09ZM4 8H3M21 8h-1" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><g opacity=".4" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v2M10.5 5h3"></path></g><path opacity=".4" d="M6 15h3M15 15h3" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    <span className="ml-3">Cars Management</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/users" className={({ isActive }) => `flex items-center p-2 text-base font-bold text-slate-700 rounded-lg hover:bg-primary/50 hover:text-gray-100 group ${isActive ? 'text-slate-700 border border-gray-200 bg-primary/10' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9.159 10.87c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43c0-2.45 1.98-4.44 4.44-4.44a4.435 4.435 0 0 1 .16 8.87Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M16.411 4c1.94 0 3.5 1.57 3.5 3.5 0 1.89-1.5 3.43-3.37 3.5a1.13 1.13 0 0 0-.26 0" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.159 14.56c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M18.34 20c.72-.15 1.4-.44 1.96-.87 1.56-1.17 1.56-3.1 0-4.27-.55-.42-1.22-.7-1.93-.86" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    <span className="ml-3">Users Management</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/subscribers" className={({ isActive }) => `flex items-center p-2 text-base font-bold text-slate-700 rounded-lg hover:bg-primary/50 hover:text-gray-100 group ${isActive ? 'text-slate-700 border border-gray-200 bg-primary/10' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 9c0 3.87-3.36 7-7.5 7l-.93 1.12-.55.66c-.47.56-1.37.44-1.68-.23L5 14.6C3.18 13.32 2 11.29 2 9c0-3.87 3.36-7 7.5-7 3.02 0 5.63 1.67 6.8 4.07.45.89.7 1.88.7 2.93Z" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M22 12.86c0 2.29-1.18 4.32-3 5.6l-1.34 2.95c-.31.67-1.21.8-1.68.23l-1.48-1.78c-2.42 0-4.58-1.07-5.93-2.74L9.5 16c4.14 0 7.5-3.13 7.5-7 0-1.05-.25-2.04-.7-2.93 3.27.75 5.7 3.51 5.7 6.79ZM7 9h5" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                    <span className="ml-3">Subscribers</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}