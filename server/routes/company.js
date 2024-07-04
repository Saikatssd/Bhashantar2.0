const express = require('express');
const { db } = require('../firebaseAdmin');
const router = express.Router();

// Endpoint to create new company
router.post('/createCompany', async (req, res) => {
    const { name } = req.body;
    try {
        const companyRef = db.collection('companies').doc();
        await companyRef.set({
            name,
            createdAt: Date.now(),
        });
        res.status(201).send({name, id: companyRef.id });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to fetch all companies
router.get('/', async (req, res) => {
    try {
        const companiesSnapshot = await db.collection('companies').get();
        const companies = companiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).send(companies);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
