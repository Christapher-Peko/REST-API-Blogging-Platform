import { ERROR } from "../utils/errors.js";
const checkApiKey = async (req, res, next) => {

    // // Bypass API key verification for '/test' route
    // // if (req.path === '/test') {
    // //     return next();
    // // }
    // if(req.originalUrl.includes('/api-docs')){
    //     return next()
    // }

    // // Verify API key
    // const authHeader = req.headers['authorization'];
    // if (!authHeader) {
    //     return res.status(400).json({ message: 'API Key is missing' })
    // }

    // const apiKey = authHeader.substring(6);
    // const isApiKeyValid = true

    // if (!isApiKeyValid) {
    //     return res.status(401).json({ message: 'API Key is invalid' })
    // }

    next();
};

export default checkApiKey;
