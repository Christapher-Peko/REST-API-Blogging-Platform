import config from "../config/env.config.js";
import jwt from 'jsonwebtoken';
import { ERROR } from "../utils/errors.js";

const authenticate = () => (req, res, next) => {

    if (!req.cookies['jwt']) {
        return next();
    }
    try {
        const payload = jwt.verify(req.cookies['jwt'], config.jwtSecret);
        req.currentUser = payload;
    } catch (error) {
        res.clearCookie('jwt')
        throw new ERROR.InvalidTokenError('Invalid token')
    }
    next();
};

export default authenticate;
