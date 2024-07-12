import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TableClient from './TableClient';
import TableAdmin from './TableAdmin';
import { uploadFile, fetchProjectFiles, fetchProjectName, deleteFile } from '../utils/firestoreUtil';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import { server } from '../main';
import {updateFileStatus} from '../utils/firestoreUtil'

const ProjectFiles = () => {
  const { projectId } = useParams();
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [projectName, setProjectName] = useState('');
  const [companyId, setCompanyId] = useState(null);
  const [role, setRole] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        const response = await axios.get(`${server}/api/auth/getUserProfile`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        console.log("company id", response.data.companyId);
        console.log("role", response.data.roleName);
        setCompanyId(response.data.companyId);
        setRole(response.data.roleName);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (companyId && role) {
      const getProjectData = async () => {
        setIsLoading(true);
        try {
          const projectFiles = await fetchProjectFiles(projectId);
          const projectName = await fetchProjectName(projectId);
          const filteredFiles = projectFiles.filter(file => 
            (file.status === 2 && companyId === 'cvy2lr5H0CUVH8o2vsVk' && role === 'user') ||
            (file.status === 4 && companyId !== 'cvy2lr5H0CUVH8o2vsVk' && role === 'user') ||
            (role === 'admin' && file.status === 0)
          );
          setFiles(filteredFiles);
          setProjectName(projectName);
        } catch (err) {
          console.error('Error fetching project data:', err);
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };
      getProjectData();
    }
  }, [projectId, companyId, role]);

  const handleFileUpload = async (e) => {
    const uploadedFiles = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
    try {
      setIsLoading(true);
      const uploadPromises = uploadedFiles.map(file => uploadFile(projectId, file));
      const uploadedFilesData = await Promise.all(uploadPromises);
      setFiles([...files, ...uploadedFilesData]);
      setIsLoading(false);
    } catch (err) {
      console.error('Error uploading files:', err);
      setError(err);
      setIsLoading(false);
    }
  };

  const handleFileDelete = async (fileId, fileName) => {
    try {
      setIsLoading(true);
      await deleteFile(projectId, fileId, fileName);
      setFiles(files.filter(file => file.id !== fileId));
      setIsLoading(false);
    } catch (err) {
      console.error('Error deleting file:', err);
      setError(err);
      setIsLoading(false);
    }
  };

  const handleFileAssign = async (id) => {
    try {
      await updateFileStatus(projectId, id, 3, currentUser.uid);
      setFiles(files.filter(file => file.id !== id));
    } catch (err) {
      console.error('Error updating file status:', err);
      setError(err);
    }
  };

  const columns = [
    { id: 'slNo', label: 'Sl. No', minWidth: 50 },
    { id: 'name', label: 'File Name', minWidth: 170 },
    { id: 'uploadedAt', label: 'Uploaded At', minWidth: 170 },
    { id: 'edit', label: 'Actions', minWidth: 100 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="application/pdf"
        id="file-upload"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      {isLoading && <CircularProgress />}
      {error && <p>Error: {error.message}</p>}
      {!isLoading && !error && files.length === 0 && <p>No files found.</p>}
      {!isLoading && !error && files.length > 0 && (
        role === 'admin' ? (
          <TableAdmin
            columns={columns}
            rows={files.map((file, index) => ({ ...file, slNo: index + 1 }))}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleEditClick={handleFileDelete}
            projectName={projectName}
          />
        ) : (
          <TableClient
            columns={columns}
            rows={files.map((file, index) => ({ ...file, slNo: index + 1 }))}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleEditClick={handleFileAssign}
            projectName={projectName}
          />
        )
      )}
      {role === 'admin' && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => document.getElementById('file-upload').click()}
          style={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          Upload Files
        </Button>
      )}
    </div>
  );
};

export default ProjectFiles;
