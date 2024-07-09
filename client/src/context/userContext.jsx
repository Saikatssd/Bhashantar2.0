// // UserContext.js
// import React, { createContext, useState, useEffect } from 'react';

// const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Fetch user data after login (replace with your logic)
//     const fetchUserData = async () => {
//       const retrievedUser = /* your logic to fetch user data */;
//       setUser(retrievedUser);
//     };
//     fetchUserData();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserProvider };

// // Dashboard.js (main component)
// import React, { useContext } from 'react';
// import { UserContext } from './UserContext';
// import AdminDashboard from './AdminDashboard';
// import ManagerDashboard from './ManagerDashboard';
// import EmployeeDashboard from './EmployeeDashboard';

// const Dashboard = () => {
//   const { user } = useContext(UserContext);

//   if (!user) {
//     return <div>Please Login</div>;
//   }

//   const renderDashboard = () => {
//     switch (user.roleId) {
//       case 'admin':
//         return <AdminDashboard />;
//       case 'manager':
//         return <ManagerDashboard />;
//       case 'employee':
//         return <EmployeeDashboard />;
//       default:
//         return <div>Invalid Role</div>;
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome, {user.name}</h1>
//       {renderDashboard()}
//     </div>
//   );
// };

// export default Dashboard;
