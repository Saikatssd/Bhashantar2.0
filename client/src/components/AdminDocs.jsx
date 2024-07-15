// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import CircularProgress from '@mui/material/CircularProgress';
// import Typography from '@mui/material/Typography';
// import Table2 from './Table2';
// import TabPanel from './TabPanel';
// import { fetchProjectFiles, fetchProjects, fetchProjectName } from '../utils/firestoreUtil';
// import { useAuth } from '../context/AuthContext';
// import KyroticsTableAdmin from './KyroticsTableAdmin';
// import { useParams } from 'react-router-dom';
// import UserSelectModal from './UserSelectModal';
// import { auth } from '../utils/firebase';
// import axios from 'axios';
// import { server } from '../main'

// const columnsReadyForWork = [
//   { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
//   { id: 'name', label: 'File Name', minWidth: 100 },
//   // { id: 'projectName', label: 'Project Name', minWidth: 150 },
//   { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
//   { id: 'edit', label: '', minWidth: 100, align: 'right' },
// ];


// const columnsInProgress = [
//   { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
//   { id: 'name', label: 'File Name', minWidth: 100 },
//   { id: 'projectName', label: 'Project Name', minWidth: 150 },
//   { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
//   { id: 'assignedTo', label: 'Assigned To', minWidth: 150 },
//   { id: 'edit', label: '', minWidth: 100, align: 'right' },
// ];


// const columnsCompleted = [
//   { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
//   { id: 'name', label: 'File Name', minWidth: 100 },
//   { id: 'projectName', label: 'Project Name', minWidth: 150 },
//   { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
//   { id: 'completedBy', label: 'Completed By', minWidth: 150 },
// ];

// const AdminDocs = () => {
//   const { projectId } = useParams();
//   const [files, setFiles] = useState([]);

//   const [tabValue, setTabValue] = useState(0);
//   const [companyId, setCompanyId] = useState('');
//   const [readyForWorkFiles, setReadyForWorkFiles] = useState([]);
//   const [inProgressFiles, setInProgressFiles] = useState([]);
//   const [completedFiles, setCompletedFiles] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const { currentUser } = useAuth();
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedFileId, setSelectedFileId] = useState(null);
//   const [projectName, setProjectName] = useState('');
//   const [role, setRole] = useState('');

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const token = await user.getIdTokenResult();
//         const response = await axios.get(`${server}/api/auth/getUserProfile`, {
//           headers: {
//             Authorization: `Bearer ${token.token}`,
//           },
//         });
//         setCompanyId(response.data.companyId);
//         setRole(response.data.roleName);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const getFiles = async () => {
//       setIsLoading(true);
//       try {
//         const projectsData = await fetchProjects();
//         const projectsWithFiles = await Promise.all(
//           projectsData.map(async (project) => {
//             const projectFiles = await fetchProjectFiles(project.id);
//             return { ...project, files: projectFiles };
//           })
//         );

//         setProjects(projectsWithFiles);

//         const allReadyForWorkFiles = [];
//         const allInProgressFiles = [];
//         const allCompletedFiles = [];

//         projectsWithFiles.forEach((project) => {
//           const projectReadyForWorkFiles = project.files.filter(
//             (file) => file.status === 2
//           );
//           const projectInProgressFiles = project.files.filter(
//             (file) => file.status === 3
//           );
//           const projectCompletedFiles = project.files.filter(
//             (file) => file.status === 4
//           );

//           projectReadyForWorkFiles.forEach((file) =>
//             allReadyForWorkFiles.push({
//               ...file,
//               projectId: project.id,
//               projectName: project.name,
//             })
//           );
//           projectInProgressFiles.forEach((file) =>
//             allInProgressFiles.push({
//               ...file,
//               projectId: project.id,
//               projectName: project.name,
//               assignedTo: file.assignedTo,
//             })
//           );
//           projectCompletedFiles.forEach((file) =>
//             allCompletedFiles.push({
//               ...file,
//               projectId: project.id,
//               projectName: project.name,
//               completedBy: file.completedBy,
//             })
//           );
//         });

//         setReadyForWorkFiles(allReadyForWorkFiles);
//         setInProgressFiles(allInProgressFiles);
//         setCompletedFiles(allCompletedFiles);
//       } catch (err) {
//         console.error('Error fetching files:', err);
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getFiles();
//   }, [currentUser.uid]);


//   // useEffect(() => {
//   //   if (companyId) {
//   //     const getProjectData = async () => {
//   //       setIsLoading(true);
//   //       try {
//   //         const projectFiles = await fetchProjectFiles(projectId);
//   //         const projectName = await fetchProjectName(projectId);
//   //         const filteredFiles = projectFiles.filter(file =>
//   //           (file.status === 2 && companyId === 'cvy2lr5H0CUVH8o2vsVk')
//   //           // (file.status === 4 && companyId !== 'cvy2lr5H0CUVH8o2vsVk' && role === 'user') ||
//   //           //(role === 'admin' && file.status === 0)
//   //         );
//   //         setReadyForWorkFiles(filteredFiles);
//   //         setProjectName(projectName);
//   //       } catch (err) {
//   //         console.error('Error fetching project data:', err);
//   //         setError(err);
//   //       } finally {
//   //         setIsLoading(false);
//   //       }
//   //     };
//   //     getProjectData();
//   //   }
//   // }, [projectId, companyId, role]);


//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleOpenModal = (id) => {
//     setSelectedFileId(id);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedFileId(null);
//   };

//   const handleAssignToUser = async (userId) => {
//     try {
//       await updateFileStatus(projectId, selectedFileId, 3, userId);
//       setReadyForWorkFiles(files.filter(file => file.id !== selectedFileId));
//       handleCloseModal();
//     } catch (err) {
//       console.error('Error updating file status:', err);
//       setError(err);
//     }
//   };

//   if (isLoading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Typography color="error">Error: {error.message}</Typography>;
//   }

//   return (
//     <Box>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" centered>
//           <Tab label="Ready for Work" />
//           <Tab label="Work in Progress" />
//           <Tab label="Completed" />
//         </Tabs>
//       </Box>

//       <TabPanel value={tabValue} index={0}>
//         <KyroticsTableAdmin
//           columns={columnsReadyForWork}
//           rows={readyForWorkFiles.map((file, index) => ({ ...file, slNo: index + 1 }))}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={handleChangePage}
//           handleEditClick={handleOpenModal}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </TabPanel>

//       <TabPanel value={tabValue} index={1}>
//         <Table2
//           columns={columnsInProgress}
//           rows={inProgressFiles.map((file, index) => ({ ...file, slNo: index + 1 }))}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={handleChangePage}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//           projectName={projectName}
//         />
//       </TabPanel>

//       <TabPanel value={tabValue} index={2}>
//         <Table2
//           columns={columnsCompleted}
//           rows={completedFiles.map((file, index) => ({ ...file, slNo: index + 1 }))}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={handleChangePage}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </TabPanel>
//       <UserSelectModal
//         open={openModal}
//         handleClose={handleCloseModal}
//         handleAssign={handleAssignToUser}
//         companyId={companyId}
//       />
//     </Box>
//   );
// };

// export default AdminDocs;




// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import CircularProgress from '@mui/material/CircularProgress';
// import Typography from '@mui/material/Typography';
// import Table2 from './Table2';
// import TabPanel from './TabPanel';
// import UserSelectModal from './UserSelectModal';
// import { fetchProjectFiles, fetchProjects, fetchUserNameById, fetchUsers, updateFileStatus } from '../utils/firestoreUtil';
// import { useAuth } from '../context/AuthContext';

// const columnsReadyForWork = [
//   { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
//   { id: 'name', label: 'File Name', minWidth: 100 },
//   { id: 'projectName', label: 'Project Name', minWidth: 150 },
//   { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
//   { id: 'assign', label: '', minWidth: 100, align: 'right' },
// ];

// const columnsInProgress = [
//   { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
//   { id: 'name', label: 'File Name', minWidth: 100 },
//   { id: 'projectName', label: 'Project Name', minWidth: 150 },
//   { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
//   { id: 'assignedTo', label: 'Assigned To', minWidth: 150 },
//   { id: 'edit', label: '', minWidth: 100, align: 'right' },
// ];

// const columnsCompleted = [
//   { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
//   { id: 'name', label: 'File Name', minWidth: 100 },
//   { id: 'projectName', label: 'Project Name', minWidth: 150 },
//   { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
//   { id: 'completedBy', label: 'Completed By', minWidth: 150 },
// ];

// const AdminDocs = () => {
//   const [projects, setProjects] = useState([]);
//   const [files, setFiles] = useState([]);
//   const [tabValue, setTabValue] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const { currentUser } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const fetchedProjects = await fetchProjects();
//         setProjects(fetchedProjects);
//         if (fetchedProjects.length > 0) {
//           const fetchedFiles = await fetchProjectFiles(fetchedProjects[0].id);
//           setFiles(fetchedFiles);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//       setIsLoading(false);
//     };

//     fetchData();
//   }, []);

//   const handleChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleAssign = async (fileId, userId) => {
//     try {
//       const userName = await fetchUserNameById(userId);
//       console.log(`Assigned ${fileId} to ${userName}`);
//       await updateFileStatus(projects[0].id, fileId, 1, userId); // Assuming status 1 is "in progress"
//       const updatedFiles = await fetchProjectFiles(projects[0].id);
//       setFiles(updatedFiles);
//     } catch (error) {
//       console.error('Error assigning file:', error);
//     }
//   };

//   if (isLoading) {
//     return <CircularProgress />;
//   }

//   return (
//     <Box>
//       <Tabs value={tabValue} onChange={handleChange}>
//         <Tab label="Ready for Work" />
//         <Tab label="Work in Progress" />
//         <Tab label="Completed" />
//       </Tabs>
//       <TabPanel value={tabValue} index={0}>
//         <Table2 columns={columnsReadyForWork} rows={files.filter(file => file.status === 0)} />
//       </TabPanel>
//       <TabPanel value={tabValue} index={1}>
//         <Table2 columns={columnsInProgress} rows={files.filter(file => file.status === 1)} />
//       </TabPanel>
//       <TabPanel value={tabValue} index={2}>
//         <Table2 columns={columnsCompleted} rows={files.filter(file => file.status === 2)} />
//       </TabPanel>
//       <UserSelectModal onAssign={handleAssign} />
//     </Box>
//   );
// };

// export default AdminDocs;



import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Table2 from './Table2';
import TabPanel from './TabPanel';
import { fetchProjectFiles, fetchProjectName, fetchUserNameById, updateFileStatus } from '../utils/firestoreUtil';
import { useAuth } from '../context/AuthContext';
import KyroticsTableAdmin from './KyroticsTableAdmin';
import { useParams } from 'react-router-dom';
import UserSelectModal from './UserSelectModal';
import { auth } from '../utils/firebase';
import axios from 'axios';
import { server } from '../main';
import Table from './TableUpload';

const columnsReadyForWork = [
  { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
  { id: 'name', label: 'File Name', minWidth: 100 },
  { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
  { id: 'edit', label: '', minWidth: 100, align: 'right' },
];

const columnsInProgress = [
  { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
  { id: 'name', label: 'File Name', minWidth: 100 },
  { id: 'projectName', label: 'Project Name', minWidth: 150 },
  { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
  { id: 'assignedTo', label: 'Assigned To', minWidth: 150 },
  { id: 'edit', label: '', minWidth: 100, align: 'right' },
];

const columnsCompleted = [
  { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
  { id: 'name', label: 'File Name', minWidth: 100 },
  // { id: 'projectName', label: 'Project Name', minWidth: 150 },
  { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
  { id: 'completedBy', label: 'Completed By', minWidth: 150 },
];

const AdminDocs = () => {
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
        const response = await axios.get(`${server}/api/auth/getUserProfile`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        setCompanyId(response.data.companyId);
        setRole(response.data.roleName);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getFiles = async () => {
      setIsLoading(true);
      try {
        const projectFiles = await fetchProjectFiles(projectId);
        const projectName = await fetchProjectName(projectId);

        const fetchFileUsers = async (files) => {
          return await Promise.all(files.map(async (file) => {
            const assignedUser = file.assignedTo ? await fetchUserNameById(file.assignedTo) : null;
            const completedUser = file.assignedTo ? await fetchUserNameById(file.assignedTo) : null;
            return {
              ...file,
              assignedTo: assignedUser,
              completedBy: completedUser
            };
          }));
        };

        const readyForWork = await fetchFileUsers(projectFiles.filter((file) => (companyId === 'cvy2lr5H0CUVH8o2vsVk') ? file.status === 2 : file.status === 4));
        const inProgress = await fetchFileUsers(projectFiles.filter((file) => (companyId === 'cvy2lr5H0CUVH8o2vsVk') ? file.status === 3 : file.status === 5));
        const completed = await fetchFileUsers(projectFiles.filter((file) =>(companyId === 'cvy2lr5H0CUVH8o2vsVk') ? file.status === 4 : file.status === 6));

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

    if (projectId) {
      getFiles();
    }
  }, []);

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
      await updateFileStatus(projectId, selectedFileId, 3, userId);
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
        <KyroticsTableAdmin
          // <Table
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
        <Table2
          columns={columnsInProgress}
          rows={inProgressFiles}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        // projectName={projectName}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Table2
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

export default AdminDocs;
