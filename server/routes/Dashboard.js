const express = require('express');
const router = express.Router();
const checkRole = require('../middleware/checkRole');
const { db } = require('../firebaseAdmin');
const ErrorHandler = require('../utils/errorHandler');

// SuperAdmin Dashboard
router.get('/superAdmin', checkRole(['superAdmin']), async (req, res, next) => {
  try {
    const companiesSnapshot = await db.collection('companies').get();
    const companies = companiesSnapshot.docs.map(doc => doc.data());
    
    res.status(200).send({ companies });
  } catch (error) {
    console.error('Error fetching super admin dashboard data:', error);
    next(new ErrorHandler("Internal server error", 500));
  }
});

// Company Admin Dashboard
router.get('/companyAdmin', checkRole(['companyAdmin']), async (req, res, next) => {
  try {
    const companyId = req.userData.companyId;
    const projectsSnapshot = await db.collection('projects').where('companyId', '==', companyId).get();
    const projects = projectsSnapshot.docs.map(doc => doc.data());
    
    res.status(200).send({ projects });
  } catch (error) {
    console.error('Error fetching company admin dashboard data:', error);
    next(new ErrorHandler("Internal server error", 500));
  }
});

// Company User Dashboard
router.get('/companyUser', checkRole(['companyUser']), async (req, res, next) => {
  try {
    const userId = req.userData.uid;
    const tasksSnapshot = await db.collection('tasks').where('userId', '==', userId).get();
    const tasks = tasksSnapshot.docs.map(doc => doc.data());

    res.status(200).send({ tasks });
  } catch (error) {
    console.error('Error fetching company user dashboard data:', error);
    next(new ErrorHandler("Internal server error", 500));
  }
});

module.exports = router;
