import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('companyUser');
  const [companyId, setCompanyId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      await user.getIdTokenResult(true);
      await axios.post('/api/auth/createUser', { email, password, role, companyId });
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
          <option value="companyUser">Company User</option>
          <option value="companyAdmin">Company Admin</option>
          <option value="superAdmin">Super Admin</option>
        </select>
        <input 
          type="text" 
          value={companyId} 
          onChange={(e) => setCompanyId(e.target.value)} 
          placeholder="Company ID" 
          required={role !== 'superAdmin'}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
