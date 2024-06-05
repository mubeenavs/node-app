import asyncHandler from "express-async-handler";

/**
 * @swagger
 * /employee/get:
 *   get:
 *     tags:
 *       - Users
 *     summary: Return logged in user details
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *       422:
 *         description: Unprocessable Entity
 *       401:
 *         description: Unauthenticated
 */
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.session.user) {
    res.json({
      status: true,
      message: "User profile details.",
      data: req.session.user,
    });
  } else {
    res.json({
      status: false,
      message: "User not found",
      data: [],
    });
  }
});
export {getUserProfile};

