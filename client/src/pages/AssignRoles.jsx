import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignRoles = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      const usersResponse = await axios.get('/api/users');
      const rolesResponse = await axios.get('/api/roles');
      setUsers(usersResponse.data);
      setRoles(rolesResponse.data);
    };
    fetchUsersAndRoles();
  }, []);

  const handleAssignRole = async (e) => {
    e.preventDefault();
    await axios.post('/api/roles/assignRole', { userId: selectedUser, roleId: selectedRole });
  };

  return (
    <div>
      <h1>Assign Roles</h1>
      <form onSubmit={handleAssignRole}>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.email}</option>
          ))}
        </select>
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
        <button type="submit">Assign Role</button>
      </form>
    </div>
  );
};

export default AssignRoles;
