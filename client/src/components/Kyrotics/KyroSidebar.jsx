import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { handleSignOut } from '../../utils/auth';
import logo from '../../assets/logo.png';

export default function KyroSidebar({ companyId, role }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className='backdrop-blur-sm shadow-xl h-screen bg-white/30'>
            <div className={`flex flex-col justify-between transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-64 h-full z-10`}>
                <div className="py-6 px-4">
                    <div className="flex justify-center mb-6">
                        <img src={logo} alt="Logo" className="h-20 w-auto" />
                    </div>
                    <ul className="mt-6 space-y-1 ">
                        <li>
                            <Link to='/home' className={`block rounded-lg  px-4 py-4 text-sm font-medium ${isActive('/home') ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={`/kyro/${companyId}/profile`} className={`block rounded-lg px-4 py-4 text-sm font-medium ${isActive(`/kyro/${companyId}/profile`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                Profile
                            </Link>
                        </li>
                        {(role === 'admin' || role === 'superAdmin') && (
                            <>
                                <li>
                                    <Link to={`/kyro/${companyId}/userManage`} className={`block rounded-lg px-4 py-4 text-sm font-medium ${isActive(`/kyro/${companyId}/userManage`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                        Manage Users
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/kyro/${companyId}/roleManage`} className={`block rounded-lg px-4 py-4 text-sm font-medium ${isActive(`/kyro/${companyId}/roleManage`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                        Manage Roles
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/kyro/${companyId}/permissionManage`} className={`block rounded-lg px-4 py-4 text-sm font-medium ${isActive(`/kyro/${companyId}/permissionManage`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                        Manage Permissions
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/kyro/${companyId}/fileStatus`} className={`block rounded-lg px-4 py-4 text-sm font-medium ${isActive(`/kyro/${companyId}/fileStatus`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                        File Status
                                    </Link>
                                </li>
                            </>
                        )}
                        {/* {role === 'admin' && ( */}
                            <li>
                                <Link to={`/kyro/${companyId}/clientCompanies`} className={`block rounded-lg px-4 py-4 text-sm font-medium ${isActive(`/kyro/${companyId}/clientCompanies`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                    Go to Projects
                                </Link>
                            </li>
                         {/* )} */}
                        {role === 'user' && (
                            <>
                                {/* <li>
                                    <Link to={`/kyro/${companyId}/project`} className={`block rounded-lg px-4 py-4 text-sm font-medium ${isActive(`/kyro/${companyId}/project`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                        Project
                                    </Link>
                                </li> */}
                                <li>
                                    <Link to={`/kyro/${companyId}/mywork`} className={`block rounded-lg px-4 py-4 text-sm font-medium ${isActive(`/kyro/${companyId}/mywork`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                        My Work
                                    </Link>
                                </li>
                            </>
                        )}
                        {/* {role === 'QA' && (
                            <>
                                <li>
                                    <Link to={`/kyro/${companyId}/project`} className={`block rounded-lg px-4 py-4 text-sm font-medium ${isActive(`/kyro/${companyId}/project`) ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                        Project
                                    </Link>
                                </li>

                            </>
                        )} */}
                        {/* {role === 'superAdmin' && (
                            <li>
                                <Link to="/register" className={`block rounded-lg px-4 py-4 text-sm font-medium ${isActive('/register') ? 'bg-[#e3d2fa] text-gray-700' : 'text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700'}`}>
                                    Register
                                </Link>
                            </li>
                        )} */}
                        <li>
                            <button onClick={handleSignOut} className="w-full rounded-lg px-4 py-4 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700">
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
