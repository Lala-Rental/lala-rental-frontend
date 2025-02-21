import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer.tsx';
import NavBar from '../components/navbar.tsx';
import Announcements from '../components/alerts/announcements.tsx';

const AppLayout: React.FC = () => {
    return (
        <main className="layout bg-primary">
            {/* Alert Message Component */}
            <Announcements />

            {/* Nav bar Componet */}
            <NavBar />

            {/*  */}
            <div className='app-body'><Outlet /></div>

            {/* Footer Component */}
            <Footer />
        </main>
    );
};

export default AppLayout;