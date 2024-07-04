// src/components/DocumentUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const DocumentUpload = ({ projectId }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        try {
            const response = await axios.get(`/api/projects/${projectId}/uploadUrl`, {
                params: { filename: file.name }
            });
            const uploadUrl = response.data.url;

            await axios.put(uploadUrl, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });
            // Notify the backend of the upload
            await axios.post(`/api/projects/${projectId}/notifyUpload`, {
                filename: file.name,
            });
        } catch (error) {
            console.error("Error uploading file: ", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Document</button>
        </div>
    );
};

export default DocumentUpload;
