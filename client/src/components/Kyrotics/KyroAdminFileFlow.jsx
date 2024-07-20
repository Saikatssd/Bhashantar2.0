import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TabPanel from '../TabPanel';
import { fetchProjectFiles, fetchProjectName, fetchUserNameById, updateFileStatus } from '../../utils/firestoreUtil';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import UserSelectModal from '../UserSelectModal';
import { auth } from '../../utils/firebase';
import Table from '../Table/Table';
import TableAdmin from '../Table/TableAdmin';

const columnsReadyForWork = [
  { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
  { id: 'name', label: 'File Name', minWidth: 100 },
  { id: 'pageCount', label: 'Page Count', minWidth: 100 },
  { id: 'uploadedDate', label: 'Uploaded At', minWidth: 100 },
  { id: 'edit', label: '', minWidth: 100, align: 'right' },
];

const columnsInProgress = [
  { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
  { id: 'name', label: 'File Name', minWidth: 100 },
  { id: 'pageCount', label: 'Page Count', minWidth: 100 },
  { id: 'kyro_assignedDate', label: 'Assigned Date', minWidth: 100 },
  { id: 'kyro_assignedTo', label: 'Assigned To', minWidth: 150 },
  { id: 'edit', label: '', minWidth: 100, align: 'right' },
];

const columnsCompleted = [
  { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
  { id: 'name', label: 'File Name', minWidth: 100 },
  { id: 'pageCount', label: 'Page Count', minWidth: 100 },
  // { id: 'projectName', label: 'Project Name', minWidth: 150 },
  { id: 'kyro_completedDate', label: 'Completed Date', minWidth: 100 },
  { id: 'kyro_assignedTo', label: 'Completed By', minWidth: 150 },
];

const KyroAdminFileFlow = () => {
  const { projectId } = useParams();
  const [files, setFiles] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [companyId, setCompanyId] = useState('');
  const [readyForWorkFiles, setReadyForWorkFiles] = useState([]);
  const [inProgressFiles, setInProgressFiles] = useState([]);
  const [completedFiles, setCompletedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { currentUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        // console.log(token)
        user.roleName = token.claims.roleName;
        user.companyId = token.claims.companyId;

        setRole(user.roleName);
        setCompanyId(user.companyId);
      }
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       const token = await user.getIdTokenResult();
  //       const response = await axios.get(`${server}/api/auth/getUserProfile`, {
  //         headers: {
  //           Authorization: `Bearer ${token.token}`,
  //         },
  //       });
  //       setCompanyId(response.data.companyId);
  //       setRole(response.data.roleName);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const getFiles = async () => {
      if (!companyId || !projectId) return;
      setIsLoading(true);
      try {
        const projectFiles = await fetchProjectFiles(projectId);
        const projectName = await fetchProjectName(projectId);

        const fetchFileUsers = async (files) => {
          return await Promise.all(files.map(async (file) => {
            const assignedUser = file.kyro_assignedTo ? await fetchUserNameById(file.kyro_assignedTo) : null;
            // const completedUser = file.kyro_assignedTo ? await fetchUserNameById(file.assignedTo) : null;
            return {
              ...file,
              kyro_assignedTo: assignedUser,
              // completedBy: completedUser
            };
          }));
        };

        // const statusMapping = (companyId === 'cvy2lr5H0CUVH8o2vsVk')
        //   ? { ready: 2, progress: 3, completed: 4 }
        //   : { ready: 4, progress: 5, completed: 6 };

        // const readyForWork = await fetchFileUsers(projectFiles.filter(file => file.status === statusMapping.ready));
        // const inProgress = await fetchFileUsers(projectFiles.filter(file => file.status === statusMapping.progress));
        // const completed = await fetchFileUsers(projectFiles.filter(file => file.status === statusMapping.completed));

        const readyForWork = await fetchFileUsers(projectFiles.filter(file => file.status === 2));
        const inProgress = await fetchFileUsers(projectFiles.filter(file => file.status === 3));
        const completed = await fetchFileUsers(projectFiles.filter(file => file.status >= 4));


        setReadyForWorkFiles(readyForWork.map((file, index) => ({ ...file, slNo: index + 1 })));
        setInProgressFiles(inProgress.map((file, index) => ({ ...file, slNo: index + 1 })));
        setCompletedFiles(completed.map((file, index) => ({ ...file, slNo: index + 1 })));
        setProjectName(projectName);
      } catch (err) {
        console.error('Error fetching files:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getFiles();
  }, [companyId, projectId]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = (id) => {
    setSelectedFileId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedFileId(null);
  };

  const handleAssignToUser = async (userId) => {
    try {
      await updateFileStatus(projectId, selectedFileId, { status: 3, kyro_assignedTo: userId, kyro_assignedDate: new Date().toISOString() });

      // await updateFileStatus(projectId, selectedFileId, 3, userId);
      setReadyForWorkFiles(files.filter(file => file.id !== selectedFileId));
      handleCloseModal();
    } catch (err) {
      console.error('Error updating file status:', err);
      setError(err);
    }
  };



  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" centered>
          <Tab label="Ready for Work" />
          <Tab label="Work in Progress" />
          <Tab label="Completed" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <TableAdmin
          columns={columnsReadyForWork}
          rows={readyForWorkFiles}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleEditClick={handleOpenModal}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          projectName={projectName}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Table
          columns={columnsInProgress}
          rows={inProgressFiles}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          // projectId={projectId}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Table
          columns={columnsCompleted}
          rows={completedFiles}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TabPanel>
      <UserSelectModal
        open={openModal}
        handleClose={handleCloseModal}
        handleAssign={handleAssignToUser}
        companyId={companyId}
      />
    </Box>
  );
};

export default KyroAdminFileFlow;
