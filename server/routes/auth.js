
const express = require('express');
const { auth, db } = require('../firebaseAdmin');
const router = express.Router();
const ErrorHandler = require('../utils/errorHandler');

router.post('/createUser', async (req, res, next) => {
  const { name, email, password, phoneNo, roleId, companyId } = req.body;

  try {
    const roleRef = db.collection('roles').doc(roleId);
    const roleSnapshot = await roleRef.get();

    if (!roleSnapshot.exists) {
      return next(new ErrorHandler("Role Not Found", 400));
    }

    const companyRef = db.collection('companies').doc(companyId);
    const comapanySnapshot = await companyRef.get();
    if (!comapanySnapshot.exists) {
      return next(new ErrorHandler("Company Not Found ", 400));
    }

    const userRecord = await auth.createUser({ email, password });

    await db.collection('users').doc(userRecord.uid).set({
      name:name,
      email: userRecord.email,
      phoneNo:phoneNo,
      roleId: roleId,
      companyId: companyId,
      createdAt: new Date(),
    });


    res.status(201).send({ uid: userRecord.uid, name:name });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).send({ error: error.message });
  }
});



router.post('/registerSuperAdmin', async (req, res) => {
  const { name, email, password, phoneNo, roleId } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Missing Required Fields ", 400));

  }

  const roleRef = db.collection('roles').doc(roleId);
  const roleSnapshot = await roleRef.get();

  if (!roleSnapshot.exists) {
    return next(new ErrorHandler("Role Not Found", 400));
  }

  try {
    const userRecord = await auth.createUser({ email, password });

    await db.collection('users').doc(userRecord.uid).set({
      name:name,
      email: userRecord.email,
      phoneNo:phoneNo,
      roleId: roleId,
      companyId: null,
      createdAt: new Date(),
    });


    res.status(201).send('Initial SuperAdmin registered successfully');
  } catch (error) {
    console.error('Error registering initial SuperAdmin:', error);
    res.status(400).send(error.message);
  }
});


router.get('/getUserProfile', async (req, res) => {
  try {
    const currentUser = await auth.currentUser();

    if (!currentUser) {
      return res.status(401).send('Unauthorized: Please sign in to access your profile');
    }

    const userRef = db.collection('users').doc(currentUser.uid);
    if (!userRef.exists) {
      return next(new ErrorHandler("User Not Found ", 400));

    }
    // const userRef = db.collection('users').doc('7ldaHVCzrgYLgJVnpTW33NSbdbe2');

    const userDoc = await userRef.get();

    // if (userDoc.exists) {
    const userData = userDoc.data();
    const userProfile = {
      email: userData.email,
      role: userData.role,
      companyId: userData.companyId,
    };
    return res.status(200).send(userProfile);
    // } 
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    return res.status(500).send('Internal server error');
  }
});

module.exports = router;
