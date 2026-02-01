import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}

//Register User 
export const registerUser = async (req, res) =>{
    const { username, email, password } = req.body;

    // 1. Validation
    if (!username || !email || !password) {
         return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
    return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user._id);
    res.status(201).json({
    status: "success",
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    },
    });
};

// Login user
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  // 1. Check user
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  // 3. Generate token
  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    },
  });
});

// Get current user
export const getUser = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("User not authenticated", 401));
  }

  res.status(200).json({
    status: "success",
    data: req.user,
  });
});