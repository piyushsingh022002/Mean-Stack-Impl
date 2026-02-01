import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//register route
router.post("/register", registerUser);
//login route
router.post("/login", loginUser);
router.get("/me", protect, getUser);

export default router;