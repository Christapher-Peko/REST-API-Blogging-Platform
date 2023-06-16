import { body, validationResult } from 'express-validator';

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Format validation errors into a readable format
        const formattedErrors = errors.array().map((error) => {
            return {
                field: error.param,
                message: error.msg,
            };
        });

        return res.status(422).json({
            error: {
                message: 'Validation error',
                details: formattedErrors,
            },
        });
    }
    next();
};

// Define validation and sanitization rules for the signinup endpoint
const validationSignup = [
    body('*').trim().escape(),
    body('user_name')
        .notEmpty()
        .withMessage('User name is required')
        .isLength({ max: 20 })
        .withMessage('User name must be less than or equal to 20 characters'),

    body('email')
        .isEmail()
        .withMessage('Email is not valid')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters long'),

    body('confirm_password')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm password does not match password');
            }
            return true;
        }),
    handleValidationErrors
];
const validateSignin = [
    body('*').trim().escape(),
    body('email')
        .isEmail()
        .withMessage('Email is not valid')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters long'),

    handleValidationErrors
];

export { validationSignup, validateSignin };
