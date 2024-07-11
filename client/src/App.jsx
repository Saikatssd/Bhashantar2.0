// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { auth } from './utils/firebase.jsx';
// import axios from 'axios';
// import Home from './pages/Home.jsx';
// import Login from './pages/Login';
// import Register from './pages/Register.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import Project from './pages/Project.jsx';
// import DocumentWorkflow from './pages/DocumentWorkflow.jsx';
// import PrivateRoute from './components/PrivateRoute.jsx';
// import { Toaster } from "react-hot-toast";
// import { AuthProvider } from './context/AuthContext.jsx';

// const App = () => {
//   const [user, setUser] = useState(null);


//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const token = await user.getIdTokenResult();
//         user.role = token.claims.role;
//         user.companyId = token.claims.companyId;
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLogout = () => {
//     auth.signOut().then(() => {
//       setUser(null);
//     });
//   };

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>

//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute user={user}>
//                 <Dashboard user={user} onLogout={handleLogout} />
//               </PrivateRoute>
//             }
//             />
//             {/* <Route path="/" element={<Home />} /> */}
//           {/* <Route
//             path="/projects"
//             element={
//               <PrivateRoute user={user}>
//                 <Project user={user} />
//               </PrivateRoute>
//             }
//           /> */}
//           {/* <Route
//             path="/workflow/:projectId"
//             element={
//               <PrivateRoute user={user}>
//                 <DocumentWorkflow user={user} />
//               </PrivateRoute>
//             }
//           /> */}
//           {/* <Route path="*" element={<Navigate to="/" />} /> */}
//         </Routes>
//         <Toaster />
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;


// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { auth } from './utils/firebase';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import PrivateRoute from './components/PrivateRoute';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Profile from './pages/Profile';
// import ProjectList from './pages/ProjectList';
// import PermissionsManage from './pages/PemissionManage';
// import RoleManage from './pages/RoleManage';
// import CompanyList from './pages/CompanyList';
// import CompanyInstance from './components/CompanyInstance';
// import { getAuth } from 'firebase/auth';
// import axios from 'axios';
// import { server } from './main';
// import AdminHome from './pages/Admin/AdminHome';
// import UserHome from './pages/Users/UserHome';
// import SuperAdminHome from './pages/SuperAdmin/SuperAdminHome';


// const App = () => {
//   // const { userLoggedIn } = useAuth();

//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [role, setRole] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const token = await user.getIdTokenResult();
//         user.role = token.claims.role;
//         user.companyId = token.claims.companyId;
//         setUser(user);
//         console.log("user", user)
//         // const userToken = await user.getIdToken();
//         console.log("token", token)
//         const response = await axios.get(`${server}/api/auth/getUserProfile`, {
//           headers: {
//             'Authorization': `Bearer ${token.token}`
//           }
//         });
//         // console.log("response", response);
//         // setUser(response.data);

//         setRole(response.data.roleName)
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);


//   // useEffect(() => {
//   //   const fetchUserProfile = async () => {
//   //     // const auth = getAuth();
//   //     auth.onAuthStateChanged(async (user) => {
//   //       if (user) {
//   //         try {
//   //           console.log("user: " + user)
//   //           const token = await user.getIdToken();
//   // const response = await axios.get(`${server}/api/auth/getUserProfile`, {
//   //   headers: {
//   //     'Authorization': `Bearer ${token}`
//   //   }
//   // });
//   // console.log("response", response);
//   //           setRole(response.data.roleName);
//   //         } catch (err) {
//   //           setError('Error fetching profile');
//   //         } finally {
//   //           setLoading(false);
//   //         }
//   //       } else {
//   //         setLoading(false);
//   //         setError('No user is signed in');
//   //       }
//   //     });
//   //   };

//   //   fetchUserProfile();
//   // }, []);

//   const handleLogout = () => {
//     auth.signOut().then(() => {
//       setUser(null);
//     });
//   };

//   const getDashboard = () => {
//     console.log("role", role)
//     if (!user) return <Navigate to="/" />;

//     if (role === 'user') return <UserHome />;
//     if (role === 'admin') return <AdminHome />;
//     if (role === 'superAdmin') return <SuperAdminHome />;
//     return <Navigate to="/dashboard" />;
//   };


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>

//           <Route path="/" element={<Login />} />

//           <Route path="/:companyId/home" Component={getDashboard} />


//           <Route path="/register" element={<Register />} />

//           <Route path="/:companyId/adminHome" element={<AdminHome />} />
//           <Route path="/profile" element={<Profile />} />
//           {/* <Route path="/project" element={<ProjectList companyId={user.companyId}/>} /> */}
//           <Route path="/company/:companyId/project" element={<ProjectList />} />
//           <Route path="/:companyId/permissionManage" element={<PermissionsManage />} />
//           <Route path="/company/:companyId/roleManage" element={<RoleManage />} />
//           <Route path="/company" element={<CompanyList />} />
//           <Route path="/company/:id" element={<CompanyInstance />} />
//           {/* <Route path="/workspace" element={<Workspace />} /> */}
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute user={user}>
//                 <Dashboard role={role} onLogout={handleLogout} />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//         <Toaster />
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;



// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { auth } from './utils/firebase';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import PrivateRoute from './components/PrivateRoute';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import Profile from './pages/Profile';
// // import ProjectList from './pages/ProjectList';
// // import PermissionsManage from './pages/PermissionsManage';
// // import RoleManage from './pages/RoleManage';
// // import CompanyList from './pages/SuperAdmin/SuperAdminHome';
// import CompanyInstance from './components/CompanyInstance';
// import axios from 'axios';
// import AdminHome from './pages/Admin/AdminHome';
// import UserHome from './pages/Users/UserHome';
// import SuperAdminHome from './pages/SuperAdmin/SuperAdminHome';
// import { server } from './main';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const token = await user.getIdTokenResult();
//         user.role = token.claims.role;
//         user.companyId = token.claims.companyId;
//         setUser(user);

//         const response = await axios.get(`${server}/api/auth/getUserProfile`, {
//           headers: {
//             Authorization: `Bearer ${token.token}`,
//           },
//         });
//         setRole(response.data.roleName);
//         console.log("roleName", response.data.roleName);
//         console.log("role", role);

//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = () => {
//     auth.signOut().then(() => {
//       setUser(null);
//     });
//   };

//   const getDashboard = () => {
//     console.log("role", role);

//     if (!user) return <Navigate to="/" />;

//     if (role === 'user') return <UserHome />;
//     if (role === 'admin') return <AdminHome />;
//     if (role === 'superAdmin') return <SuperAdminHome />;
//     return <Navigate to="/dashboard" />;
//   };


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/home" element={getDashboard} />

//           <Route path="/" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/superAdmin" element={<SuperAdminHome />} />
//           <Route path="/company/:companyId/*" element={<CompanyInstance />} />
//           <Route path="/dashboard" element={<PrivateRoute user={user}><Dashboard role={role} onLogout={handleLogout} /></PrivateRoute>} />
//         </Routes>
//         <Toaster />
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;




// src/App.jsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './utils/firebase';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile';
import CompanyInstance from './components/CompanyInstance';
import axios from 'axios';
// import AdminHome from './pages/Admin/AdminHome';
// import UserHome from './pages/Users/UserHome';
// import SuperAdminHome from './pages/SuperAdmin/SuperAdminHome';
import { server } from './main';
import DashboardWrapper from './components/DashboardWrapper';

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        user.role = token.claims.role;
        user.companyId = token.claims.companyId;
        setUser(user);

        const response = await axios.get(`${server}/api/auth/getUserProfile`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        setRole(response.data.roleName);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<DashboardWrapper />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/superAdmin" element={<SuperAdminHome />} /> */}
          <Route path="/company/:companyId/*" element={<CompanyInstance role={role} />} />
          <Route path="/dashboard" element={<PrivateRoute user={user}><Dashboard role={role} onLogout={handleLogout} /></PrivateRoute>} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
};

export default App;
