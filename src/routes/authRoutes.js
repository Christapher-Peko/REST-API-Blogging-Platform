import authController from "../controllers/authController.js";
import { validateSignin, validationSignup } from "../middleware/validate.js";


const authRouter = (router) => {

  /**
   * @openapi
   * '/api/v1/auth/signup':
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Register a user
   *     description: Use this endpoint to register a new user.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *       201:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateUserResponse'
   *       400:
   *         description: Bad request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       422:
   *         description: Validation error occurred during user authentication
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       409:
   *         description: Conflict occurred during user authentication
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.route('/signup').post(validationSignup, authController.signup);



  /**
   * @openapi
   * '/api/v1/auth/signin':
   *   post:
   *     tags:
   *       - Authentication
   *     summary: Sign in with email and password
   *     description: Use this endpoint to authenticate a user by providing their email and password.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SigninUserInput'
   *     responses:
   *       200:
   *         description: User authentication successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SigninUserResponse'
   *       400:
   *         description: Invalid user credentials provided
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       422:
   *         description: Validation error occurred during user authentication
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Requested user not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       409:
   *         description: Conflict occurred during user authentication
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.route('/signin').post(validateSignin, authController.signin);



  /**
   * @openapi
   * '/api/v1/auth/logout':
   *   post:
   *     tags:
   *       - Authentication
   *     summary: User sign out
   *     description: Use this endpoint to sign out a user.
   *     requestBody:
   *       required: false
   *     responses:
   *       200:
   *         description: User sign out successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LogoutResponse'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.route('/logout').post(authController.logOut);



  return router;
}

export default authRouter;
