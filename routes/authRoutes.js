import express from "express";
import { login } from "../controllers/authController.js";
import {loginValidation} from "../requests/auth/loginRequest.js"

const router=express.Router();
router.post("/login",loginValidation,login);

export default router;
