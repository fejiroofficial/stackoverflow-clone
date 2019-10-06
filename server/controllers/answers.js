import Question from '../models/question';
import Answer from '../models/answer';
import checkSubscription from '../utils/subscription';
import responseHandler from '../utils/responseHelper';

/** Question controller class */
class AnswerController {
  /**
 * @function postAnswer
 * @memberof AnswerController
 * @static
 */
static postAnswer(req, res) {
  const { body: { answer } } = req;
  Question.findById(req.params.id)
    .then(question => {
      if (!question) {
        const message = 'This Question does not exist';
        return responseHandler(res, 404, false, message);
      }
      Answer.create({ answer, question, user: req.user})
        .then(data => {
          checkSubscription(question);
          const message = 'Your answer has been posted successfully';
          responseHandler(res, 201, undefined, message, data);
        });
    }).catch(error => responseHandler(res, 500, false, error.message));
}

}

export default AnswerController;
