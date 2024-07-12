import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "../assets/editor.css";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { fetchDocumentUrl, updateFileStatus } from '../firbase/firestoreUtil'; 
import { useAuth } from '../firbase/context/authContext';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


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


const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["clean"],
];

const TextEditor = () => {
  const { documentId } = useParams(); // Ensure 'documentId' matches the route parameter name
  const [quill, setQuill] = useState();
  const [pdfDocument, setPdfDocument] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        console.log("Fetching document URL for documentId:", documentId); // Debugging log
        const [projectId, fileId] = documentId.split('_'); // Split the concatenated string
        if (!projectId || !fileId) {
          throw new Error('Invalid document ID format');
        }
        const documentUrl = await fetchDocumentUrl(projectId, fileId);
        console.log("Fetched document URL:", documentUrl); // Debugging log
        if (documentUrl) {
          setPdfDocument(documentUrl); // Set the file URL for the PDF Viewer
        } else {
          console.warn("No URL found for documentId:", documentId); // Debugging log
        }
      } catch (error) {
        console.error("Error fetching document URL:", error);
      }
    };

    if (documentId) {
      fetchDocument();
    } else {
      console.error("Document ID is undefined"); // Debugging log
    }
  }, [documentId]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  const handleSaveClick = async () => {
    try {
      const [projectId, fileId] = documentId.split('_');
      await updateFileStatus(projectId, fileId, 4, currentUser.uid);
      navigate(`/Workspace`);
      console.log('Document status updated to 4');
      // Optionally, you can add more logic here, such as navigating back or showing a success message.
    } catch (err) {
      console.error('Error updating document status:', err);
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", paddingRight: "10px", height: "90vh", overflow: "auto" }}>
          {pdfDocument ? (
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
              <Viewer fileUrl={pdfDocument} />
            </Worker>
          ) : (
            <p>Loading PDF...</p>
          )}
        </div>
        <div ref={wrapperRef} style={{ width: "50%" }}></div>
      </div>
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{ position: 'fixed', bottom: 25, right: 16, width: '100px', height: '55px', fontSize: '18px' }}
        onClick={handleSaveClick}
        
      >
        Save
      </Button>
    </div>
  );
};

export default TextEditor;