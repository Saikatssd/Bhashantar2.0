// backend/routes/projects.js
const express = require('express');
const { db } = require('../firebaseAdmin');
const router = express.Router();

// Endpoint to create new project
router.post('/createProject', async (req, res) => {
    const { name, companyId } = req.body;
    try {
        const projectRef = db.collection('projects').doc();
        await projectRef.set({
            name,
            companyId,
            createdAt: new Date(),
        });
        res.status(201).send({name, id: projectRef.id });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to fetch projects for a company
router.get('/:companyId/projects', async (req, res) => {
    const { companyId } = req.params;
    try {
        const projectsSnapshot = await db.collection('projects').where('companyId', '==', companyId).get();
        const projects = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(projects);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
