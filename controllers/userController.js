import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import AddUserRequest from "../requests/auth/user/addUserRequest.js";
import UserRepository from "../repositories/userRepository.js";
import userResponse from "../Response/userResponse.js";
import GetUserRequest from "../requests/auth/user/getUserRequest.js";
const userRepo = new UserRepository()

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login User
 *     operationId: login user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: email
 *          description: "Your email"
 *          type: string
 *        - in: query
 *          name: password
 *          description: "Your password"
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.query;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);
    res.json({
      status: true,
      message: "Logged In Successful.",
      data: { user: user, token: token },
    });
  } else {
    res.json({
      status: false,
      message: "Invalid email or password.",
      data: [],
    });
  }
});

/**
 * @swagger
 * /user/create:
 *   post:
 *     tags:
 *       - User
 *     summary: Create New User
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: name
 *          description: User name
 *          type: string
 *        - in: query
 *          name: email
 *          description: User email address
 *          type: string
 *        - in: query
 *          name: password
 *          description: Your password
 *          type: string
 *        - in: query
 *          name: password_confirmation
 *          description: Confrim Your password
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const createUser = asyncHandler(async (req, res) => {
  try {
    const validatedData = await new AddUserRequest(req).validate()

    const user = await userRepo.addUser(validatedData);
    const data = await userResponse.format(user);
    if (user) {
      res.status(201).json({
        message: "successfully added user",
        data: data
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'failed to create user' });
  }
}
);

/**
 * @swagger
 * /user/get:
 *   get:
 *     tags:
 *       - User
 *     summary: Return  user details
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: query
 *          name: id
 *          description: user id
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const getUser = asyncHandler(async (req, res) => {
  try{
    const validatedData= await new GetUserRequest(req).validate();
    const user=await userRepo.getUser(validatedData.id);
    if (user) {
      const data=await userResponse.format(user);
      res.json({
        status: true,
        message: "User profile details.",
        data: data,
      });
    } else {
      res.json({
        status: false,
        message: "User not found",
        data: [],
      });
    }
  }
  catch(error){
    console.log(error);
    res.json({
      status: false,
      message: "Unable to fetch user details",
      data: [],
    });  }
  
});
//  /**
//      *
//      * Delete user
//      *
//      * @swagger
//      * /user/delete:
//      *   post:
//      *     tags:
//      *       - user
//      *     summary: Delete user
//      *     security:
//      *       - bearerAuth: []
//      *     produces:
//      *       - application/json
//      *     requestBody:
//      *       required: true
//      *       content:
//      *          multipart/form-data:
//      *           schema:
//      *             type: object
//      *             properties:
//      *               name:id
//      *                 type: number
//      *     responses:
//      *       200:
//      *         description: Success
//      *       422:
//      *         description: Unprocessable Entity
//      *       401: 
//      *         description: Unauthenticated
//      */
//  const deleteBanner=async((req, res) =>{
//   try{

//   }
//   catch{

//   }
//  }
//  )
export { createUser, login, getUser }; 