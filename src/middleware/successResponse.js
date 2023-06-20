export const successResponse = (req, res, next) => {
    res.success = (statusCode = 200, message = 'Success', data = null) => {
        const responseObj = { message };
        if (data !== null) {
            responseObj.data = data;
        }
        res.status(statusCode).json(responseObj);
    };
    next();
};
