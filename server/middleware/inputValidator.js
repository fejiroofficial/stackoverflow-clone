import { body, validationResult } from 'express-validator';
import User from '../models/user';

const validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required but none provided.')
        .normalizeEmail({ all_lowercase: true })
        .isEmail()
        .withMessage('Invalid email address provided.'),
    body('password')
        .exists()
        .withMessage('User password must be provided.')
        .isLength({ min: 5 })
        .withMessage('Password should be a least 5 characters long')
];

const validateSignup = [
    body('firstName')
        .exists()
        .withMessage('First name is required but none provided'),
    body('lastName')
        .exists()
        .withMessage('Last name is required but none provided'),
    body('email')
        .exists()
        .withMessage('Email is required but none provided.')
        .normalizeEmail({ all_lowercase: true })
        .isEmail()
        .withMessage('Invalid email address provided.')
        .custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user) return Promise.reject('E-mail already in use');
            });
        }),
    validateLogin[1],

];

const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ error: errors.array().map(error => error.msg) });
    } else {
        next();
    }
};

const validations = {
    validateSignup,
    validateLogin,
    validationHandler
};

export default validations;
