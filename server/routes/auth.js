const express = require('express');
const { auth, db } = require('../firebaseAdmin');
const router = express.Router();

router.post('/createUser', async (req, res) => {
    const { email, password, role, companyId } = req.body;
    try {
        const userRecord = await auth.createUser({
            email,
            password,
        });

        await db.collection('users').doc(userRecord.uid).set({
            email: userRecord.email,
            role,
            companyId
        });

        await auth.setCustomUserClaims(userRecord.uid, { role, companyId });

        res.status(201).send({ email: userRecord.email, uid: userRecord.uid, role, companyId });
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(400).send({ error: error.message });
    }
});

router.post('/registerInitialSuperAdmin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    try {
        const userRecord = await auth.createUser({ email, password });
        
        await db.collection('users').doc(userRecord.uid).set({
            email: userRecord.email,
            role: 'superAdmin',
            companyId: null
        });

        await auth.setCustomUserClaims(userRecord.uid, { role: 'superAdmin' });

        res.status(201).send('Initial SuperAdmin registered successfully');
    } catch (error) {
        console.error('Error registering initial SuperAdmin:', error);
        res.status(400).send(error.message);
    }
});

// // Route to register superAdmin 
// app.post('/registerSuperAdmin', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userRecord = await admin.auth().createUser({ email, password });
//     await db.collection('users').doc(userRecord.uid).set({
//       email: userRecord.email,
//       role: 'superAdmin',
//       companyId: null
//     });
//     res.status(201).send('SuperAdmin registered successfully');
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });
module.exports = router;
