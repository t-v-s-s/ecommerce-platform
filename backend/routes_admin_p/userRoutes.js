import express from "express";


import {
    getUserInfo
} from "../api_admin_p/User/userController.js";

const router = express.Router();

// User info
router.get("/userinfo", getUserInfo);

export default router;