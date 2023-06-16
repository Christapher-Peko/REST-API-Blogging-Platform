import authController from "../controllers/authController.js";
import { validateSignin, validationSignup } from "../middleware/validate.js";


const authRouter = (router) => {

  /**
   * @openapi
   * '/api/v1/auth/signup':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user 
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      422:
   *        description: Validation error
   *      400:
   *        description: Bad request
   */
  router.route('/signup').post(validationSignup, authController.signup);

  /**
   * @openapi
   * '/api/v1/auth/signin':
   *  post:
   *     tags:
   *     - User
   *     summary: Signin with email and password
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/SigninUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/SigninUserResponse'
   *      409:
   *        description: Conflict
   *      422:
   *        description: Validation error
   *      400:
   *        description: Bad request
   */
  router.route('/signin').post(validateSignin,authController.logOut);


  router.route('/logout').post(authController.logOut);

  return router;
}

export default authRouter;
