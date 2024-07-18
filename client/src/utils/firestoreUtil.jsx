// // //status notation
// // //0-->client End for delete //1-->Ml 
// // //(KyroticsSide) 2-->Ready-for-work//3-->Assigned to User//4-->completed
// // //(ClientSide)4-->Ready-for-work//5-->Assigned to User//6-->completed //7-->Downloaded



// import { db, storage } from './firebase';
// import { collection, addDoc, getDocs, getDoc, doc, updateDoc, serverTimestamp, query, where, deleteDoc } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// // Upload a file to a specific project
// export const uploadFile = async (projectId, file) => {
//   try {
//     // Upload the PDF file
//     const pdfStorageRef = ref(storage, `projects/${projectId}/${file.name}`);
//     const pdfSnapshot = await uploadBytes(pdfStorageRef, file);
//     const pdfDownloadURL = await getDownloadURL(pdfSnapshot.ref);

//     // Create an empty .html file
//     const htmlFileName = file.name.replace('.pdf', '.html');
//     const htmlBlob = new Blob([''], { type: 'text/html' });

//     // Upload the .html file
//     const htmlStorageRef = ref(storage, `projects/${projectId}/${htmlFileName}`);
//     const htmlSnapshot = await uploadBytes(htmlStorageRef, htmlBlob);
//     const htmlDownloadURL = await getDownloadURL(htmlSnapshot.ref);

//     // Add file information to the database
//     const fileRef = await addDoc(collection(db, 'projects', projectId, 'files'), {
//       name: file.name,
//       pdfUrl: pdfDownloadURL,
//       htmlUrl: htmlDownloadURL,
//       uploadedAt: serverTimestamp(),
//       status: 0,
//       projectId: projectId,
//     });

//     return {
//       id: fileRef.id,
//       name: file.name,
//       pdfUrl: pdfDownloadURL,
//       htmlUrl: htmlDownloadURL,
//       uploadedAt: new Date(),
//       status: 0,
//     };
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     throw new Error('Error uploading file');
//   }
// };

// // Delete a file from a specific project
// export const deleteFile = async (projectId, fileId, fileName) => {
//   try {
//     // Delete the PDF file from Firebase Storage
//     const pdfStorageRef = ref(storage, `projects/${projectId}/${fileName}`);
//     await deleteObject(pdfStorageRef);

//     // Delete the corresponding HTML file from Firebase Storage
//     const htmlFileName = fileName.replace('.pdf', '.html');
//     const htmlStorageRef = ref(storage, `projects/${projectId}/${htmlFileName}`);
//     await deleteObject(htmlStorageRef);

//     // Delete the file document from Firestore
//     const fileRef = doc(db, 'projects', projectId, 'files', fileId);
//     await deleteDoc(fileRef);

//     return true;
//   } catch (error) {
//     console.error('Error deleting file:', error);
//     throw new Error('Error deleting file');
//   }
// };

// // Fetch files for a specific project
// export const fetchProjectFiles = async (projectId) => {
//   try {
//     const filesCollection = collection(db, 'projects', projectId, 'files');
//     const filesSnapshot = await getDocs(filesCollection);

//     const files = filesSnapshot.docs.map(doc => {
//       const data = doc.data();
//       return {
//         id: doc.id,
//         name: data.name,
//         pdfUrl: data.pdfUrl,
//         htmlUrl: data.htmlUrl,
//         projectId: projectId,
//         status: data.status,
//         uploadedAt: data.uploadedAt ? data.uploadedAt.toDate() : null,
//         assignedTo: data.assignedTo || null // Ensure assignedTo field is included
//       };
//     });

//     return files;
//   } catch (error) {
//     console.error('Error fetching project files:', error);
//     throw new Error('Error fetching project files');
//   }
// };

// // Fetch the name of a specific project
// export const fetchProjectName = async (projectId) => {
//   try {
//     const projectDocRef = doc(db, 'projects', projectId);
//     const projectDoc = await getDoc(projectDocRef);
//     if (projectDoc.exists()) {
//       return projectDoc.data().name;
//     } else {
//       throw new Error('Project does not exist');
//     }
//   } catch (error) {
//     console.error('Error fetching project name:', error);
//     throw new Error('Error fetching project name');
//   }
// };

// export const fetchDocumentUrl = async (projectId, fileId) => {
//   try {
//     const fileDocRef = doc(db, 'projects', projectId, 'files', fileId);
//     const fileDoc = await getDoc(fileDocRef);

//     if (fileDoc.exists()) {
//       const data = fileDoc.data();
//       return {
//         pdfUrl: data.pdfUrl,
//         htmlUrl: data.htmlUrl,
//       };
//     } else {
//       throw new Error('File does not exist');
//     }
//   } catch (error) {
//     console.error('Error fetching document URLs:', error);
//     throw new Error('Error fetching document URLs');
//   }
// };

// // Update the status of a specific file
// export const updateFileStatus = async (projectId, fileId, status, userId) => {
//   try {
//     const fileRef = doc(db, 'projects', projectId, 'files', fileId);
//     await updateDoc(fileRef, { status, assignedTo: userId });
//   } catch (error) {
//     console.error('Error updating file status:', error);
//     throw new Error('Error updating file status:', error);
//   }
// };

// // Fetch files by status for a specific project
// export const fetchFilesByStatus = async (status, projectId) => {
//   try {
//     console.log(`Fetching files with status ${status} for project ${projectId}`); // Debugging log
//     const q = query(collection(db, 'projects', projectId, 'files'), where('status', '==', status));
//     const querySnapshot = await getDocs(q);
//     const files = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     console.log(`Files fetched by status ${status} for project ${projectId}:`, files); // Debugging log
//     return files;
//   } catch (error) {
//     console.error(`Error fetching files by status ${status} for project ${projectId}:`, error); // Detailed logging
//     throw new Error(`Error fetching files by status ${status} for project ${projectId}`);
//   }
// };

// // Fetch all projects
// export const fetchProjects = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'projects'));
//     const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return projects;
//   } catch (error) {
//     console.error('Error fetching projects:', error); // Detailed logging
//     throw new Error('Error fetching projects');
//   }
// };

// // Fetch the user's name by their ID
// export const fetchUserNameById = async (userId) => {
//   try {
//     const userDocRef = doc(db, 'users', userId);
//     const userDoc = await getDoc(userDocRef);
//     if (userDoc.exists()) {
//       return userDoc.data().name;
//     } else {
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     console.error('Error fetching user name:', error);
//     throw error;
//   }
// };

// export const fetchUsers = async () => {
//   try {
//     const usersSnapshot = await getDocs(collection(db, 'users'));
//     const users = usersSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     return users;
//   } catch (error) {
//     console.error('Error fetching users:', error); // Detailed logging
//     throw new Error('Error fetching users');
//   }
// };



// export const updateDocumentContent = async (projectId, fileId, blob) => {
//   try {
//     // Fetch the file data from Firestore
//     const fileDocRef = doc(db, 'projects', projectId, 'files', fileId);
//     const fileDoc = await getDoc(fileDocRef);
//     const fileData = fileDoc.data();
//     const htmlFileName = fileData.name.replace('.pdf', '.html');

//     // Create a storage reference for the HTML file
//     const htmlStorageRef = ref(storage, `projects/${projectId}/${htmlFileName}`);

//     // Upload the updated HTML file
//     await uploadBytes(htmlStorageRef, blob);
//     const htmlDownloadURL = await getDownloadURL(htmlStorageRef);

//     // Update the Firestore document with the new HTML URL
//     await updateDoc(doc(db, 'projects', projectId, 'files', fileId), {
//       htmlUrl: htmlDownloadURL
//     });
//   } catch (error) {
//     console.error('Error updating document content:', error);
//     throw new Error('Error updating document content');
//   }
// };



// // Fetch all companies
// export const fetchAllCompanies = async () => {
//   try {
//     const companiesSnapshot = await getDocs(collection(db, 'companies'));
//     const companies = companiesSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     return companies;
//   } catch (error) {
//     console.error('Error fetching companies:', error);
//     throw new Error('Error fetching companies');
//   }
// };

// // Fetch all projects
// export const fetchAllProjects = async () => {
//   try {
//     const projectsSnapshot = await getDocs(collection(db, 'projects'));
//     const projects = projectsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     return projects;
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     throw new Error('Error fetching projects');
//   }
// };



// // Fetch all projects for a specific company
// export const fetchCompanyProjects = async (companyId) => {
//   try {
//     const projectsQuery = query(collection(db, 'projects'), where('companyId', '==', companyId));
//     const projectsSnapshot = await getDocs(projectsQuery);
//     const projects = projectsSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//     return projects;
//   } catch (error) {
//     console.error('Error fetching projects:', error);
//     throw new Error('Error fetching projects');
//   }
// }




import { db, storage } from './firebase';
import {
  collection, addDoc, getDocs, getDoc, doc, updateDoc, serverTimestamp, query, where, deleteDoc
} from 'firebase/firestore';
import {
  ref, uploadBytes, getDownloadURL, deleteObject
} from 'firebase/storage';

// --- File Operations ---

// Upload a file to a specific project
export const uploadFile = async (projectId, file) => {
  try {
    const pdfStorageRef = ref(storage, `projects/${projectId}/${file.name}`);
    const pdfSnapshot = await uploadBytes(pdfStorageRef, file);
    const pdfDownloadURL = await getDownloadURL(pdfSnapshot.ref);

    const htmlFileName = file.name.replace('.pdf', '.html');
    const htmlBlob = new Blob([''], { type: 'text/html' });

    const htmlStorageRef = ref(storage, `projects/${projectId}/${htmlFileName}`);
    const htmlSnapshot = await uploadBytes(htmlStorageRef, htmlBlob);
    const htmlDownloadURL = await getDownloadURL(htmlSnapshot.ref);

    const fileRef = await addDoc(collection(db, 'projects', projectId, 'files'), {
      name: file.name,
      pdfUrl: pdfDownloadURL,
      htmlUrl: htmlDownloadURL,
      uploadedAt: serverTimestamp(),
      status: 0,
      projectId: projectId,
    });

    return {
      id: fileRef.id,
      name: file.name,
      pdfUrl: pdfDownloadURL,
      htmlUrl: htmlDownloadURL,
      uploadedAt: new Date(),
      status: 0,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};

// Delete a file from a specific project
export const deleteFile = async (projectId, fileId, fileName) => {
  try {
    const pdfStorageRef = ref(storage, `projects/${projectId}/${fileName}`);
    await deleteObject(pdfStorageRef);

    const htmlFileName = fileName.replace('.pdf', '.html');
    const htmlStorageRef = ref(storage, `projects/${projectId}/${htmlFileName}`);
    await deleteObject(htmlStorageRef);

    const fileRef = doc(db, 'projects', projectId, 'files', fileId);
    await deleteDoc(fileRef);

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Error deleting file');
  }
};

// Fetch files for a specific project
export const fetchProjectFiles = async (projectId) => {
  try {
    const filesCollection = collection(db, 'projects', projectId, 'files');
    const filesSnapshot = await getDocs(filesCollection);

    const files = filesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        pdfUrl: data.pdfUrl,
        htmlUrl: data.htmlUrl,
        projectId: projectId,
        status: data.status,
        uploadedAt: data.uploadedAt ? data.uploadedAt.toDate() : null,
        assignedTo: data.assignedTo || null
      };
    });

    return files;
  } catch (error) {
    console.error('Error fetching project files:', error);
    throw new Error('Error fetching project files');
  }
};

// Fetch document URLs for a specific file
export const fetchDocumentUrl = async (projectId, fileId) => {
  try {
    const fileDocRef = doc(db, 'projects', projectId, 'files', fileId);
    const fileDoc = await getDoc(fileDocRef);

    if (fileDoc.exists()) {
      const data = fileDoc.data();
      return {
        pdfUrl: data.pdfUrl,
        htmlUrl: data.htmlUrl,
      };
    } else {
      throw new Error('File does not exist');
    }
  } catch (error) {
    console.error('Error fetching document URLs:', error);
    throw new Error('Error fetching document URLs');
  }
};

// Update the status of a specific file
export const updateFileStatus = async (projectId, fileId, status, userId) => {
  try {
    const fileRef = doc(db, 'projects', projectId, 'files', fileId);
    await updateDoc(fileRef, { status, assignedTo: userId });
  } catch (error) {
    console.error('Error updating file status:', error);
    throw new Error('Error updating file status:', error);
  }
};

// Fetch files by status for a specific project
export const fetchFilesByStatus = async (status, projectId) => {
  try {
    const q = query(collection(db, 'projects', projectId, 'files'), where('status', '==', status));
    const querySnapshot = await getDocs(q);
    const files = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return files;
  } catch (error) {
    console.error(`Error fetching files by status ${status} for project ${projectId}:`, error);
    throw new Error(`Error fetching files by status ${status} for project ${projectId}`);
  }
};

// Update the content of a specific document
export const updateDocumentContent = async (projectId, fileId, blob) => {
  try {
    const fileDocRef = doc(db, 'projects', projectId, 'files', fileId);
    const fileDoc = await getDoc(fileDocRef);
    const fileData = fileDoc.data();
    const htmlFileName = fileData.name.replace('.pdf', '.html');

    const htmlStorageRef = ref(storage, `projects/${projectId}/${htmlFileName}`);
    await uploadBytes(htmlStorageRef, blob);
    const htmlDownloadURL = await getDownloadURL(htmlStorageRef);

    await updateDoc(doc(db, 'projects', projectId, 'files', fileId), {
      htmlUrl: htmlDownloadURL
    });
  } catch (error) {
    console.error('Error updating document content:', error);
    throw new Error('Error updating document content');
  }
};

// --- Project Operations ---

// Fetch all projects
export const fetchAllProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Error fetching projects');
  }
};

// Fetch all projects for a specific company
export const fetchCompanyProjects = async (companyId) => {
  try {
    const projectsQuery = query(collection(db, 'projects'), where('companyId', '==', companyId));
    const projectsSnapshot = await getDocs(projectsQuery);
    const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Error fetching projects');
  }
};

// Fetch all projects
export const fetchProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error); // Detailed logging
    throw new Error('Error fetching projects');
  }
};

// Fetch projects for multiple companies
export const fetchProjectsForCompanies = async (companyIds) => {
  try {
    const allProjects = await Promise.all(
      companyIds.map(async (companyId) => {
        const companyProjects = await fetchCompanyProjects(companyId);
        return companyProjects;
      })
    );
    return allProjects.flat();
  } catch (error) {
    console.error('Error fetching projects for companies:', error);
    throw new Error('Error fetching projects for companies');
  }
};

// Fetch the name of a specific project
export const fetchProjectName = async (projectId) => {
  try {
    const projectDocRef = doc(db, 'projects', projectId);
    const projectDoc = await getDoc(projectDocRef);
    if (projectDoc.exists()) {
      return projectDoc.data().name;
    } else {
      throw new Error('Project does not exist');
    }
  } catch (error) {
    console.error('Error fetching project name:', error);
    throw new Error('Error fetching project name');
  }
};

// --- Company Operations ---

// Fetch all companies
export const fetchAllCompanies = async () => {
  try {
    const companiesSnapshot = await getDocs(collection(db, 'companies'));
    const companies = companiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return companies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw new Error('Error fetching companies');
  }
};

// --- User Operations ---

// Fetch the user's name by their ID
export const fetchUserNameById = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data().name;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user name:', error);
    throw error;
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  }
}