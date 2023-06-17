import asyncHandler from 'express-async-handler';
import { ERROR } from '../utils/errors.js';
import authRepositories from '../repositories/authRepositories.js';
import authServices from '../services/authServices.js';
import config from '../config/env.config.js';

const authController = {
    /**
    * @desc user signup, with user name email password
    * @route  POST /auth/signup
    * @access public
    */
    signup: asyncHandler(async (req, res, next) => {
        let { user_name, email, password } = req.body

        //check existing user with  email 
        const existingUser = await authRepositories.findUserByEmail(email)
        if (existingUser) throw new ERROR.UserExistsError("This email is already registered!")

        // Hash password and create candidate
        password = await authServices.bcrypt(password)

        //create user 
        const payload = { user_name, password, email }
        const user = await authRepositories.createUser(payload)

        return res.status(201).json({ message: 'User registered successfully', data: user })
    }),





    /**
    * @desc user can login in with email and password
    * @route  POST /auth/signin
    * @access public
    */
    signin: asyncHandler(async (req, res, next) => {
        let { email, password } = req.body

        //check user with  email 
        const existingUser = await authRepositories.findUserByEmail(email)
        if (!existingUser) throw new ERROR.NotFoundError("User not found with this email!")

        // compare the password entered by the user 
        const isVerified = await authServices.verifyHashed(password, existingUser.password)
        if (!isVerified) throw new ERROR.BadRequestError("Wrong password!")

        //after verification write a jwt 
         const payload = {
            userId: existingUser._id.toString(),
            email: existingUser.email,
        }
        const token = await authServices.generateToken(payload)

        //attach to http only cookie in res
        authServices.attachTokenToCookie('jwt', token, res)

        return res.status(200).json({ message: 'User signed n successfully', data: existingUser })
    }),









    logOut: asyncHandler(async (req, res, next) => {
        res.clearCookie('jwt')
        res.status(200).json({ message: 'logout successful' })
    }),

};

export default authController;
