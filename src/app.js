import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from "helmet";
import cookieParser from 'cookie-parser'
import routes from "./routes/routes.js";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";
import { successResponse } from "./middleware/successResponse.js";
import authenticate from "./middleware/authenticate.js";

const app = express()
const router = express.Router()

//middleware
app.use(successResponse)  //handle unified success response
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ xssFilter: true }))
app.use(mongoSanitize())
app.use(authenticate())
//routes
routes(app, router);


//errorhandler
app.use(errorHandlingMiddleware)

export { app }

