import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TableClient from './TableClient';
import KyroticsTableAdmin from './KyroticsTableAdmin';
import { fetchProjectFiles, fetchProjectName, updateFileStatus } from '../utils/firestoreUtil';
import CircularProgress from '@mui/material/CircularProgress';
import { auth } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import { server } from '../main';
import UserSelectModal from './UserSelectModal';

const KyroDocs = () => {
    const { projectId } = useParams();
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [projectName, setProjectName] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [role, setRole] = useState('');
    const { currentUser } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [selectedFileId, setSelectedFileId] = useState(null);


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
    //     const unsubscribe = auth.onAuthStateChanged(async (user) => {
    //         if (user) {
    //             const token = await user.getIdTokenResult();
    //             const response = await axios.get(`${server}/api/auth/getUserProfile`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token.token}`,
    //                 },
    //             });
    //             setCompanyId(response.data.companyId);
    //             setRole(response.data.roleName);
    //         }
    //     });
    //     return () => unsubscribe();
    // }, []);

    useEffect(() => {
        if (companyId) {
            const getProjectData = async () => {
                setIsLoading(true);
                try {
                    const projectFiles = await fetchProjectFiles(projectId);
                    const projectName = await fetchProjectName(projectId);
                    const filteredFiles = projectFiles.filter(file =>
                        (file.status === 2 && companyId === 'cvy2lr5H0CUVH8o2vsVk')
                        // (file.status === 4 && companyId !== 'cvy2lr5H0CUVH8o2vsVk' && role === 'user') ||
                        //(role === 'admin' && file.status === 0)
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

    const handleFileAssign = async (id) => {
        try {
            await updateFileStatus(projectId, id, 3, currentUser.uid);
            setFiles(files.filter(file => file.id !== id));
        } catch (err) {
            console.error('Error updating file status:', err);
            setError(err);
        }
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
            setFiles(files.filter(file => file.id !== selectedFileId));
            handleCloseModal();
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
            {isLoading && <CircularProgress />}
            {error && <p>Error: {error.message}</p>}
            {!isLoading && !error && files.length === 0 && <p>No files found.</p>}
            {!isLoading && !error && files.length > 0 && (
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
                // role === 'admin' ? (
                //     <KyroticsTableAdmin
                //         columns={columns}
                //         rows={files.map((file, index) => ({ ...file, slNo: index + 1 }))}
                //         page={page}
                //         rowsPerPage={rowsPerPage}
                //         handleChangePage={handleChangePage}
                //         handleChangeRowsPerPage={handleChangeRowsPerPage}
                //         handleEditClick={handleOpenModal}
                //         projectName={projectName}
                //     />
                // ) : (
                //     <TableClient
                //         columns={columns}
                //         rows={files.map((file, index) => ({ ...file, slNo: index + 1 }))}
                //         page={page}
                //         rowsPerPage={rowsPerPage}
                //         handleChangePage={handleChangePage}
                //         handleChangeRowsPerPage={handleChangeRowsPerPage}
                //         handleEditClick={handleFileAssign}
                //         projectName={projectName}
                //     />
                // )
            )}
            {/* <UserSelectModal
                open={openModal}
                handleClose={handleCloseModal}
                handleAssign={handleAssignToUser}
                companyId={companyId}
            /> */}
        </div>
    );
};

export default KyroDocs;




// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import CircularProgress from '@mui/material/CircularProgress';
// import Typography from '@mui/material/Typography';
// import Table2 from '../../components/Table2';
// import TabPanel from '../../components/TabPanel';
// import { fetchProjectFiles, fetchProjects } from '../../utils/firestoreUtil';
// import { useAuth } from '../../context/AuthContext';


// const columnsInProgress = [
//   { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
//   { id: 'name', label: 'File Name', minWidth: 100 },
//   { id: 'projectName', label: 'Project Name', minWidth: 150 },
//   { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
//   { id: 'edit', label: '', minWidth: 100, align: 'right' },
// ];

// const columnsCompleted = [
//   { id: 'slNo', label: 'Sl. No.', minWidth: 50 },
//   { id: 'name', label: 'File Name', minWidth: 100 },
//   { id: 'projectName', label: 'Project Name', minWidth: 150 },
//   { id: 'uploadedAt', label: 'Date Created', minWidth: 100 },
// ];

// const Workspace = () => {
//   const [tabValue, setTabValue] = useState(0);
//   const [inProgressFiles, setInProgressFiles] = useState([]);
//   const [completedFiles, setCompletedFiles] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const { currentUser } = useAuth();

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

//         const allInProgressFiles = [];
//         const allCompletedFiles = [];

//         projectsWithFiles.forEach((project) => {
//           const projectInProgressFiles = project.files.filter(
//             (file) => file.status === 3 && file.assignedTo === currentUser.uid
//           );
//           const projectCompletedFiles = project.files.filter(
//             (file) => file.status === 4 && file.assignedTo === currentUser.uid
//           );

//           projectInProgressFiles.forEach((file) =>
//             allInProgressFiles.push({
//               ...file,
//               projectId: project.id,
//               projectName: project.name,
//             })
//           );
//           projectCompletedFiles.forEach((file) =>
//             allCompletedFiles.push({
//               ...file,
//               projectId: project.id,
//               projectName: project.name,
//             })
//           );
//         });

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
//           <Tab label="In progress" />
//           <Tab label="Completed" />
//         </Tabs>
//       </Box>

//       <TabPanel value={tabValue} index={0}>
//         <Table2
//           columns={columnsInProgress}
//           rows={inProgressFiles.map((file, index) => ({ ...file, slNo: index + 1 }))}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={handleChangePage}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </TabPanel>

//       <TabPanel value={tabValue} index={1}>
//         <Table2
//           columns={columnsCompleted}
//           rows={completedFiles.map((file, index) => ({ ...file, slNo: index + 1 }))}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           handleChangePage={handleChangePage}
//           handleChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </TabPanel>
//     </Box>
//   );
// };

// export default Workspace;