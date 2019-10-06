import Question from '../models/question';
import Vote from '../models/vote';
import Subscription from '../models/subscriber';
import responseHandler from '../utils/responseHelper';

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
      Question.create({ title, description, user: req.user })
        .then(data => {
          const message = 'Question has been posted on the channel';
          responseHandler(res, 201, undefined, message, data);
        });
    } catch (error) { responseHandler(res, 500, false, error.message); }
  }
  /**
 * @function getAllQuestions
 * @memberof QuestionController
 * @static
 */
  static getAllQuestions(req, res) {
    try {
      Question.find()
        .then(data => responseHandler(res, 200, undefined, undefined, data));
    } catch (error) { responseHandler(res, 500, false, error.message); }
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
          const message = 'This Question does not exist';
          return responseHandler(res, 404, false, message);
        }
        const options = { upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false };
        Vote.findOneAndUpdate({ user: req.user, question }, {
          vote: vote === 'true' ? 1 : -1
        }, options)
          .then(data => {
            const message = 'Your vote has been recorded';
            if (data) return responseHandler(res, 201, undefined, message, data);
          });
      }).catch(error => responseHandler(res, 500, false, error.message));
  }


  /**
 * @function subscribeQuestion
 * @memberof QuestionController
 * @static
 */
  static subscribeQuestion(req, res) {
    const user = req.user;
    Question.findById(req.params.id)
      .then(question => {
        if (!question) {
          const message = 'This Question does not exist';
          return responseHandler(res, 404, false, message);
        }
        Subscription.create({ user, question })
          .then(() => {
            const message = 'You have subscribed to receiving notification for this question';
            responseHandler(res, 201, undefined, message);
          }).catch(err => {
            if (err.name === 'MongoError') {
              Subscription.remove({ user, question }).exec();
              const message = 'You have unsubscribed to receiving notification for this question';
              return responseHandler(res, undefined, undefined, message);
            }
            res.send(err);
          });
      }).catch(error => responseHandler(res, 500, false, error.message));
  }

}

export default QuestionController;
