import Question from '../models/question';
import Answer from '../models/answer';
import User from '../models/user';


const textSearch = (req, res) => {
    const queryLength = Object.keys(req.query).length;

    if (queryLength >= 2) {
        return res.status(422).json({
            success: false,
            message: 'Too many search parameters'
        });
    }

    if (req.query.question) {
        Question.find({
            $text: {
                $search: req.query.question
            }
        }, {
            _id: 0,
            _v: 0
        }, (err, data) => {
            res.json(data);
        });
    }

    if (req.query.answer) {
        Answer.find({
            $text: {
                $search: req.query.answer
            }
        }, {
            _id: 0,
            _v: 0
        }, (err, data) => {
            res.json(data);
        });
    }

    if (req.query.user) {
        User.find({
            $text: {
                $search: req.query.user
            }
        }, {
            _id: 0,
            _v: 0
        }, (err, data) => {
            res.json(data);
        });
    }

};

export default textSearch;
