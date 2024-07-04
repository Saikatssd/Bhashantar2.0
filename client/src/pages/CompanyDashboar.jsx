// src/components/CompanyDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyDashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch projects for the company
        const fetchProjects = async () => {
            const response = await axios.get('/api/projects');
            setProjects(response.data);
        };
        fetchProjects();
    }, []);

    return (
        <div>
            <h1>Company Dashboard</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                ))}
            </ul>
            <button onClick={() => {/* Logic to create new project */}}>Create New Project</button>
        </div>
    );
};

export default CompanyDashboard;
