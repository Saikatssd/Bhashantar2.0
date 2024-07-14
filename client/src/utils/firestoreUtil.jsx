import { db, storage } from './firebase';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, serverTimestamp, query, where, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL,deleteObject } from 'firebase/storage';

// Upload a file to a specific project
export const uploadFile = async (projectId, file) => {
  try {
    // Upload the PDF file
    const pdfStorageRef = ref(storage, `projects/${projectId}/${file.name}`);
    const pdfSnapshot = await uploadBytes(pdfStorageRef, file);
    const pdfDownloadURL = await getDownloadURL(pdfSnapshot.ref);

    // Create an empty .rtf file
    const rtfFileName = file.name.replace('.pdf', '.rtf');
    const rtfBlob = new Blob([''], { type: 'application/rtf' });
    
    // Upload the .rtf file
    const rtfStorageRef = ref(storage, `projects/${projectId}/${rtfFileName}`);
    const rtfSnapshot = await uploadBytes(rtfStorageRef, rtfBlob);
    const rtfDownloadURL = await getDownloadURL(rtfSnapshot.ref);

    // Add file information to the database
    const fileRef = await addDoc(collection(db, 'projects', projectId, 'files'), {
      name: file.name,
      pdfUrl: pdfDownloadURL,
      rtfUrl: rtfDownloadURL,
      uploadedAt: serverTimestamp(),
      status: 0,
    });

    return {
      id: fileRef.id,
      name: file.name,
      pdfUrl: pdfDownloadURL,
      rtfUrl: rtfDownloadURL,
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
    // Delete the PDF file from Firebase Storage
    const pdfStorageRef = ref(storage, `projects/${projectId}/${fileName}`);
    await deleteObject(pdfStorageRef);

    // Delete the corresponding RTF file from Firebase Storage
    const rtfFileName = fileName.replace('.pdf', '.rtf');
    const rtfStorageRef = ref(storage, `projects/${projectId}/${rtfFileName}`);
    await deleteObject(rtfStorageRef);

    // Delete the file document from Firestore
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
    // console.log(`Fetching files for projectId: ${projectId}`); // Debugging log
    const filesCollection = collection(db, 'projects', projectId, 'files');
    const filesSnapshot = await getDocs(filesCollection);
    // console.log(`filesSnapshot size: ${filesSnapshot.size}`); // Debugging log

    const files = filesSnapshot.docs.map(doc => {
      const data = doc.data();
      // console.log(`File data for doc ID ${doc.id}:`, data); // Debugging log
      return {
        id: doc.id,
        name: data.name,
        pdfUrl: data.pdfUrl,
        rtfUrl: data.rtfUrl,
        uploadedAt: data.uploadedAt ? data.uploadedAt.toDate() : null,
        status: data.status,
        assignedTo: data.assignedTo || null // Ensure assignedTo field is included
      };
    });

    // console.log(`Fetched files for projectId ${projectId}:`, files); // Debugging log
    return files;
  } catch (error) {
    console.error('Error fetching project files:', error);
    throw new Error('Error fetching project files');
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
 

export const fetchDocumentUrl = async (projectId, fileId) => {
  try {
    const fileDocRef = doc(db, 'projects', projectId, 'files', fileId);
    const fileDoc = await getDoc(fileDocRef);

    if (fileDoc.exists()) {
      const data = fileDoc.data();
      return {
        pdfUrl: data.pdfUrl,
        rtfUrl: data.rtfUrl,
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
    console.log(`Fetching files with status ${status} for project ${projectId}`); // Debugging log
    const q = query(collection(db, 'projects', projectId, 'files'), where('status', '==', status));
    const querySnapshot = await getDocs(q);
    const files = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(`Files fetched by status ${status} for project ${projectId}:`, files); // Debugging log
    return files;
  } catch (error) {
    console.error(`Error fetching files by status ${status} for project ${projectId}:`, error); // Detailed logging
    throw new Error(`Error fetching files by status ${status} for project ${projectId}`);
  }
};

// Fetch all projects
export const fetchProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    const projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // console.log('Projects fetched:', projects); // Debugging log
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error); // Detailed logging
    throw new Error('Error fetching projects');
  }
};


// Fetch the user's name by their ID
export const fetchUserNameById = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      // console.log("username",userDoc.data().name)
      return userDoc.data().name;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user name:', error);
    throw error;
  }
};


export const fetchUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return users;
  } catch (error) {
    console.error('Error fetching users:', error); // Detailed logging
    throw new Error('Error fetching users');
  }
}
