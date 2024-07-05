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
        res.status(201).send({ name, id: companyRef.id });
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


// Route to get users for a company
router.get('/getCompanyUsers/:companyId', async (req, res) => {
    const { companyId } = req.params;

    try {
        const companyRef = db.collection('companies').doc(companyId);
        const companyDoc = await companyRef.get();

        const companyData = companyDoc.exists ? companyDoc.data() : null;

        const usersRef = db.collection('users').where('companyId', '==', companyId);
        const usersSnapshot = await usersRef.get();

        const users = usersSnapshot.docs.map(doc => ({
            uid: doc.id, 
            email: doc.data().email,
            role: doc.data().role,
            // companyId: companyId,
        }));

        const response = {
            users,
            company: companyData || null 
        };

        res.status(200).send(response);
    } catch (error) {
        console.error('Error retrieving company users:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
