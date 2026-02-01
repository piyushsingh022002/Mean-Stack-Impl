import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

    export const registerUser = async (req, res) =>{
        try{
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

            // 5. Generate token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
            });

            res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
            });
        }catch(error){
            res.status(500).json({ message: error.message });
        };
   };




    //login user
    export const loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;

            // 1. Check user
            const user = await User.findOne({ email });
            if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
            }

            // 2. Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
            }

            // 3. Generate token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
            });

            res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        };
     }; 
 

    //get current user
    export const getUser = async (req, res) => {
        res.json(req.user);
    };