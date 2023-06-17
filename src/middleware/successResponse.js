
export const successResponse = (req, res, next) => {
    res.success = (statusCode = 200, message = 'Success', data = null) => {
        console.log(statusCode,message,data);
        res.status(statusCode).json({ message, data });
    };
    next();
};
