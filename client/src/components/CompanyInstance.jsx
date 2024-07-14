// import React from 'react';
// import { useParams } from 'react-router-dom';
// import Sidebar from './Sidebar';

// const CompanyInstance = () => {
//   const { id } = useParams();

//   return (
//     <div className="flex">
//       <Sidebar companyId={id} />
//       <div>

//         Company Instance for {id}
//       </div>
//     </div>
//   )
// };

// export default CompanyInstance;




import React from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminHome from '../pages/Admin/AdminHome';
import UserHome from '../pages/Users/UserHome';
// import SuperAdminHome from '../pages/SuperAdmin/SuperAdminHome';
import ProjectList from '../pages/ProjectList';
import PermissionsManage from '../pages/PemissionManage';
import RoleManage from '../pages/RoleManage';
import UserWork from '../pages/Users/UserWork'
import UserManage from '../pages/UserManage';
import ProjectFiles from './ProjectFiles';
import KyroDocs from './KyroDocs';
import KyroProjects from './KyroProjects';
import AdminDocs from './AdminDocs';
import UploadDocument from './UploadDocument';
const CompanyInstance = ({ role }) => {
  const { companyId } = useParams();

  return (
    <div className="flex">
      <Sidebar companyId={companyId} role={role} />
      <div className="flex-grow">
        <Routes>
          <Route path="project" element={<ProjectList />} />
          {/* <Route path="kyro/project" element={<KyroProjects />} /> */}
          {/* <Route path="myWork" element={<UserWork />} /> */}
          {/* <Route path="kyro/project/:projectId" element={<KyroDocs />} /> */}
          {role === 'user' && (
            <>
              <Route path="/project/:projectId" element={<ProjectFiles />} />
            </>
          )}


          {role !== 'user' && (
            <>
              <Route path="project/:projectId" element={<AdminDocs />} />
              <Route path="uploadDocument" element={<UploadDocument />} />
              <Route path="permissionManage" element={<PermissionsManage />} />
              <Route path="roleManage" element={<RoleManage />} />
              <Route path="userManage" element={<UserManage companyId={companyId} />} />


            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default CompanyInstance;

