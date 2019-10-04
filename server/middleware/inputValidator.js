import { body, validationResult } from 'express-validator';
import User from '../models/user';

var ObjectId = require('mongodb').ObjectId;

const validateLogin = [
    body('email')
        .not().isEmpty()
        .withMessage('Email is required but none provided.')
        .normalizeEmail({ all_lowercase: true })
        .isEmail()
        .withMessage('Invalid email address provided.'),
    body('password')
        .not().isEmpty()
        .withMessage('User password must be provided.')
        .isLength({ min: 5 })
        .withMessage('Password should be a least 5 characters long')
];

const validateSignup = [
    body('firstName')
        .not().isEmpty()
        .withMessage('First name is required but none provided'),
    body('lastName')
        .not().isEmpty()
        .withMessage('Last name is required but none provided'),
    body('email')
        .not().isEmpty()
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


const validatePostQuestion = [
    body('title')
        .not().isEmpty()
        .withMessage('The title of your question cannot be empty'),
    body('description')
        .not().isEmpty()
        .withMessage('The description of your question is required but none provided'),

];


const validatePostAnswer = [
    body('answer')
        .not().isEmpty()
        .withMessage('Please provide an answer to this question'),
];


const validatePostVote = [
    body('vote')
        .not().isEmpty()
        .withMessage('Are you attempting to vote on this question? You have not passed a value yet')
        .isBoolean()
        .withMessage('Voting can only be true or false for upvote and downvote respectively')
];

const validateParam = (req, res, next) => {
    try {
        const validId = ObjectId(req.params.id);
        req.params.id = validId;
        next();
    } catch (error){
        res.status(422).json({
            success: false, 
            error: 'Id parameter must be a single String of 12 bytes or a string of 24 hex characters'
        });
    }
};

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
    validatePostQuestion,
    validatePostAnswer,
    validatePostVote,
    validateParam,
    validationHandler
};

export default validations;
