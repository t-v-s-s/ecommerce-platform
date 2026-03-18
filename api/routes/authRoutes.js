import express from "express";
import {
  // addProduct,
  // getProducts,
  // getProduct,
  // updateProduct,
  // deleteProduct,
  registerUser,
  loginUser
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Product Routes
// router.post("/products", addProduct);
// router.get("/products", getProducts);
// router.get("/products/:id", getProduct);
// router.put("/products/:id", updateProduct);
// router.delete("/products/:id", deleteProduct);
// Protected route
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome",
    user: req.user
  });
});

export default router;