const express = require('express');
const { db } = require('../firebaseAdmin'); 
const router = express.Router();

// Create a new role
router.post('/createRole', async (req, res) => {
  const { name, permissions } = req.body;
  try {
    await db.collection('roles').add({ name, permissions });
    res.status(200).send('Role created successfully');
  } catch (error) {
    res.status(500).send('Error creating role: ' + error.message);
  }
});

// Update a role
router.put('/updateRole/:id', async (req, res) => {
  const { id } = req.params;
  const { name, permissions } = req.body;
  try {
    await db.collection('roles').doc(id).update({ name, permissions });
    res.status(200).send('Role updated successfully');
  } catch (error) {
    res.status(500).send('Error updating role: ' + error.message);
  }
});

// Assign a role to a user
router.post('/assignRole', async (req, res) => {
  const { userId, roleId } = req.body;
  try {
    await db.collection('users').doc(userId).update({ roleId });
    res.status(200).send('Role assigned successfully');
  } catch (error) {
    res.status(500).send('Error assigning role: ' + error.message);
  }
});

module.exports = router;
