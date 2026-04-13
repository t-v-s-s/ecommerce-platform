import express from "express";
import {

  registerUser,
  loginUser
} from "../api_admin_p/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome",
    user: req.user
  });
});

export default router;