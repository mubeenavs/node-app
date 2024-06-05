import express from "express";
import { getUserProfile } from "../controllers/employeeController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router=express.Router();
router.route("/get").get(authenticateUser, getUserProfile);
export default router;