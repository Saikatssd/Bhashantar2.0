import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleSignOut } from '../../utils/auth';

export default function KyroSidebar({ companyId, role }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
            <div className={`flex flex-col justify-between transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-64 h-full z-10`}>
                <div className="px-4 py-6">
                    <ul className="mt-6 space-y-1">
                        <li>
                            <Link to='/home' className="block rounded-lg bg-[#e3d2fa] px-4 py-2 text-sm font-medium text-gray-700">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={`/kyro/${companyId}/profile`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                Profile
                            </Link>
                        </li>
                        {role !== 'user' && (
                            <>


                                <li>
                                    <Link to={`/kyro/${companyId}/userManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                        Manage Users
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/kyro/${companyId}/roleManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                        Manage Roles
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/kyro/${companyId}/permissionManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                        Manage Permissions
                                    </Link>
                                </li>
                            </>
                        )}

                        {role === 'admin' && (
                            <li>
                                <Link to={`/kyro/${companyId}/clientProjects`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                    Go to Projects
                                </Link>
                            </li>
                        )}

                        {role === 'user' && (
                            <>
                                <li>
                                    <Link to={`/kyro/${companyId}/project`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                        Project
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/kyro/${companyId}/mywork`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                        My Work
                                    </Link>
                                </li>
                            </>
                        )}
                        {/* {role === 'superAdmin' && (
                            <li>
                                <Link to="/register" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                                    Register
                                </Link>
                            </li>
                        )} */}
                        <li>
                            <button onClick={handleSignOut} className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700">
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="md:hidden">
                <button className="bg-[#e3d2fa] text-white" onClick={toggleSidebar}>
                    Toggle
                </button>
            </div>
        </div>
    );
}
