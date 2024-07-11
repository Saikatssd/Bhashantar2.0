import { db, storage } from './firebase';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, serverTimestamp, query, where, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL,deleteObject } from 'firebase/storage';

// Upload a file to a specific project
export const uploadFile = async (projectId, file) => {
  try {
    const storageRef = ref(storage, `projects/${projectId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const fileRef = await addDoc(collection(db, 'projects', projectId, 'files'), {
      name: file.name,
      url: downloadURL,
      uploadedAt: serverTimestamp(),
      status: 2, // Initial status set to 2
    });

    return { id: fileRef.id, name: file.name, url: downloadURL, uploadedAt: new Date(), status: 2 };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }
};

// Delete a file from a specific project
export const deleteFile = async (projectId, fileId, fileName) => {
    try {
      // Delete the file from Firebase Storage
      const storageRef = ref(storage, `projects/${projectId}/${fileName}`);
      await deleteObject(storageRef);
  
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
    console.log(`Fetching files for projectId: ${projectId}`); // Debugging log
    const filesCollection = collection(db, 'projects', projectId, 'files');
    const filesSnapshot = await getDocs(filesCollection);
    console.log(`filesSnapshot size: ${filesSnapshot.size}`); // Debugging log

    const files = filesSnapshot.docs.map(doc => {
      const data = doc.data();
      console.log(`File data for doc ID ${doc.id}:`, data); // Debugging log
      return {
        id: doc.id,
        name: data.name,
        url: data.url,
        uploadedAt: data.uploadedAt ? data.uploadedAt.toDate() : null,
        status: data.status,
        assignedTo: data.assignedTo || null // Ensure assignedTo field is included
      };
    });

    console.log(`Fetched files for projectId ${projectId}:`, files); // Debugging log
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
      return fileDoc.data().url;
    } else {
      throw new Error('File does not exist');
    }
  } catch (error) {
    console.error('Error fetching document URL:', error);
    throw new Error('Error fetching document URL');
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
    console.log('Projects fetched:', projects); // Debugging log
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error); // Detailed logging
    throw new Error('Error fetching projects');
  }
};
