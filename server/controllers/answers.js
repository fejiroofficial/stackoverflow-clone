import Question from '../models/question';
import Answer from '../models/answer';

/** Question controller class */
class AnswerController {
  /**
 * @function postAnswer
 * @memberof AnswerController
 * @static
 */
static postAnswer(req, res) {
  const { body: { answer } } = req;
  Question.findOne(req.param.id)
    .then(question => {
      if (!question) {
        return res.status(404).json({
          message: 'Question does not exit'
        })
      }
      Answer.create({ answer, question, user: req.user})
        .then(data => {
          data.user.password = undefined;
          return res.status(201).json({
            success: true,
            message: 'Your answer has been posted successfully',
            data,
          });
        }).catch(err => {
          return res.status(500).json({
            success: false,
            message: 'Something went wrong, your answer was not posted'
          });
        });
    }).catch(err => {
      return res.status(500).json({
        success: false,
        message: 'An error occured'
      });
    });
}
}

export default AnswerController;