import config from "../config/env.config.js";

const checkApiKey = async (req, res, next) => {

    if (req.originalUrl.includes('/api-docs') || process.env.TEST) {
        return next()
    }

    // Verify API key
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(400).json({ message: 'API Key is missing' })
    }

    const apiKey = authHeader.substring(7);
  

    const isApiKeyValid = apiKey === config.api_key

    if (!isApiKeyValid) {
        return res.status(401).json({ message: 'API Key is invalid' })
    }

    next();
};

export default checkApiKey;
