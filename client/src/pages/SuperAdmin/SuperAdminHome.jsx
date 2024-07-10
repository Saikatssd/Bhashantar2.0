import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const SuperAdminHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar    */}
            <Sidebar />
            {/* Main Content */}
            <div className="flex-grow p-6 ml-64 flex items-center ">

                <Link to='/adminHome' className="bg-indigo-200 shadow-md rounded-lg p-6 m-4 w-full max-w-xs">
                    <h2 className="text-2xl font-semibold">Proof Reading</h2>
                </Link>

                <Link to='' className="bg-indigo-200 shadow-md rounded-lg p-6 m-4 w-full max-w-xs">
                    <h2 className="text-2xl font-semibold">Legal Vetting</h2>
                </Link>
            </div>
        </div>
    );
};

export default SuperAdminHome;
