// import React, { useCallback, useEffect, useState } from "react";
// import Quill from "quill";
// import "../assets/editor.css";
// import "quill/dist/quill.snow.css";
// // import { io } from "socket.io-client";
// import { useParams } from "react-router-dom";
// import { Worker } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import { fetchDocumentUrl, updateFileStatus } from '../utils/firestoreUtil';
// import { useAuth } from '../context/AuthContext';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';

// const SAVE_INTERVAL_MS = 2000;
// const TOOLBAR_OPTIONS = [
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   [{ font: [] }],
//   [{ list: "ordered" }, { list: "bullet" }],
//   ["bold", "italic", "underline"],
//   [{ color: [] }, { background: [] }],
//   [{ script: "sub" }, { script: "super" }],
//   [{ align: [] }],
//   ["clean"],
// ];

// const TextEditor = () => {
//   const { documentId } = useParams();
//   const [socket, setSocket] = useState();
//   const [quill, setQuill] = useState();
//   const [pdfDocument, setPdfDocument] = useState(null);

//   useEffect(() => {
//     const s = io("http://localhost:5566");
//     setSocket(s);

//     return () => {
//       s.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     socket.once("load-document", (document) => {
//       quill.setContents(document);
//       quill.enable();
//     });

//     socket.emit("get-document", documentId);
//   }, [socket, quill, documentId]);

//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     const interval = setInterval(() => {
//       socket.emit("save-document", quill.getContents());
//     }, SAVE_INTERVAL_MS);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [socket, quill]);

//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     const handler = (delta) => {
//       quill.updateContents(delta);
//     };
//     socket.on("receive-changes", handler);

//     return () => {
//       socket.off("receive-changes", handler);
//     };
//   }, [socket, quill]);

//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     const handler = (delta, oldDelta, source) => {
//       if (source !== "user") return;
//       socket.emit("send-changes", delta);
//     };
//     quill.on("text-change", handler);

//     return () => {
//       quill.off("text-change", handler);
//     };
//   }, [socket, quill]);

//   const wrapperRef = useCallback((wrapper) => {
//     if (wrapper == null) return;

//     wrapper.innerHTML = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     const q = new Quill(editor, {
//       theme: "snow",
//       modules: { toolbar: TOOLBAR_OPTIONS },
//     });
//     q.disable();
//     q.setText("Loading...");
//     setQuill(q);
//   }, []);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         console.log("Fetching files for documentId:", documentId); // Debugging log
//         const projectFiles = await fetchProjectFiles(documentId);
//         console.log("Fetched files:", projectFiles); // Debugging log
//         if (projectFiles.length > 0) {
//           setPdfDocument(projectFiles[0].url); // Set the first file URL for the PDF Viewer
//         }
//       } catch (error) {
//         console.error("Error fetching project files:", error);
//       }
//     };

//     if (documentId) {
//       fetchFiles();
//     } else {
//       console.error("Document ID is undefined"); // Debugging log
//     }
//   }, [documentId]);

//   return (
//     <div className="container">
//       <div style={{ display: "flex" }}>
//         <div style={{ width: "50%", paddingRight: "10px", height: "90vh", overflow: "auto" }}>
//           {pdfDocument && (
//             <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
//               <Viewer fileUrl={pdfDocument} />
//             </Worker>
//           )}
//         </div>
//         <div ref={wrapperRef} style={{ width: "50%" }}></div>
//       </div>
//     </div>
//   );
// };

// export default TextEditor;

// import { auth } from '../utils/firebase';

// const TOOLBAR_OPTIONS = [
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   [{ font: [] }],
//   [{ list: "ordered" }, { list: "bullet" }],
//   ["bold", "italic", "underline"],
//   [{ color: [] }, { background: [] }],
//   [{ script: "sub" }, { script: "super" }],
//   [{ align: [] }],
//   ["clean"],
// ];

// const TextEditor = () => {
//   const { documentId } = useParams();
//   const [quill, setQuill] = useState();
//   const [pdfDocument, setPdfDocument] = useState(null);
//   const [rtfDocument, setRtfDocument] = useState(null);
//   const [role, setRole] = useState(null);
//   const [companyId, setCompanyId] = useState(null);
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         const token = await user.getIdTokenResult();
//         // console.log(token)
//         user.roleName = token.claims.roleName;
//         user.companyId = token.claims.companyId;

//         setRole(user.roleName);
//         setCompanyId(user.companyId);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const fetchDocument = async () => {
//       try {
//         console.log("Fetching document URL for documentId:", documentId); // Debugging log
//         const [projectId, fileId] = documentId.split('_'); // Split the concatenated string
//         if (!projectId || !fileId) {
//           throw new Error('Invalid document ID format');
//         }
//         const documentUrls = await fetchDocumentUrl(projectId, fileId);
//         console.log("Fetched document URLs:", documentUrls); // Debugging log
//         if (documentUrls) {
//           console.log("Pdf url : ", documentUrls.pdfUrl)
//           setPdfDocument(documentUrls.pdfUrl); // Set the PDF URL for the PDF Viewer
//           console.log("Pdf url : ", documentUrls.rtfUrl)
//           setRtfDocument(documentUrls.rtfUrl); // Set the RTF URL for the RTF Editor
//         } else {
//           console.warn("No URLs found for documentId:", documentId); // Debugging log
//         }
//       } catch (error) {
//         console.error("Error fetching document URLs:", error);
//       }
//     };

//     if (documentId) {
//       fetchDocument();
//     } else {
//       console.error("Document ID is undefined"); // Debugging log
//     }
//   }, [documentId]);

//   const wrapperRef = useCallback((wrapper) => {
//     if (wrapper == null) return;

//     wrapper.innerHTML = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     const q = new Quill(editor, {
//       theme: "snow",
//       modules: { toolbar: TOOLBAR_OPTIONS },
//     });
//     q.disable();
//     q.setText("Loading...");
//     setQuill(q);

//     if (rtfDocument) {
//       fetch(rtfDocument)
//         .then(response => response.text())
//         .then(text => {
//           q.setText(text);
//           q.enable();
//         })
//         .catch(error => {
//           console.error('Error loading RTF document:', error);
//           q.setText('Error loading document');
//         });
//     }
//   }, [rtfDocument]);

//   const handleSaveClick = async () => {
//     try {
//       const [projectId, fileId] = documentId.split('_');
//       if (companyId === 'cvy2lr5H0CUVH8o2vsVk') {
//         await updateFileStatus(projectId, id, 4, currentUser.uid);
//       }
//       else {
//         await updateFileStatus(projectId, id, 6, currentUser.uid);
//       }
//       navigate('/mywork');
//       // navigate(`/company/${companyId}/mywork`);
//       console.log('Document status updated to 4 or 6');
//       // Optionally, you can add more logic here, such as navigating back or showing a success message.
//     } catch (err) {
//       console.error('Error updating document status:', err);
//     }
//   };

//   return (
//     <div className="container">
//       <div style={{ display: "flex" }}>
//         <div style={{ width: "50%", paddingRight: "10px", height: "90vh", overflow: "auto" }}>
//           {pdfDocument ? (
//             <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
//               <Viewer fileUrl={pdfDocument} />
//             </Worker>
//           ) : (
//             <p>Loading PDF...</p>
//           )}
//         </div>
//         <div ref={wrapperRef} style={{ width: "50%" }}></div>
//       </div>
//       <Button
//         variant="contained"
//         color="success"
//         size="large"
//         sx={{ position: 'fixed', bottom: 25, right: 16, width: '100px', height: '55px', fontSize: '18px' }}
//         onClick={handleSaveClick}
//       >
//         Save
//       </Button>
//     </div>
//   );
// };

// export default TextEditor;

// import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { fetchDocumentUrl, updateDocumentContent } from '../utils/firestoreUtil'; // Make sure to implement updateDocumentContent

// const Editor = ({ projectId, fileId }) => {
//   const [htmlContent, setHtmlContent] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const { htmlUrl } = await fetchDocumentUrl(projectId, fileId);
//         const response = await fetch(htmlUrl);
//         const text = await response.text();
//         setHtmlContent(text);
//       } catch (err) {
//         setError('Error fetching document');
//         console.error('Error fetching document:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContent();
//   }, [projectId, fileId]);

//   const handleSave = async () => {
//     try {
//       const blob = new Blob([htmlContent], { type: 'text/html' });
//       await updateDocumentContent(projectId, fileId, blob);
//       alert('Document saved successfully');
//     } catch (err) {
//       setError('Error saving document');
//       console.error('Error saving document:', err);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <ReactQuill value={htmlContent} onChange={setHtmlContent} />
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// };

// export default Editor;

// import React, { useEffect, useState, useRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Document, Page } from 'react-pdf';
// import { fetchDocumentUrl, updateDocumentContent } from '../utils/firestoreUtil';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// const Editor = () => {
//   const projectId = 'wTSgFZVPvuFnGhyz1fZ6';
//   const fileId = 'gdYDnGzgzjBtE0r2ORCr';
//   const quillRef = useRef(null); // Reference to Quill editor instance
//   const [htmlContent, setHtmlContent] = useState('');
//   const [pdfUrl, setPdfUrl] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [autosaveInterval, setAutosaveInterval] = useState(20000); // Autosave every 5 seconds

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const { htmlUrl, pdfUrl } = await fetchDocumentUrl(projectId, fileId);
//         const response = await fetch(htmlUrl);
//         const text = await response.text();
//         setHtmlContent(text);
//         setPdfUrl(pdfUrl);

//       } catch (err) {
//         setError('Error fetching document');
//         console.error('Error fetching document:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchContent();

//     const autosave = async () => {
//       if (!htmlContent) return; // Don't save if content is empty

//       try {
//         const blob = new Blob([htmlContent], { type: 'text/html' });
//         await updateDocumentContent(projectId, fileId, blob);
//         console.log('Document saved successfully (autosave)');
//       } catch (err) {
//         console.error('Error saving document (autosave):', err);
//       }
//     };

//     // Set up autosave interval (clear previous interval if necessary)
//     const intervalId = setInterval(autosave, autosaveInterval);
//     return () => clearInterval(intervalId); // Clean up interval on unmount
//   }, [projectId, fileId, htmlContent, autosaveInterval]);

//   const handleSave = async () => {
//     try {
//       const blob = new Blob([htmlContent], { type: 'text/html' });
//       await updateDocumentContent(projectId, fileId, blob);
//       alert('Document saved successfully');
//     } catch (err) {
//       setError('Error saving document');
//       console.error('Error saving document:', err);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       <div style={{ flex: 1, overflow: 'auto', padding: '10px', borderRight: '1px solid #ccc' }}>
//         {/* <Document file={pdfUrl} onLoadError={console.error}>
//           <Page pageNumber={1} />
//         </Document> */}

//         <div>
//           <iframe src={pdfUrl} width="100%" height="1000px" />
//         </div>
//       </div>
//       <div style={{ flex: 1, padding: '10px' }}>
//         <ReactQuill value={htmlContent} ref={quillRef} onChange={setHtmlContent} />
//         <button onClick={handleSave} style={{ marginTop: '10px' }}>Save</button>
//       </div>
//     </div>
//   );
// };

// export default Editor;

import React, { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { Document, Page } from 'react-pdf';
import {
  fetchDocumentUrl,
  updateDocumentContent,
  updateFileStatus,
} from "../utils/firestoreUtil";
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import useDebounce from "../hooks/useDebounce"; // Import the custom hook
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {auth} from '../utils/firebase'

const Editor = () => {
  // const projectId = "wTSgFZVPvuFnGhyz1fZ6";
  // const fileId = "gdYDnGzgzjBtE0r2ORCr";
  const { projectId, documentId } = useParams();
  const quillRef = useRef(null); // Reference to Quill editor instance
  const [htmlContent, setHtmlContent] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const debouncedHtmlContent = useDebounce(htmlContent, 3000); // Use the custom debounce hook

  const [companyId, setCompanyId] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        // console.log(token)
        user.companyId = token.claims.companyId;
        setUser(user);


        setCompanyId(user.companyId);
      }
      else{
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("project Id : ", documentId, projectId)
    const fetchContent = async () => {
      try {
        const { htmlUrl, pdfUrl } = await fetchDocumentUrl(projectId, documentId);
        const response = await fetch(htmlUrl);
        const text = await response.text();
        setHtmlContent(text);
        setPdfUrl(pdfUrl);
      } catch (err) {
        setError("Error fetching document");
        console.error("Error fetching document:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [projectId, documentId]);

  useEffect(() => {
    const saveContent = async () => {
      if (!debouncedHtmlContent) return;

      try {
        const blob = new Blob([debouncedHtmlContent], { type: "text/html" });
        await updateDocumentContent(projectId, documentId, blob);
        // console.log('Document saved successfully (debounced save)');
      } catch (err) {
        console.error("Error saving document (debounced save):", err);
      }
    };

    saveContent();
  }, [debouncedHtmlContent, projectId, documentId]);

  const handleSave = async () => {
    try {
      if (companyId === 'cvy2lr5H0CUVH8o2vsVk') {
        await updateFileStatus(projectId, documentId, 4, user.uid);
      }
      else {
        await updateFileStatus(projectId, documentId, 6, user.uid);
      }
      navigate('/mywork');
      // navigate(/company/${companyId}/mywork);
      console.log('Document status updated to 4 or 6');
      // Optionally, you can add more logic here, such as navigating back or showing a success message.
    } catch (err) {
      console.error('Error updating document status:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "10px",
          borderRight: "1px solid #ccc",
        }}
      >
        {/* <Document file={pdfUrl} onLoadError={console.error}>
          <Page pageNumber={1} />
        </Document> */}

        <div>
          <iframe src={pdfUrl} width="100%" height="1000px" />
        </div>
      </div>
      <div style={{ flex: 1, padding: "10px" }}>
        <ReactQuill
          value={htmlContent}
          ref={quillRef}
          onChange={setHtmlContent}
        />
        <Button
          onClick={handleSave}
          variant="contained"
          color="success"
          size="large"
          sx={{
            position: "fixed",
            bottom: 25,
            right: 16,
            width: "100px",
            height: "55px",
            fontSize: "18px",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Editor;
