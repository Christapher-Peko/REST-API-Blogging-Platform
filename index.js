import express from "express";
import connectDb from "./src/config/db.config.js";
import config from "./src/config/env.config.js";
import morgan from 'morgan'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from "helmet";
import cookieParser from 'cookie-parser'
import routes from "./src/routes/routes.js";
import errorHandlingMiddleware from "./src/middleware/errorHandlingMiddleware.js";
import swaggerDocs from "./docs/swagger.js";



const app = express()
const router = express.Router()

//middleware
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({ xssFilter: true }))
app.use(mongoSanitize())

//routes
routes(app, router);

//errorhandler
app.use(errorHandlingMiddleware)



// Start server
const start = async () => {
    connectDb();
    swaggerDocs(app,config.port)
    app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}...✅ `);
    });
};
start();
