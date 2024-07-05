const { db } = require('../firebaseAdmin');

const checkPermission = (permission) => {
  return async (req, res, next) => {
    const userId = req.user.uid; // Assuming user ID is stored in req.user
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      const roleDoc = await db.collection('roles').doc(userData.roleId).get();
      const roleData = roleDoc.data();
      
      if (roleData.permissions.includes(permission)) {
        next();
      } else {
        res.status(403).send('Permission denied');
      }
    } catch (error) {
      res.status(500).send('Error checking permissions: ' + error.message);
    }
  };
};

module.exports = checkPermission;
