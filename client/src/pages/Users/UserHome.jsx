import React from 'react'
import { Link } from "react-router-dom";

export default function UserHome() {
    return (
        <div className="h-screen flex flex-col items-center">
            {/* <h1 className='text-gray-800 m-10 font-semibold text-xl text-primary'>
        Hi,{user.role === ('admin' || 'superadmin') ? (<span className='uppercase text-gray-500'>{user.role} </span>) : (<></>)} {user.name}
    </h1> */}


            <div className="flex justify-center items-center p-20">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 p-4">
                    <Link to="/profile">
                        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-2xl font-bold mb-2 text-gray-900">Profile</h2>
                        </div>
                    </Link>
                    <Link to="/userDocument">
                        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-2xl font-bold mb-2 text-gray-900">My Work</h2>
                        </div>
                    </Link>
                    <Link to="/project">
                        <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-2xl font-bold mb-2 text-gray-900">Go to projects</h2>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
