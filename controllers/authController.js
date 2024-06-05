import asyncHandler from "express-async-handler";
import Employee from "../models/Employee.js";
import generateToken from "../utils/generateToken.js";
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login Admin
 *     operationId: login
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
  const user = await Employee.findOne({ email });
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
export { login };
