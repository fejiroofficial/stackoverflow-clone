import express from 'express';
import UserController from '../controllers/users';
import QuestionController from '../controllers/questions';
import TextSearch from '../controllers/query';
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

router.get('/search', TextSearch);

router.use('*', verifyToken);

router.post('/questions',
    validations.validatePostQuestion,
    validations.validationHandler,
    QuestionController.postQuestion);

router.post('/questions/:id/answers',
    validations.validatePostAnswer,
    validations.validateParam,
    validations.validationHandler,
    AnswerController.postAnswer);

router.post('/questions/:id/votes',
    validations.validatePostVote,
    validations.validateParam,
    validations.validationHandler,
    QuestionController.voteQuestion);

router.post('/questions/:id/subscribe',
    validations.validateParam,
    validations.validationHandler,
    QuestionController.subscribeQuestion);

export default router;
