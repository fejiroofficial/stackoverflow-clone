import Question from '../models/question';

/** Question controller class */
class QuestionController {
  /**
 * @function postQuestion
 * @memberof QuestionController
 * @static
 */

static postQuestion(req, res) {
    const { body: { title, description } } = req;
    try {
      Question.create({ title, description })
        .then(data => {
          return res.status(201).json({
            success: true,
            message: 'Question has been posted on the channel',
            data,
          });
        });
    } catch (error) {
      return res.status(500).json({
        error: 'An error occured',
        success: false
      });
    }
}
  /**
 * @function getAllQuestions
 * @memberof QuestionController
 * @static
 */
static getAllQuestions(req, res) {
    //
}

  /**
 * @function postAnswer
 * @memberof QuestionController
 * @static
 */
static postAnswer(req, res) {
    //
}
}

export default QuestionController;