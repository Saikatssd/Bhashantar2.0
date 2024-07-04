// backend/routes/documents.js
const express = require('express');
const { Storage } = require('@google-cloud/storage');
const { db } = require('../firebaseAdmin');
const router = express.Router();

const storage = new Storage();
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);

// Endpoint to generate signed URL for document upload
router.get('/:projectId/uploadUrl', async (req, res) => {
    const { filename } = req.query;
    const projectId = req.params.projectId;
    const file = bucket.file(`projects/${projectId}/${filename}`);

    const options = {
        version: 'v4',
        action: 'write',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    try {
        const [url] = await file.getSignedUrl(options);
        res.status(200).send({ url });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to notify backend of document upload
router.post('/:projectId/notifyUpload', async (req, res) => {
    const { filename } = req.body;
    const projectId = req.params.projectId;

    try {
        await db.collection('projects').doc(projectId).collection('documents').add({
            filename,
            status: 'ready-for-work',
            createdAt: new Date(),
        });
        res.status(200).send({ message: 'Upload notified' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/:projectId/documents/:documentId/updateStatus', async (req, res) => {
    const { status } = req.body;
    const { projectId, documentId } = req.params;

    try {
        const documentRef = db.collection('projects').doc(projectId).collection('documents').doc(documentId);
        await documentRef.update({ status });
        res.status(200).send({ message: 'Status updated' });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to handle ML model processing (simplified)
router.post('/:projectId/documents/:documentId/translate', async (req, res) => {
    const { projectId, documentId } = req.params;

    try {
        const documentRef = db.collection('projects').doc(projectId).collection('documents').doc(documentId);
        const documentData = (await documentRef.get()).data();

        // Simulate ML translation process
        const translatedDocument = `Translated content of ${documentData.filename}`;

        // Update document with translated content and move to 'ready-for-work'
        await documentRef.update({ translatedDocument, status: 'ready-for-work' });
        res.status(200).send({ message: 'Document translated' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/:projectId/documents/:documentId/complete', async (req, res) => {
    const { projectId, documentId } = req.params;

    try {
        const documentRef = db.collection('projects').doc(projectId).collection('documents').doc(documentId);
        const documentData = (await documentRef.get()).data();
        const completedFile = bucket.file(`completed/${projectId}/${documentData.filename}`);

        // Move file to completed bucket
        await bucket.file(`projects/${projectId}/${documentData.filename}`).move(completedFile);

        // Update document status to completed
        await documentRef.update({ status: 'completed' });
        res.status(200).send({ message: 'Document completed and moved to download bucket' });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to download completed documents
router.get('/:projectId/documents/:documentId/download', async (req, res) => {
    const { projectId, documentId } = req.params;

    try {
        const documentRef = db.collection('projects').doc(projectId).collection('documents').doc(documentId);
        const documentData = (await documentRef.get()).data();

        if (documentData.status !== 'completed') {
            return res.status(400).send({ message: 'Document is not completed yet' });
        }

        const file = bucket.file(`completed/${projectId}/${documentData.filename}`);
        const [url] = await file.getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        });

        res.status(200).send({ url });
    } catch (error) {
        res.status(400).send(error);
    }
});
