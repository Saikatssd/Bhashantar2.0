import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageRoles = () => {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState('');

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await axios.get('/api/roles');
      setRoles(response.data);
    };
    fetchRoles();
  }, []);

  const handleCreateRole = async (e) => {
    e.preventDefault();
    await axios.post('/api/roles/createRole', { name, permissions: permissions.split(',') });
    setRoles([...roles, { name, permissions: permissions.split(',') }]);
  };

  return (
    <div>
      <h1>Manage Roles</h1>
      <form onSubmit={handleCreateRole}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Role Name"
          required
        />
        <input
          type="text"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
          placeholder="Permissions (comma separated)"
          required
        />
        <button type="submit">Create Role</button>
      </form>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>
            {role.name} - {role.permissions.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRoles;
