import express from "express";
import { createUser ,getUser,login} from "../controllers/userController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { loginValidation } from "../requests/auth/loginRequest.js";

const usersRouter=express.Router();
usersRouter.post("/login",loginValidation,login);
usersRouter.post('/create', authenticateUser, createUser);
usersRouter.get('/get',authenticateUser,getUser);

export default usersRouter;