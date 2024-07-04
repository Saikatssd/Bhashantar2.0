import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await axios.get(`/api/projects/${user.companyId}/projects`);
      setProjects(response.data);
    };
    fetchProjects();
  }, [user.companyId]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/projects/createProject', {
      name,
      companyId: user.companyId
    });
    setProjects([...projects, { id: response.data.id, name }]);
  };

  return (
    <div>
      <h1>Projects</h1>
      <form onSubmit={handleCreateProject}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Project Name" 
          required 
        />
        <button type="submit">Create Project</button>
      </form>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
