import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnvironment: process.env.NODE_ENV,
    authRoles: {
        admin: "admin",
        user: "user",
    },
    api_key:process.env.API_KEY,
};

export default config;
