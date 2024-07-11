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

const CompanyInstance = ({ role }) => {
  const { companyId } = useParams();

  return (
    <div className="flex">
      <Sidebar companyId={companyId} role={role} />
      <div className="flex-grow">
        <Routes>
          <Route path="project" element={<ProjectList />} />
          <Route path="myWork" element={<UserWork />} />
          {role !== 'user' && (
            <>

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

