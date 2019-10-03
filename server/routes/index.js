import express from 'express';
import UserController from '../controllers/users';
import QuestionController from '../controllers/questions';
import AnswerController from '../controllers/answers';
import validations from '../middleware/inputValidator';
import verifyToken from '../middleware/verifyToken';


const router = express.Router();

router.post('/auth/signup',
    validations.validateSignup,
    validations.validationHandler,
    UserController.signup);

router.post('/auth/login',
    validations.validateLogin,
    validations.validationHandler,
    UserController.login);

router.get('/questions', QuestionController.getAllQuestions);
//router.get('/questions/:id', questionCtrl.getSingleQuestion);

router.use('*', verifyToken);

router.post('/questions',
    validations.validatePostQuestion,
    validations.validationHandler,
    QuestionController.postQuestion);

// router.delete('/questions/:id', questionCtrl.deleteQuestion);
router.post('/questions/:id/answers',
    validations.validatePostAnswer,
    validations.validationHandler,
    AnswerController.postAnswer);
// router.put('/questions/:id/answers/:id', middlewares.validatePostAnswer, questionCtrl.updateAnswer);

export default router;
