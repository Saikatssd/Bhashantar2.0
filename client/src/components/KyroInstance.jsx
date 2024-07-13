import React from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';

import PermissionsManage from '../pages/PemissionManage';
import RoleManage from '../pages/RoleManage';
import UserWork from '../pages/Users/UserWork'
import UserManage from '../pages/UserManage';
import KyroDocs from './KyroDocs';
import KyroProjects from './KyroProjects';

export default function KyroInstance() {
    return (
        <div className="flex">
            {/* <Sidebar companyId={companyId} role={role} /> */}
            <div className="flex-grow">
                <Routes>
                    <Route path="project" element={<KyroProjects />} />
                    <Route path="project/:projectId" element={<KyroDocs />} />


                    {/* {role !== 'user' && (
                        <>

                            <Route path="permissionManage" element={<PermissionsManage />} />
                            <Route path="roleManage" element={<RoleManage />} />
                            <Route path="userManage" element={<UserManage companyId={companyId} />} />
                        </>
                    )} */}
                </Routes>
            </div>
        </div>
    )
}



