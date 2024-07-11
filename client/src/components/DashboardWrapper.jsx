import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import UserHome from '../pages/Users/UserHome';
import AdminHome from '../pages/Admin/AdminHome';
import SuperAdminHome from '../pages/SuperAdmin/SuperAdminHome';
import axios from 'axios';
import { server } from '../main';

const DashboardWrapper = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [companyId, setCompanyId] = useState(null);
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
                console.log("company id", response.data.companyId)
                setRole(response.data.roleName);
                setCompanyId(response.data.companyId);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    // Allow specific company user to access SuperAdminHome
    if (role === 'user' && companyId === 'cvy2lr5H0CUVH8o2vsVk') {
        return <SuperAdminHome />;
    }

    if (role === 'user') {
        return <UserHome companyId={companyId} />;
    }
    if (role === 'admin') {
        return <AdminHome companyId={companyId} />;
    }
    if (role === 'superAdmin') {
        return <SuperAdminHome />;
    }

    return <Navigate to="/dashboard" />;
};

export default DashboardWrapper;
