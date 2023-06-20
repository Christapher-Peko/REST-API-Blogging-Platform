const errorHandlingMiddleware = (err, req, res, next) => {
    if (!process.env.TEST) {
        console.log(err);
    }

    // Extract the status code and error message from the error object
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Check for specific error types
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 400;
        message = 'Invalid blog ID';
    }

    // Send a standardized error response
    res.status(statusCode).json({
        error: {
            message: message,
        },
    });
};

export default errorHandlingMiddleware;



