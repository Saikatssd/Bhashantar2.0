import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentWorkflow = ({ user }) => {
  const { projectId } = useParams();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await axios.get(`/api/projects/${projectId}/documents`);
      setDocuments(response.data);
    };
    fetchDocuments();
  }, [projectId]);

  const handleUpdateStatus = async (documentId, status) => {
    await axios.post(`/api/projects/${projectId}/documents/${documentId}/updateStatus`, { status });
    setDocuments(documents.map(doc => doc.id === documentId ? { ...doc, status } : doc));
  };

  return (
    <div>
      <h1>Document Workflow</h1>
      <ul>
        {documents.map(doc => (
          <li key={doc.id}>
            {doc.filename} - {doc.status}
            <button onClick={() => handleUpdateStatus(doc.id, 'in-progress')}>Start Work</button>
            <button onClick={() => handleUpdateStatus(doc.id, 'completed')}>Complete Work</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentWorkflow;
