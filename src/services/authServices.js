import jwt from 'jsonwebtoken'
import config from '../config/env.config.js';
import bcrypt from 'bcrypt'


const authServices = {

    bcrypt: async (string) => {
        return await bcrypt.hash(string.toString(), 10);
    },
    verifyHashed: async (string, hashedString) => {
        return await bcrypt.compare(string.toString(), hashedString);;
    },
    generateToken: async (payload) => {
        const token = jwt.sign(payload,  process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return token
    },
    verifyToken: async (token) => {
        return jwt.verify(token,  process.env.JWT_SECRET)
    },

    attachTokenToCookie: (cookieName, Token, res) => {
        res.cookie(cookieName, Token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            signed: false,
            maxAge: 24 * 60 * 60 * 1000
        });
    },

};

export default authServices;



