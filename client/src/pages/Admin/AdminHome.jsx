import React,{useState} from 'react'
// import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Sidebar from '../../components/Sidebar';

export default function AdminHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
  // const { loading, user } = useSelector((state) => state.auth);

  return (
    <div className="flex ">
      {/* Sidebar */}
    
      <Sidebar/>

      {/* main content */}
      <div className="max-w-[80%] mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-4">
        <Link to="/userManage" className="bg-gray-100 hover:bg-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
          <i className="fas fa-users text-4xl text-primary mb-2"></i>
          <h3 className="text-xl font-semibold text-gray-800">Manage Users</h3>
        </Link >
        <Link to="/permManage" className="bg-gray-100 hover:bg-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
          <i className="fas fa-lock text-4xl text-primary mb-2"></i>
          <h3 className="text-xl font-semibold text-gray-800">Manage Permissions</h3>
        </Link >
        <Link to="/roleManage" className="bg-gray-100 hover:bg-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
          <i className="fas fa-user-tag text-4xl text-primary mb-2"></i>
          <h3 className="text-xl font-semibold text-gray-800">Manage Roles</h3>
        </Link >
        <Link to="/project" className="bg-gray-100 hover:bg-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
          <i className="fas fa-folder-open text-4xl text-primary mb-2"></i>
          <h3 className="text-xl font-semibold text-gray-800">Go to Projects</h3>
        </Link >
        {/* <Link
        to="/register"
        className={`${user.role === 'superAdmin' ? 'flex' : 'hidden'
          } bg-gray-100 hover:bg-gray-200 shadow-md rounded-lg p-4 flex-col items-center justify-center`}
      >
        <i className="fas fa-user-plus text-4xl text-primary mb-2"></i>
        <h3 className="text-xl font-semibold text-gray-800">Register User</h3>
        </Link> */}
        <Link
          to="/register"
          className={`flex bg-gray-100 hover:bg-gray-200 shadow-md rounded-lg p-4 flex-col items-center justify-center`}
        >
          <i className="fas fa-user-plus text-4xl text-primary mb-2"></i>
          <h3 className="text-xl font-semibold text-gray-800">Register User</h3>
        </Link>

      </div>
    </div>

  )
}
