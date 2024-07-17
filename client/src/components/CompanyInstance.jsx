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
import UserWork from '../pages/Users/UserWorkspace'
import UserManage from '../pages/UserManage';
import ProjectFiles from './ProjectFiles';
import KyroDocs from './Kyrotics/KyroUserFileAssign';
import KyroProjects from './Kyrotics/ClientProjects';
import AdminDocs from './Kyrotics/KyroAdminFileFlow';
import UploadDocument from './UploadDocument';
import AdminFileFlow from './AdminFileFlow';
import Profile from '../pages/Profile';
const CompanyInstance = ({ role }) => {
  const { companyId } = useParams();

  return (
    <div className="flex">
      <Sidebar companyId={companyId} role={role} />
      <div className="flex-grow">
        <Routes>
          <Route path="/profile" element={<Profile />} />

          <Route path="project" element={<ProjectList />} />
          {role === 'user' && (
            <>
              <Route path="/project/:projectId" element={<ProjectFiles />} />
            </>
          )}


          {role !== 'user' && (
            <>
              {/* <Route path="project/:projectId" element={<AdminDocs />} /> */}
              <Route path="project/:projectId" element={<AdminFileFlow />} />
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

