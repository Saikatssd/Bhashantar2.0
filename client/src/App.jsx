import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './utils/firebase.jsx';
import axios from 'axios';
import Home from './pages/Home.jsx';
import Login from './pages/Login';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Project from './pages/Project.jsx';
import DocumentWorkflow from './pages/DocumentWorkflow.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        user.role = token.claims.role;
        user.companyId = token.claims.companyId;
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute user={user}>
              <Dashboard user={user} onLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute user={user}>
              <Project user={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/workflow/:projectId"
          element={
            <PrivateRoute user={user}>
              <DocumentWorkflow user={user} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;