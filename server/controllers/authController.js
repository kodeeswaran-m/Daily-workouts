const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ===== Helper Functions =====
const createAccessToken = (user) =>
  jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

const createRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
  path: '/api/auth/refresh-token',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};


// ===== Controller Methods =====

// @desc   Register user
// @route  POST /api/auth/register
// @desc   Register user
// @route  POST /api/auth/register
// exports.registerUser = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "admin", // ✅ default to admin if not provided
//     });

//     res.status(201).json({
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
    });

    // ✅ Generate tokens like login
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      accessToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc   Login user
// @route  POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(" email, password",  email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    console.log("ACCESS TOKEN", accessToken,"REFRESH TOKEN",refreshToken);
    
    // persist refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // set HttpOnly cookie
    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.json({
      accessToken,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Refresh token (rotate)
// @route  POST /api/auth/refresh-token
exports.refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== token)
      return res.status(401).json({ message: 'Invalid token' });

    // rotate
    const newRefreshToken = createRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    const accessToken = createAccessToken(user);

    res.cookie('refreshToken', newRefreshToken, cookieOptions);

    res.json({
      accessToken,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// @desc   Logout user
// @route  POST /api/auth/logout
exports.logoutUser = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findById(payload.id);
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    } catch (e) { /* ignore */ }
  }

  res.clearCookie('refreshToken', { path: '/api/auth/refresh-token' });
  res.sendStatus(204);
};


// @desc   Update user profile (email, password)
// @route  PUT /api/auth/update-profile
// @access Private

// exports.updateProfile = async (req, res) => {
//   try {
//     const { email, password,id:userId } = req.body;

//     const updates = {};
//     if (email) updates.email = email;
//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       updates.password = await bcrypt.hash(password, salt);
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: updates },
//       { new: true }
//     ).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       message: "Profile updated successfully",
//       user: {
//         id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         role: updatedUser.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.updateProfile = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, id: userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Object to store updates
    const updates = {};

    // Update email if provided
    if (email) updates.email = email;

    // If user wants to change password
    if (newPassword) {
      if (!oldPassword) {
        return res
          .status(400)
          .json({ message: "Old password is required to change password" });
      }

      // Check if old password matches
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      console.log("isMatch",isMatch);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
