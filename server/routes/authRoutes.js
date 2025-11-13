const express = require('express');
const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  updateProfile,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', logoutUser);
router.put("/update-profile", updateProfile);

module.exports = router;
