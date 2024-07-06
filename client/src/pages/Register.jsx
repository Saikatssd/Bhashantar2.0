import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {server} from '../main'
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [companyName, setCompanyName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send request to backend to create user
      await axios.post(`${server}/api/auth/createUser`, { email, password, role, companyName });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user"> User</option>
          <option value="admin"> Admin</option>
          <option value="superAdmin">Super Admin</option>
        </select>
        <input 
          type="text" 
          value={companyName} 
          onChange={(e) => setCompanyName(e.target.value)} 
          placeholder="Company Name" 
          required={role !== 'superAdmin'}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
