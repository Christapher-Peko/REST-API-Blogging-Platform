const request = require('supertest');
const app = require('../app'); // your app file

describe('Sign-up endpoint', () => {
  it('should return a 201 status code and a success message when a new user is created', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User created successfully');
  });

  it('should return a 400 status code and an error message when the email is missing', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ password: 'password123' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Email is required');
  });

  it('should return a 400 status code and an error message when the password is missing', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ email: 'test@example.com' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Password is required');
  });
});




  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Product'
   *       404:
   *         description: Product not found
   */



/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */




import { successResponse } from '../path/to/successResponse';

const authController = {
  signup: asyncHandler(async (req, res, next) => {
    let { user_name, email, password } = req.body;

    const existingUser = await authRepositories.findUserByEmail(email);
    if (existingUser) {
      throw new ERROR.UserExistsError('This email is already registered!');
    }

    password = await authServices.bcrypt(password);

    const payload = { user_name, password, email };
    const user = await authRepositories.createUser(payload);

    return res.success(user, 'User registered successfully', 201);
  }),
};

export default authController;
