// import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
// import { handleSignOut } from '../utils/auth';

// export default function Sidebar({ companyId }) {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     // const handleSignOut = () => {
//     //     alert('Sign out')
//     //     console.log("signout")
//     // }

//     return (
//         <div>
//             <div className={`flex flex-col justify-between transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-64 h-full z-10`}>
//                 <div className="px-4 py-6">
//                     <ul className="mt-6 space-y-1">
//                         <li>

//                             <Link to={`/${companyId}/home`} className="block rounded-lg bg-[#e3d2fa] px-4 py-2 text-sm font-medium text-gray-700">
//                                 Home
//                             </Link>
//                         </li>
//                         <li>
//                             <details className="group [&_summary::-webkit-details-marker]:hidden">
//                                 <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                                     <span className="text-sm font-medium"> Teams </span>
//                                     <span className="shrink-0 transition duration-300 group-open:-rotate-180">
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <ul className="mt-2 space-y-1 px-4">
//                                     <li>
//                                         <Link to="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                                             Banned Users
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                                             Calendar
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </details>
//                         </li>
//                         <li>
//                             <Link to="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                                 Billing
//                             </Link>
//                         </li>
//                         <li>
//                             {/* <Link to={`/${companyId}/userManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700"> */}
//                             <Link to='/userManage' className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                                 Manage Users
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to={`/company/${companyId}/roleManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                             {/* <Link to='/roleManage' className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700"> */}
//                                 Manage Roles
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to={`/${companyId}/permissionManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                                 Manage Permissions
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to={`/company/${companyId}/project`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                                 Project
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/register" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                                 Register
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/profile" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                                 Profile
//                             </Link>
//                         </li>
//                         <li>
//                             <details className="group [&_summary::-webkit-details-marker]:hidden">
//                                 <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                                     <span className="text-sm font-medium"> Account </span>
//                                     <span className="shrink-0 transition duration-300 group-open:-rotate-180">
//                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                                             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                         </svg>
//                                     </span>
//                                 </summary>
//                                 <ul className="mt-2 space-y-1 px-4">
//                                     <li>
//                                         <Link to="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
//                                             Details
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
//                                             Security
//                                         </Link>
//                                     </li>
//                                     <li>

// <button onClick={handleSignOut} className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700">
//     Logout
// </button>

//                                     </li>
//                                 </ul>
//                             </details>
//                         </li>
//                     </ul>
//                 </div>

//             </div>
//         </div>
//     )
// }




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { handleSignOut } from '../utils/auth';

// export default function Sidebar({ companyId }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div>
//       <div className={`flex flex-col justify-between transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-64 h-full z-10`}>
//         <div className="px-4 py-6">
//           <ul className="mt-6 space-y-1">
//             <li>
//               {/* <Link to={`/${companyId}/home`} className="block rounded-lg bg-[#e3d2fa] px-4 py-2 text-sm font-medium text-gray-700"> */}
//               <Link to='/home' className="block rounded-lg bg-[#e3d2fa] px-4 py-2 text-sm font-medium text-gray-700">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <details className="group [&_summary::-webkit-details-marker]:hidden">
//                 <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                   <span className="text-sm font-medium"> Teams </span>
//                   <span className="shrink-0 transition duration-300 group-open:-rotate-180">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </span>
//                 </summary>
//                 <ul className="mt-2 space-y-1 px-4">
//                   <li>
//                     <Link to={`/${companyId}/banned-users`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                       Banned Users
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={`/${companyId}/calendar`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                       Calendar
//                     </Link>
//                   </li>
//                 </ul>
//               </details>
//             </li>
//             <li>
//               <Link to={`/${companyId}/billing`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                 Billing
//               </Link>
//             </li>
//             <li>
//               <Link to={`/${companyId}/userManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                 Manage Users
//               </Link>
//             </li>
//             <li>
//               <Link to={`/company/${companyId}/roleManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                 Manage Roles
//               </Link>
//             </li>
//             <li>
//               <Link to={`/company/${companyId}/permissionManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                 Manage Permissions
//               </Link>
//             </li>
//             <li>
//               <Link to={`/company/${companyId}/project`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                 Project
//               </Link>
//             </li>
//             <li>
//               <Link to="/register" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
//                 Register
//               </Link>
//             </li>
//             <li>
//               <button onClick={handleSignOut} className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700">
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>

//       </div>
//       <div className="md:hidden">
//         <button className="bg-[#e3d2fa] text-white" onClick={toggleSidebar}>
//           Toggle
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleSignOut } from '../../utils/auth';

export default function Sidebar({ companyId, role }) {
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
              <Link to={`/company/${companyId}/profile`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                Profile
              </Link>
            </li>
            {role !== 'user' && (
              <>
                {/* <li>
                  <details className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                      <span className="text-sm font-medium"> Teams </span>
                      <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </summary>
                    <ul className="mt-2 space-y-1 px-4">
                      <li>
                        <Link to={`/${companyId}/banned-users`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                          Banned Users
                        </Link>
                      </li>
                      <li>
                        <Link to={`/${companyId}/calendar`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                          Calendar
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li> */}
                {/* <li>
                  <Link to={`/${companyId}/billing`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                    Billing
                  </Link>
                </li> */}
                <li>
                  <Link to={`/company/${companyId}/userManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                    Manage Users
                  </Link>
                </li>
                <li>
                  <Link to={`/company/${companyId}/roleManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                    Manage Roles
                  </Link>
                </li>

                <li>
                  <Link to={`/company/${companyId}/permissionManage`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                    Manage Permissions
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to={`/company/${companyId}/project`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                Project
              </Link>
            </li>
            {role === 'user' && (
              <li>
                <Link to={`/company/${companyId}/mywork`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                  My Work
                </Link>
              </li>
            )}
            {role === 'superAdmin' && (
              <li>
                <Link to="/register" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                  Register
                </Link>
              </li>
            )}
            {role !== 'user' && (
              <li>
                <Link to={`/company/${companyId}/uploadDocument`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-[#e3d2fa] hover:text-gray-700">
                  Upload Document
                </Link>
              </li>)}
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
