import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={onLogout}>Logout</button>
      {user.role === 'superAdmin' && (
        <div>
          <Link to="/create-company">Create Company</Link>
        </div>
      )}
      {user.role !== 'companyUser' && (
        <div>
          <Link to="/projects">Manage Projects</Link>
        </div>
      )}
      {user.role === 'companyUser' && (
        <div>
          <Link to="/workflow">Document Workflow</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
