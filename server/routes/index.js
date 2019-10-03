import express from 'express';
import UserController from '../controllers/users';
import validations from '../middleware/inputValidator';


const router = express.Router();

router.post('/auth/signup',
    validations.validateSignup,
    validations.validationHandler,
    UserController.signup);

router.post('/auth/login',
    validations.validateLogin,
    validations.validationHandler,
    UserController.login);

export default router;
