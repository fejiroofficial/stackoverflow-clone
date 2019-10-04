import Question from '../models/question';
import Vote from '../models/vote';

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
      Question.create({ title, description, user: req.user})
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
    Question.find()
    .then(questions => {
        return res.status(200).json({
            success: true,
            data: questions
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving questions."
        });
    });
}

  /**
 * @function voteQuestion
 * @memberof QuestionController
 * @static
 */
static voteQuestion(req, res) {
  const { body: { vote } } = req;
  Question.findById(req.params.id)
    .then(question => {
      if (!question) {
        return res.status(404).json({
          success: false,
          message: 'This Question does not exist'
        });
      }
      const options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false };
      Vote.findOneAndUpdate({ user: req.user, question}, {
        vote: vote === 'true' ? 1 : -1
      }, options)
        .then(data => {
          if (data) {
            return res.status(201).json({
              success: true,
              message: 'Your vote has been recorded',
              data
            });
          }
        });
    }). catch( err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving questions."
      });
    });
}

}

export default QuestionController;
