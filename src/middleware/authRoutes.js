// import express from "express";
// import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";
// import { protect } from "../middleware/auth.js";

// const router = express.Router();

// // Helper: generate JWT
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN || "7d",
//   });
// };

// // @route   POST /api/auth/signup
// // @desc    Register new user
// // @access  Public
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//       return res.status(400).json({ message: "All fields are required" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "Email already registered" });

//     const user = await User.create({ name, email, password });

//     const token = generateToken(user._id);

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//       token,
//     });
//   } catch (error) {
//     console.error("Signup error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // @route   POST /api/auth/login
// // @desc    Login user
// // @access  Public
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ message: "Email and password required" });

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "Invalid email or password" });

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid email or password" });

//     const token = generateToken(user._id);

//     res.json({
//       message: "Logged in successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//       token,
//     });
//   } catch (error) {
//     console.error("Login error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // @route   POST /api/auth/reset-password
// // @desc    Reset/Change password (user must be logged in)
// // @access  Private
// router.post("/reset-password", protect, async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res
//         .status(400)
//         .json({ message: "Current and new password are required" });
//     }

//     const user = await User.findById(req.user._id);

//     const isMatch = await user.matchPassword(currentPassword);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Current password is incorrect" });
//     }

//     user.password = newPassword; // will be hashed by pre-save hook
//     await user.save();

//     res.json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error("Reset password error:", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
